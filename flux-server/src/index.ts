#!/usr/bin/env node
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
  ErrorCode,
  McpError
} from "@modelcontextprotocol/sdk/types.js";
import Replicate from "replicate";
import dotenv from "dotenv";
import { FluxGenerateArgs, isValidFluxArgs } from "./types.js";
import fetch from 'node-fetch';

dotenv.config();

const API_TOKEN = process.env.REPLICATE_API_TOKEN;
if (!API_TOKEN) {
  throw new Error("REPLICATE_API_TOKEN environment variable is required");
}

class FluxServer {
  private server: Server;
  private replicate: Replicate;

  constructor() {
    this.server = new Server({
      name: "flux-image-server",
      version: "0.1.0"
    }, {
      capabilities: {
        tools: {}
      }
    });

    this.replicate = new Replicate({
      auth: API_TOKEN
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
          name: "generate_image",
          description: "Generate an image using the Flux model",
          inputSchema: {
            type: "object",
            properties: {
              prompt: {
                type: "string",
                description: "Text description of the image to generate"
              },
              go_fast: {
                type: "boolean",
                description: "Enable fast mode",
                default: true
              },
              guidance: {
                type: "number",
                description: "Guidance scale",
                default: 3.5
              },
              megapixels: {
                type: "string",
                description: "Image resolution in megapixels",
                default: "1"
              },
              aspect_ratio: {
                type: "string",
                description: "Image aspect ratio",
                default: "4:5"
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
        if (request.params.name !== "generate_image") {
          throw new McpError(
            ErrorCode.MethodNotFound,
            `Unknown tool: ${request.params.name}`
          );
        }

        if (!isValidFluxArgs(request.params.arguments)) {
          throw new McpError(
            ErrorCode.InvalidParams,
            "Invalid generation arguments"
          );
        }

        try {
          const output = await this.replicate.run(
            "black-forest-labs/flux-dev",
            {
              input: request.params.arguments
            }
          );

          const imageUrl = Array.isArray(output) ? String(output[0]) : String(output);

          // Fetch the image data from the URL
          const response = await fetch(imageUrl);
          const imageBuffer = await response.arrayBuffer();

          return {
            content: [
              {
                type: "text",
                text: "Generated image:"
              },
              {
                type: "image",
                data: Buffer.from(imageBuffer).toString('base64'),
                mimeType: "image/webp"
              },
              {
                type: "text",
                text: `Image URL: ${imageUrl}`
              }
            ]
          };
        } catch (error) {
          return {
            content: [
              {
                type: "text",
                text: `Flux API error: ${error instanceof Error ? error.message : String(error)}`
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
    console.error("Flux MCP server running on stdio");
  }
}

const server = new FluxServer();
server.run().catch(console.error);
