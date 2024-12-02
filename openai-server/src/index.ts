#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ErrorCode,
  McpError
} from "@modelcontextprotocol/sdk/types.js";
import OpenAI from "openai";
import dotenv from "dotenv";
import { isValidChatArgs } from "./types.js";

dotenv.config();

const API_KEY = process.env.OPENAI_API_KEY;
if (!API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

class OpenAIServer {
  private server: Server;
  private openai: OpenAI;

  constructor() {
    this.server = new Server({
      name: "openai-server",
      version: "0.1.0"
    }, {
      capabilities: {
        tools: {}
      }
    });

    this.openai = new OpenAI({
      apiKey: API_KEY
    });

    this.setupHandlers();
    this.setupErrorHandling();
  }

  private setupErrorHandling(): void {
    this.server.onerror = (error) => {
      console.error("[MCP Error]", error);
    };

    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupHandlers(): void {
    this.server.setRequestHandler(
      ListToolsRequestSchema,
      async () => ({
        tools: [{
          name: "chat_completion",
          description: "Generate text using OpenAI's chat completion API",
          inputSchema: {
            type: "object",
            properties: {
              prompt: {
                type: "string",
                description: "The prompt to send to the model"
              },
              model: {
                type: "string",
                description: "The model to use (default: o1-preview)",
                default: "o1-preview"
              }
            },
            required: ["prompt"]
          }
        }]
      })
    );

    this.server.setRequestHandler(
      CallToolRequestSchema,
      async (request) => {
        if (request.params.name !== "chat_completion") {
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${request.params.name}`
          );
        }

        if (!isValidChatArgs(request.params.arguments)) {
          throw new McpError(
            ErrorCode.InvalidParams,
            "Invalid chat completion arguments"
          );
        }

        try {
          const completion = await this.openai.chat.completions.create({
            model: request.params.arguments.model || "o1-preview",
            messages: [
              { 
                role: "user", 
                content: request.params.arguments.prompt 
              }
            ]
          });

          return {
            content: [
              {
                type: "text",
                text: completion.choices[0].message.content || "No response generated"
              }
            ]
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `OpenAI API error: ${error instanceof Error ? error.message : String(error)}`
              }
            ],
            isError: true
          };
        }
      }
    );
  }

  async run(): Promise<void> {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error("OpenAI MCP server running on stdio");
  }
}

const server = new OpenAIServer();
server.run().catch(console.error);
