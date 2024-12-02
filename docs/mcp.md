Introducing the Model Context Protocol
25. nov. 2024
●
3 min read
An abstract illustration of critical context connecting to a central hub
Today, we're open-sourcing the Model Context Protocol (MCP), a new standard for connecting AI assistants to the systems where data lives, including content repositories, business tools, and development environments. Its aim is to help frontier models produce better, more relevant responses.

As AI assistants gain mainstream adoption, the industry has invested heavily in model capabilities, achieving rapid advances in reasoning and quality. Yet even the most sophisticated models are constrained by their isolation from data—trapped behind information silos and legacy systems. Every new data source requires its own custom implementation, making truly connected systems difficult to scale.

MCP addresses this challenge. It provides a universal, open standard for connecting AI systems with data sources, replacing fragmented integrations with a single protocol. The result is a simpler, more reliable way to give AI systems access to the data they need.

Model Context Protocol
The Model Context Protocol is an open standard that enables developers to build secure, two-way connections between their data sources and AI-powered tools. The architecture is straightforward: developers can either expose their data through MCP servers or build AI applications (MCP clients) that connect to these servers.

Today, we're introducing three major components of the Model Context Protocol for developers:

The Model Context Protocol specification and SDKs
Local MCP server support in the Claude Desktop apps
An open-source repository of MCP servers
Claude 3.5 Sonnet is adept at quickly building MCP server implementations, making it easy for organizations and individuals to rapidly connect their most important datasets with a range of AI-powered tools. To help developers start exploring, we’re sharing pre-built MCP servers for popular enterprise systems like Google Drive, Slack, GitHub, Git, Postgres, and Puppeteer.

Early adopters like Block and Apollo have integrated MCP into their systems, while development tools companies including Zed, Replit, Codeium, and Sourcegraph are working with MCP to enhance their platforms—enabling AI agents to better retrieve relevant information to further understand the context around a coding task and produce more nuanced and functional code with fewer attempts.

"At Block, open source is more than a development model—it’s the foundation of our work and a commitment to creating technology that drives meaningful change and serves as a public good for all,” said Dhanji R. Prasanna, Chief Technology Officer at Block. “Open technologies like the Model Context Protocol are the bridges that connect AI to real-world applications, ensuring innovation is accessible, transparent, and rooted in collaboration. We are excited to partner on a protocol and use it to build agentic systems, which remove the burden of the mechanical so people can focus on the creative.”

Instead of maintaining separate connectors for each data source, developers can now build against a standard protocol. As the ecosystem matures, AI systems will maintain context as they move between different tools and datasets, replacing today's fragmented integrations with a more sustainable architecture.

Getting started
Developers can start building and testing MCP connectors today. Existing Claude for Work customers can begin testing MCP servers locally, connecting Claude to internal systems and datasets. We'll soon provide developer toolkits for deploying remote production MCP servers that can serve your entire Claude for Work organization.

To start building:

Install pre-built MCP servers through the Claude Desktop app
Follow our quickstart guide to build your first MCP server
Contribute to our open-source repositories of connectors and implementations
An open community
We’re committed to building MCP as a collaborative, open-source project and ecosystem, and we’re eager to hear your feedback. Whether you’re an AI tool developer, an enterprise looking to leverage existing data, or an early adopter exploring the frontier, we invite you to build the future of context-aware AI together.

Get Started
Quickstart
Get started with MCP in less than 5 minutes

MCP is a protocol that enables secure connections between host applications, such as Claude Desktop, and local services. In this quickstart guide, you’ll learn how to:

Set up a local SQLite database
Connect Claude Desktop to it through MCP
Query and analyze your data securely
While this guide focuses on using Claude Desktop as an example MCP host, the protocol is open and can be integrated by any application. IDEs, AI tools, and other software can all use MCP to connect to local integrations in a standardized way.

Claude Desktop’s MCP support is currently in developer preview and only supports connecting to local MCP servers running on your machine. Remote MCP connections are not yet supported. This integration is only available in the Claude Desktop app, not the Claude web interface (claude.ai).

​
How MCP works
MCP (Model Context Protocol) is an open protocol that enables secure, controlled interactions between AI applications and local or remote resources. Let’s break down how it works, then look at how we’ll use it in this guide.

​
General Architecture
At its core, MCP follows a client-server architecture where a host application can connect to multiple servers:

Internet
Your Computer
MCP Protocol
MCP Protocol
MCP Protocol
Web APIs
Remote
Resource C
MCP Host
(Claude, IDEs, Tools)
MCP Server A
MCP Server B
MCP Server C
Local
Resource A
Local
Resource B
MCP Hosts: Programs like Claude Desktop, IDEs, or AI tools that want to access resources through MCP
MCP Clients: Protocol clients that maintain 1:1 connections with servers
MCP Servers: Lightweight programs that each expose specific capabilities through the standardized Model Context Protocol
Local Resources: Your computer’s resources (databases, files, services) that MCP servers can securely access
Remote Resources: Resources available over the internet (e.g., through APIs) that MCP servers can connect to
​
In This Guide
For this quickstart, we’ll implement a focused example using SQLite:

Your Computer
MCP Protocol
(Queries & Results)
Local Access
(SQL Operations)
Claude Desktop
SQLite MCP Server
SQLite Database
~/test.db
Claude Desktop acts as our MCP client
A SQLite MCP Server provides secure database access
Your local SQLite database stores the actual data
The communication between the SQLite MCP server and your local SQLite database happens entirely on your machine—your SQLite database is not exposed to the internet. The Model Context Protocol ensures that Claude Desktop can only perform approved database operations through well-defined interfaces. This gives you a secure way to let Claude analyze and interact with your local data while maintaining complete control over what it can access.

​
Prerequisites
macOS or Windows
The latest version of Claude Desktop installed
uv 0.4.18 or higher (uv --version to check)
Git (git --version to check)
SQLite (sqlite3 --version to check)

Installing prerequisites (macOS)


Installing prerequisites (Windows)

​
Installation
macOS
Windows
1
Create a sample database

Let’s create a simple SQLite database for testing:


# Create a new SQLite database
sqlite3 ~/test.db <<EOF
CREATE TABLE products (
  id INTEGER PRIMARY KEY,
  name TEXT,
  price REAL
);

INSERT INTO products (name, price) VALUES
  ('Widget', 19.99),
  ('Gadget', 29.99),
  ('Gizmo', 39.99),
  ('Smart Watch', 199.99),
  ('Wireless Earbuds', 89.99),
  ('Portable Charger', 24.99),
  ('Bluetooth Speaker', 79.99),
  ('Phone Stand', 15.99),
  ('Laptop Sleeve', 34.99),
  ('Mini Drone', 299.99),
  ('LED Desk Lamp', 45.99),
  ('Keyboard', 129.99),
  ('Mouse Pad', 12.99),
  ('USB Hub', 49.99),
  ('Webcam', 69.99),
  ('Screen Protector', 9.99),
  ('Travel Adapter', 27.99),
  ('Gaming Headset', 159.99),
  ('Fitness Tracker', 119.99),
  ('Portable SSD', 179.99);
EOF
2
Configure Claude Desktop

Open your Claude Desktop App configuration at ~/Library/Application Support/Claude/claude_desktop_config.json in a text editor.

For example, if you have VS Code installed:


code ~/Library/Application\ Support/Claude/claude_desktop_config.json
Add this configuration (replace YOUR_USERNAME with your actual username):


{
  "mcpServers": {
    "sqlite": {
      "command": "uvx",
      "args": ["mcp-server-sqlite", "--db-path", "/Users/YOUR_USERNAME/test.db"]
    }
  }
}
This tells Claude Desktop:

There’s an MCP server named “sqlite”
Launch it by running uvx mcp-server-sqlite
Connect it to your test database
Save the file, and restart Claude Desktop.

​
Test it out
Let’s verify everything is working. Try sending this prompt to Claude Desktop:


Can you connect to my SQLite database and tell me what products are available, and their prices?
Claude Desktop will:

Connect to the SQLite MCP server
Query your local database
Format and present the results
Example Claude Desktop conversation showing database query results
Claude Desktop successfully queries our SQLite database 🎉

​
What’s happening under the hood?
When you interact with Claude Desktop using MCP:

Server Discovery: Claude Desktop connects to your configured MCP servers on startup

Protocol Handshake: When you ask about data, Claude Desktop:

Identifies which MCP server can help (sqlite in this case)
Negotiates capabilities through the protocol
Requests data or actions from the MCP server
Interaction Flow:

SQLite DB
MCP Server
Claude Desktop
SQLite DB
MCP Server
Claude Desktop
Initialize connection
Available capabilities
Query request
SQL query
Results
Formatted results
Security:

MCP servers only expose specific, controlled capabilities
MCP servers run locally on your machine, and the resources they access are not exposed to the internet
Claude Desktop requires user confirmation for sensitive operations
​
Try these examples
Now that MCP is working, try these increasingly powerful examples:


Basic Queries


Data Analysis


Complex Operations

​
Add more capabilities
Want to give Claude Desktop more local integration capabilities? Add these servers to your configuration:

Note that these MCP servers will require Node.js to be installed on your machine.


File System Access


PostgreSQL Connection

​
More MCP Clients
While this guide demonstrates MCP using Claude Desktop as a client, several other applications support MCP integration:

Zed Editor
A high-performance, multiplayer code editor with built-in MCP support for AI-powered coding assistance

Cody
Code intelligence platform featuring MCP integration for enhanced code search and analysis capabilities

Each host application may implement MCP features differently or support different capabilities. Check their respective documentation for specific setup instructions and supported features.

​
Troubleshooting

Nothing showing up in Claude Desktop?


MCP or database errors?

​
Next steps


Your First MCP Server
Python
Create a simple MCP server in Python in 15 minutes

Let’s build your first MCP server in Python! We’ll create a weather server that provides current weather data as a resource and lets Claude fetch forecasts using tools.

This guide uses the OpenWeatherMap API. You’ll need a free API key from OpenWeatherMap to follow along.

​
Prerequisites
The following steps are for macOS. Guides for other platforms are coming soon.

1
Install Python

You’ll need Python 3.10 or higher:


python --version  # Should be 3.10 or higher
2
Install uv via homebrew

See https://docs.astral.sh/uv/ for more information.


brew install uv
uv --version # Should be 0.4.18 or higher
3
Create a new project using the MCP project creator


uvx create-mcp-server --path weather_service
cd weather_service
4
Install additional dependencies


uv add httpx python-dotenv
5
Set up environment

Create .env:


OPENWEATHER_API_KEY=your-api-key-here
​
Create your server
1
Add the base imports and setup

In weather_service/src/weather_service/server.py


import os
import json
import logging
from datetime import datetime, timedelta
from collections.abc import Sequence
from functools import lru_cache
from typing import Any

import httpx
import asyncio
from dotenv import load_dotenv
from mcp.server import Server
from mcp.types import (
    Resource,
    Tool,
    TextContent,
    ImageContent,
    EmbeddedResource,
    LoggingLevel
)
from pydantic import AnyUrl

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("weather-server")

# API configuration
API_KEY = os.getenv("OPENWEATHER_API_KEY")
if not API_KEY:
    raise ValueError("OPENWEATHER_API_KEY environment variable required")

API_BASE_URL = "http://api.openweathermap.org/data/2.5"
DEFAULT_CITY = "London"
CURRENT_WEATHER_ENDPOINT = "weather"
FORECAST_ENDPOINT = "forecast"

# The rest of our server implementation will go here
2
Add weather fetching functionality

Add this functionality:


# Create reusable params
http_params = {
    "appid": API_KEY,
    "units": "metric"
}

async def fetch_weather(city: str) -> dict[str, Any]:
    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{API_BASE_URL}/weather",
            params={"q": city, **http_params}
        )
        response.raise_for_status()
        data = response.json()

    return {
        "temperature": data["main"]["temp"],
        "conditions": data["weather"][0]["description"],
        "humidity": data["main"]["humidity"],
        "wind_speed": data["wind"]["speed"],
        "timestamp": datetime.now().isoformat()
    }


app = Server("weather-server")
3
Implement resource handlers

Add these resource-related handlers to our main function:


app = Server("weather-server")

@app.list_resources()
async def list_resources() -> list[Resource]:
    """List available weather resources."""
    uri = AnyUrl(f"weather://{DEFAULT_CITY}/current")
    return [
        Resource(
            uri=uri,
            name=f"Current weather in {DEFAULT_CITY}",
            mimeType="application/json",
            description="Real-time weather data"
        )
    ]

@app.read_resource()
async def read_resource(uri: AnyUrl) -> str:
    """Read current weather data for a city."""
    city = DEFAULT_CITY
    if str(uri).startswith("weather://") and str(uri).endswith("/current"):
        city = str(uri).split("/")[-2]
    else:
        raise ValueError(f"Unknown resource: {uri}")

    try:
        weather_data = await fetch_weather(city)
        return json.dumps(weather_data, indent=2)
    except httpx.HTTPError as e:
        raise RuntimeError(f"Weather API error: {str(e)}")

4
Implement tool handlers

Add these tool-related handlers:


app = Server("weather-server")

# Resource implementation ...

@app.list_tools()
async def list_tools() -> list[Tool]:
    """List available weather tools."""
    return [
        Tool(
            name="get_forecast",
            description="Get weather forecast for a city",
            inputSchema={
                "type": "object",
                "properties": {
                    "city": {
                        "type": "string",
                        "description": "City name"
                    },
                    "days": {
                        "type": "number",
                        "description": "Number of days (1-5)",
                        "minimum": 1,
                        "maximum": 5
                    }
                },
                "required": ["city"]
            }
        )
    ]

@app.call_tool()
async def call_tool(name: str, arguments: Any) -> Sequence[TextContent | ImageContent | EmbeddedResource]:
    """Handle tool calls for weather forecasts."""
    if name != "get_forecast":
        raise ValueError(f"Unknown tool: {name}")

    if not isinstance(arguments, dict) or "city" not in arguments:
        raise ValueError("Invalid forecast arguments")

    city = arguments["city"]
    days = min(int(arguments.get("days", 3)), 5)

    try:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{API_BASE_URL}/{FORECAST_ENDPOINT}",
                params={
                    "q": city,
                    "cnt": days * 8,  # API returns 3-hour intervals
                    **http_params,
                }
            )
            response.raise_for_status()
            data = response.json()

        forecasts = []
        for i in range(0, len(data["list"]), 8):
            day_data = data["list"][i]
            forecasts.append({
                "date": day_data["dt_txt"].split()[0],
                "temperature": day_data["main"]["temp"],
                "conditions": day_data["weather"][0]["description"]
            })

        return [
            TextContent(
                type="text",
                text=json.dumps(forecasts, indent=2)
            )
        ]
    except requests.HTTPError as e:
        logger.error(f"Weather API error: {str(e)}")
        raise RuntimeError(f"Weather API error: {str(e)}")
5
Add the main function

Add this to the end of weather_service/src/weather_service/server.py:


async def main():
    # Import here to avoid issues with event loops
    from mcp.server.stdio import stdio_server

    async with stdio_server() as (read_stream, write_stream):
        await app.run(
            read_stream,
            write_stream,
            app.create_initialization_options()
        )
6
Check your entry point in __init__.py

Add this to the end of weather_service/src/weather_service/__init__.py:


from . import server
import asyncio

def main():
   """Main entry point for the package."""
   asyncio.run(server.main())

# Optionally expose other important items at package level
__all__ = ['main', 'server']
​
Connect to Claude Desktop
1
Update Claude config

Add to claude_desktop_config.json:


{
  "mcpServers": {
    "weather": {
      "command": "uv",
      "args": [
        "--directory",
        "path/to/your/project",
        "run",
        "weather-service"
      ],
      "env": {
        "OPENWEATHER_API_KEY": "your-api-key"
      }
    }
  }
}
2
Restart Claude

Quit Claude completely

Start Claude again

Look for your weather server in the 🔌 menu

​
Try it out!

Check Current Weather


Get a Forecast


Compare Weather

​
Understanding the code
Type Hints
Resources
Tools
Server Structure

async def read_resource(self, uri: str) -> ReadResourceResult:
    # ...
Python type hints help catch errors early and improve code maintainability.

​
Best practices
Error Handling

try:
    async with httpx.AsyncClient() as client:
        response = await client.get(..., params={..., **http_params})
        response.raise_for_status()
except requests.HTTPError as e:
    raise McpError(
        ErrorCode.INTERNAL_ERROR,
        f"API error: {str(e)}"
    )
Type Validation

if not isinstance(args, dict) or "city" not in args:
    raise McpError(
        ErrorCode.INVALID_PARAMS,
        "Invalid forecast arguments"
    )
Environment Variables

if not API_KEY:
    raise ValueError("OPENWEATHER_API_KEY is required")
​
Available transports
While this guide uses stdio transport, MCP supports additonal transport options:

​
SSE (Server-Sent Events)

from mcp.server.sse import SseServerTransport
from starlette.applications import Starlette
from starlette.routing import Route

# Create SSE transport with endpoint
sse = SseServerTransport("/messages")

# Handler for SSE connections
async def handle_sse(scope, receive, send):
    async with sse.connect_sse(scope, receive, send) as streams:
        await app.run(
            streams[0], streams[1], app.create_initialization_options()
        )

# Handler for client messages
async def handle_messages(scope, receive, send):
    await sse.handle_post_message(scope, receive, send)

# Create Starlette app with routes
app = Starlette(
    debug=True,
    routes=[
        Route("/sse", endpoint=handle_sse),
        Route("/messages", endpoint=handle_messages, methods=["POST"]),
    ],
)

# Run with any ASGI server
import uvicorn
uvicorn.run(app, host="0.0.0.0", port=8000)
​
Advanced features
1
Understanding Request Context

The request context provides access to the current request’s metadata and the active client session. Access it through server.request_context:


@app.call_tool()
async def call_tool(name: str, arguments: Any) -> Sequence[TextContent]:
    # Access the current request context
    ctx = self.request_context

    # Get request metadata like progress tokens
    if progress_token := ctx.meta.progressToken:
        # Send progress notifications via the session
        await ctx.session.send_progress_notification(
            progress_token=progress_token,
            progress=0.5,
            total=1.0
        )

    # Sample from the LLM client
    result = await ctx.session.create_message(
        messages=[
            SamplingMessage(
                role="user",
                content=TextContent(
                    type="text",
                    text="Analyze this weather data: " + json.dumps(arguments)
                )
            )
        ],
        max_tokens=100
    )

    return [TextContent(type="text", text=result.content.text)]
2
Add caching


# Cache settings
cache_timeout = timedelta(minutes=15)
last_cache_time = None
cached_weather = None

async def fetch_weather(city: str) -> dict[str, Any]:
    global cached_weather, last_cache_time

    now = datetime.now()
    if (cached_weather is None or
        last_cache_time is None or
        now - last_cache_time > cache_timeout):

        async with httpx.AsyncClient() as client:
            response = await client.get(
                f"{API_BASE_URL}/{CURRENT_WEATHER_ENDPOINT}",
                params={"q": city, **http_params}
            )
            response.raise_for_status()
            data = response.json()

        cached_weather = {
            "temperature": data["main"]["temp"],
            "conditions": data["weather"][0]["description"],
            "humidity": data["main"]["humidity"],
            "wind_speed": data["wind"]["speed"],
            "timestamp": datetime.now().isoformat()
        }
        last_cache_time = now

    return cached_weather
3
Add progress notifications


@self.call_tool()
async def call_tool(self, name: str, arguments: Any) -> CallToolResult:
    if progress_token := self.request_context.meta.progressToken:
        # Send progress notifications
        await self.request_context.session.send_progress_notification(
            progress_token=progress_token,
            progress=1,
            total=2
        )

        # Fetch data...

        await self.request_context.session.send_progress_notification(
            progress_token=progress_token,
            progress=2,
            total=2
        )

    # Rest of the method implementation...
4
Add logging support


# Set up logging
logger = logging.getLogger("weather-server")
logger.setLevel(logging.INFO)

@app.set_logging_level()
async def set_logging_level(level: LoggingLevel) -> EmptyResult:
    logger.setLevel(level.upper())
    await app.request_context.session.send_log_message(
        level="info",
        data=f"Log level set to {level}",
        logger="weather-server"
    )
    return EmptyResult()

# Use logger throughout the code
# For example:
# logger.info("Weather data fetched successfully")
# logger.error(f"Error fetching weather data: {str(e)}")
5
Add resource templates


@self.list_resources()
async def list_resources(self) -> ListResourcesResult:
    return ListResourcesResult(
        resources=[...],
        resourceTemplates=[
            ResourceTemplate(
                uriTemplate="weather://{city}/current",
                name="Current weather for any city",
                mimeType="application/json"
            )
        ]
    )
​
Testing
1
Create test file

Create tests/weather_test.py:


import pytest
import os
from unittest.mock import patch, Mock
from datetime import datetime
import json
from pydantic import AnyUrl
os.environ["OPENWEATHER_API_KEY"] = "TEST"

from weather_service.server import (
    fetch_weather,
    read_resource,
    call_tool,
    list_resources,
    list_tools,
    DEFAULT_CITY
)

@pytest.fixture
def anyio_backend():
    return "asyncio"

@pytest.fixture
def mock_weather_response():
    return {
        "main": {
            "temp": 20.5,
            "humidity": 65
        },
        "weather": [
            {"description": "scattered clouds"}
        ],
        "wind": {
            "speed": 3.6
        }
    }

@pytest.fixture
def mock_forecast_response():
    return {
        "list": [
            {
                "dt_txt": "2024-01-01 12:00:00",
                "main": {"temp": 18.5},
                "weather": [{"description": "sunny"}]
            },
            {
                "dt_txt": "2024-01-02 12:00:00",
                "main": {"temp": 17.2},
                "weather": [{"description": "cloudy"}]
            }
        ]
    }

@pytest.mark.anyio
async def test_fetch_weather(mock_weather_response):
    with patch('requests.Session.get') as mock_get:
        mock_get.return_value.json.return_value = mock_weather_response
        mock_get.return_value.raise_for_status = Mock()

        weather = await fetch_weather("London")

        assert weather["temperature"] == 20.5
        assert weather["conditions"] == "scattered clouds"
        assert weather["humidity"] == 65
        assert weather["wind_speed"] == 3.6
        assert "timestamp" in weather

@pytest.mark.anyio
async def test_read_resource():
    with patch('weather_service.server.fetch_weather') as mock_fetch:
        mock_fetch.return_value = {
            "temperature": 20.5,
            "conditions": "clear sky",
            "timestamp": datetime.now().isoformat()
        }

        uri = AnyUrl("weather://London/current")
        result = await read_resource(uri)

        assert isinstance(result, str)
        assert "temperature" in result
        assert "clear sky" in result

@pytest.mark.anyio
async def test_call_tool(mock_forecast_response):
    class Response():
        def raise_for_status(self):
            pass

        def json(self):
            return nock_forecast_response

    class AsyncClient():
        def __aenter__(self):
            return self

        async def __aexit__(self, *exc_info):
            pass

        async def get(self, *args, **kwargs):
            return Response()

    with patch('httpx.AsyncClient', new=AsyncClient) as mock_client:
        result = await call_tool("get_forecast", {"city": "London", "days": 2})

        assert len(result) == 1
        assert result[0].type == "text"
        forecast_data = json.loads(result[0].text)
        assert len(forecast_data) == 1
        assert forecast_data[0]["temperature"] == 18.5
        assert forecast_data[0]["conditions"] == "sunny"

@pytest.mark.anyio
async def test_list_resources():
    resources = await list_resources()
    assert len(resources) == 1
    assert resources[0].name == f"Current weather in {DEFAULT_CITY}"
    assert resources[0].mimeType == "application/json"

@pytest.mark.anyio
async def test_list_tools():
    tools = await list_tools()
    assert len(tools) == 1
    assert tools[0].name == "get_forecast"
    assert "city" in tools[0].inputSchema["properties"]
2
Run tests


uv add --dev pytest
uv run pytest
​
Troubleshooting
​
Installation issues

# Check Python version
python --version

# Reinstall dependencies
uv sync --reinstall
​
Type checking

# Install mypy
uv add --dev pyright

# Run type checker
uv run pyright src
​

Clients
A list of applications that support MCP integrations

This page provides an overview of applications that support the Model Context Protocol (MCP). Each client may support different MCP features, allowing for varying levels of integration with MCP servers.

​
Feature support matrix
Client	Resources	Prompts	Tools	Sampling	Roots	Notes
Claude Desktop App	✅	✅	✅	❌	❌	Full support for all MCP features
Zed	❌	✅	❌	❌	❌	Prompts appear as slash commands
Sourcegraph Cody	✅	❌	❌	❌	❌	Supports resources through OpenCTX
​
Client details
​
Claude Desktop App
The Claude desktop application provides comprehensive support for MCP, enabling deep integration with local tools and data sources.

Key features:

Full support for resources, allowing attachment of local files and data
Support for prompt templates
Tool integration for executing commands and scripts
Local server connections for enhanced privacy and security
ⓘ Note: The Claude.ai web application does not currently support MCP. MCP features are only available in the desktop application.

​
Zed
Zed is a high-performance code editor with built-in MCP support, focusing on prompt templates and tool integration.

Key features:

Prompt templates surface as slash commands in the editor
Tool integration for enhanced coding workflows
Tight integration with editor features and workspace context
Does not support MCP resources
​
Sourcegraph Cody
Cody is Sourcegraph’s AI coding assistant, which implements MCP through OpenCTX.

Key features:

Support for MCP resources
Integration with Sourcegraph’s code intelligence
Uses OpenCTX as an abstraction layer
Future support planned for additional MCP features
​
Adding MCP support to your application
If you’ve added MCP support to your application, we encourage you to submit a pull request to add it to this list. MCP integration can provide your users with powerful contextual AI capabilities and make your application part of the growing MCP ecosystem.

Benefits of adding MCP support:

Enable users to bring their own context and tools
Join a growing ecosystem of interoperable AI applications
Provide users with flexible integration options
Support local-first AI workflows
To get started with implementing MCP in your application, check out our Python or TypeScript SDK Documentation

​
Updates and corrections
This list is maintained by the community. If you notice any inaccuracies or would like to update information about MCP support in your application, please submit a pull request or open an issue in our documentation repository.

Concepts
Core architecture
Understand how MCP connects clients, servers, and LLMs

The Model Context Protocol (MCP) is built on a flexible, extensible architecture that enables seamless communication between LLM applications and integrations. This document covers the core architectural components and concepts.

​
Overview
MCP follows a client-server architecture where:

Hosts are LLM applications (like Claude Desktop or IDEs) that initiate connections
Clients maintain 1:1 connections with servers, inside the host application
Servers provide context, tools, and prompts to clients
Server Process
Server Process
 Host (e.g., Claude Desktop) 
Transport Layer
Transport Layer
MCP Server
MCP Server
MCP Client
MCP Client
​
Core components
​
Protocol layer
The protocol layer handles message framing, request/response linking, and high-level communication patterns.

TypeScript
Python

class Protocol<Request, Notification, Result> {
    // Handle incoming requests
    setRequestHandler<T>(schema: T, handler: (request: T, extra: RequestHandlerExtra) => Promise<Result>): void

    // Handle incoming notifications
    setNotificationHandler<T>(schema: T, handler: (notification: T) => Promise<void>): void

    // Send requests and await responses
    request<T>(request: Request, schema: T, options?: RequestOptions): Promise<T>

    // Send one-way notifications
    notification(notification: Notification): Promise<void>
}
Key classes include:

Protocol
Client
Server
​
Transport layer
The transport layer handles the actual communication between clients and servers. MCP supports multiple transport mechanisms:

Stdio transport

Uses standard input/output for communication
Ideal for local processes
HTTP with SSE transport

Uses Server-Sent Events for server-to-client messages
HTTP POST for client-to-server messages
All transports use JSON-RPC 2.0 to exchange messages. See the specification for detailed information about the Model Context Protocol message format.

​
Message types
MCP has these main types of messages:

Requests expect a response from the other side:


interface Request {
  method: string;
  params?: { ... };
}
Notifications are one-way messages that don’t expect a response:


interface Notification {
  method: string;
  params?: { ... };
}
Results are successful responses to requests:


interface Result {
  [key: string]: unknown;
}
Errors indicate that a request failed:


interface Error {
  code: number;
  message: string;
  data?: unknown;
}
​
Connection lifecycle
​
1. Initialization
Server
Client
Server
Client
Connection ready for use
initialize request
initialize response
initialized notification
Client sends initialize request with protocol version and capabilities
Server responds with its protocol version and capabilities
Client sends initialized notification as acknowledgment
Normal message exchange begins
​
2. Message exchange
After initialization, the following patterns are supported:

Request-Response: Client or server sends requests, the other responds
Notifications: Either party sends one-way messages
​
3. Termination
Either party can terminate the connection:

Clean shutdown via close()
Transport disconnection
Error conditions
​
Error handling
MCP defines these standard error codes:


enum ErrorCode {
  // Standard JSON-RPC error codes
  ParseError = -32700,
  InvalidRequest = -32600,
  MethodNotFound = -32601,
  InvalidParams = -32602,
  InternalError = -32603
}
SDKs and applications can define their own error codes above -32000.

Errors are propagated through:

Error responses to requests
Error events on transports
Protocol-level error handlers
​
Implementation example
Here’s a basic example of implementing an MCP server:

TypeScript
Python

import asyncio
import mcp.types as types
from mcp.server import Server
from mcp.server.stdio import stdio_server

app = Server("example-server")

@app.list_resources()
async def list_resources() -> list[types.Resource]:
    return [
        types.Resource(
            uri="example://resource",
            name="Example Resource"
        )
    ]

async def main():
    async with stdio_server() as streams:
        await app.run(
            streams[0],
            streams[1],
            app.create_initialization_options()
        )

if __name__ == "__main__":
    asyncio.run(main)
​
Best practices
​
Transport selection
Local communication

Use stdio transport for local processes
Efficient for same-machine communication
Simple process management
Remote communication

Use SSE for scenarios requiring HTTP compatibility
Consider security implications including authentication and authorization
​
Message handling
Request processing

Validate inputs thoroughly
Use type-safe schemas
Handle errors gracefully
Implement timeouts
Progress reporting

Use progress tokens for long operations
Report progress incrementally
Include total progress when known
Error management

Use appropriate error codes
Include helpful error messages
Clean up resources on errors
​
Security considerations
Transport security

Use TLS for remote connections
Validate connection origins
Implement authentication when needed
Message validation

Validate all incoming messages
Sanitize inputs
Check message size limits
Verify JSON-RPC format
Resource protection

Implement access controls
Validate resource paths
Monitor resource usage
Rate limit requests
Error handling

Don’t leak sensitive information
Log security-relevant errors
Implement proper cleanup
Handle DoS scenarios
​
Debugging and monitoring
Logging

Log protocol events
Track message flow
Monitor performance
Record errors
Diagnostics

Implement health checks
Monitor connection state
Track resource usage
Profile performance
Testing

Test different transports
Verify error handling
Check edge cases
Load test servers
Inspector

Concepts
Resources
Expose data and content from your servers to LLMs

Resources are a core primitive in the Model Context Protocol (MCP) that allow servers to expose data and content that can be read by clients and used as context for LLM interactions.

Resources are designed to be application-controlled, meaning that the client application can decide how and when they should be used.

For example, one application may require users to explicitly select resources, while another could automatically select them based on heuristics or even at the discretion of the AI model itself.

​
Overview
Resources represent any kind of data that an MCP server wants to make available to clients. This can include:

File contents
Database records
API responses
Live system data
Screenshots and images
Log files
And more
Each resource is identified by a unique URI and can contain either text or binary data.

​
Resource URIs
Resources are identified using URIs that follow this format:


[protocol]://[host]/[path]
For example:

file:///home/user/documents/report.pdf
postgres://database/customers/schema
screen://localhost/display1
The protocol and path structure is defined by the MCP server implementation. Servers can define their own custom URI schemes.

​
Resource types
Resources can contain two types of content:

​
Text resources
Text resources contain UTF-8 encoded text data. These are suitable for:

Source code
Configuration files
Log files
JSON/XML data
Plain text
​
Binary resources
Binary resources contain raw binary data encoded in base64. These are suitable for:

Images
PDFs
Audio files
Video files
Other non-text formats
​
Resource discovery
Clients can discover available resources through two main methods:

​
Direct resources
Servers expose a list of concrete resources via the resources/list endpoint. Each resource includes:


{
  uri: string;           // Unique identifier for the resource
  name: string;          // Human-readable name
  description?: string;  // Optional description
  mimeType?: string;     // Optional MIME type
}
​
Resource templates
For dynamic resources, servers can expose URI templates that clients can use to construct valid resource URIs:


{
  uriTemplate: string;   // URI template following RFC 6570
  name: string;          // Human-readable name for this type
  description?: string;  // Optional description
  mimeType?: string;     // Optional MIME type for all matching resources
}
​
Reading resources
To read a resource, clients make a resources/read request with the resource URI.

The server responds with a list of resource contents:


{
  contents: [
    {
      uri: string;        // The URI of the resource
      mimeType?: string;  // Optional MIME type

      // One of:
      text?: string;      // For text resources
      blob?: string;      // For binary resources (base64 encoded)
    }
  ]
}
Servers may return multiple resources in response to one resources/read request. This could be used, for example, to return a list of files inside a directory when the directory is read.

​
Resource updates
MCP supports real-time updates for resources through two mechanisms:

​
List changes
Servers can notify clients when their list of available resources changes via the notifications/resources/list_changed notification.

​
Content changes
Clients can subscribe to updates for specific resources:

Client sends resources/subscribe with resource URI
Server sends notifications/resources/updated when the resource changes
Client can fetch latest content with resources/read
Client can unsubscribe with resources/unsubscribe
​
Example implementation
Here’s a simple example of implementing resource support in an MCP server:

TypeScript
Python

app = Server("example-server")

@app.list_resources()
async def list_resources() -> list[types.Resource]:
    return [
        types.Resource(
            uri="file:///logs/app.log",
            name="Application Logs",
            mimeType="text/plain"
        )
    ]

@app.read_resource()
async def read_resource(uri: AnyUrl) -> str:
    if str(uri) == "file:///logs/app.log":
        log_contents = await read_log_file()
        return log_contents

    raise ValueError("Resource not found")

# Start server
async with stdio_server() as streams:
    await app.run(
        streams[0],
        streams[1],
        app.create_initialization_options()
    )
​
Best practices
When implementing resource support:

Use clear, descriptive resource names and URIs
Include helpful descriptions to guide LLM understanding
Set appropriate MIME types when known
Implement resource templates for dynamic content
Use subscriptions for frequently changing resources
Handle errors gracefully with clear error messages
Consider pagination for large resource lists
Cache resource contents when appropriate
Validate URIs before processing
Document your custom URI schemes
​
Security considerations
When exposing resources:

Validate all resource URIs
Implement appropriate access controls
Sanitize file paths to prevent directory traversal
Be cautious with binary data handling
Consider rate limiting for resource reads
Audit resource access
Encrypt sensitive data in transit
Validate MIME types
Implement timeouts for long-running reads
Handle resource cleanup appropriately

Concepts
Prompts
Create resuable prompt templates and workflows

Prompts enable servers to define reusable prompt templates and workflows that clients can easily surface to users and LLMs. They provide a powerful way to standardize and share common LLM interactions.

Prompts are designed to be user-controlled, meaning they are exposed from servers to clients with the intention of the user being able to explicitly select them for use.

​
Overview
Prompts in MCP are predefined templates that can:

Accept dynamic arguments
Include context from resources
Chain multiple interactions
Guide specific workflows
Surface as UI elements (like slash commands)
​
Prompt structure
Each prompt is defined with:


{
  name: string;              // Unique identifier for the prompt
  description?: string;      // Human-readable description
  arguments?: [              // Optional list of arguments
    {
      name: string;          // Argument identifier
      description?: string;  // Argument description
      required?: boolean;    // Whether argument is required
    }
  ]
}
​
Discovering prompts
Clients can discover available prompts through the prompts/list endpoint:


// Request
{
  method: "prompts/list"
}

// Response
{
  prompts: [
    {
      name: "analyze-code",
      description: "Analyze code for potential improvements",
      arguments: [
        {
          name: "language",
          description: "Programming language",
          required: true
        }
      ]
    }
  ]
}
​
Using prompts
To use a prompt, clients make a prompts/get request:


// Request
{
  method: "prompts/get",
  params: {
    name: "analyze-code",
    arguments: {
      language: "python"
    }
  }
}

// Response
{
  description: "Analyze Python code for potential improvements",
  messages: [
    {
      role: "user",
      content: {
        type: "text",
        text: "Please analyze the following Python code for potential improvements:\n\n```python\ndef calculate_sum(numbers):\n    total = 0\n    for num in numbers:\n        total = total + num\n    return total\n\nresult = calculate_sum([1, 2, 3, 4, 5])\nprint(result)\n```"
      }
    }
  ]
}
​
Dynamic prompts
Prompts can be dynamic and include:

​
Embedded resource context

{
  "name": "analyze-project",
  "description": "Analyze project logs and code",
  "arguments": [
    {
      "name": "timeframe",
      "description": "Time period to analyze logs",
      "required": true
    },
    {
      "name": "fileUri",
      "description": "URI of code file to review",
      "required": true
    }
  ]
}
When handling the prompts/get request:


{
  "messages": [
    {
      "role": "user",
      "content": {
        "type": "text",
        "text": "Analyze these system logs and the code file for any issues:"
      }
    },
    {
      "role": "user",
      "content": {
        "type": "resource",
        "resource": {
          "uri": "logs://recent?timeframe=1h",
          "text": "[2024-03-14 15:32:11] ERROR: Connection timeout in network.py:127\n[2024-03-14 15:32:15] WARN: Retrying connection (attempt 2/3)\n[2024-03-14 15:32:20] ERROR: Max retries exceeded",
          "mimeType": "text/plain"
        }
      }
    },
    {
      "role": "user",
      "content": {
        "type": "resource",
        "resource": {
          "uri": "file:///path/to/code.py",
          "text": "def connect_to_service(timeout=30):\n    retries = 3\n    for attempt in range(retries):\n        try:\n            return establish_connection(timeout)\n        except TimeoutError:\n            if attempt == retries - 1:\n                raise\n            time.sleep(5)\n\ndef establish_connection(timeout):\n    # Connection implementation\n    pass",
          "mimeType": "text/x-python"
        }
      }
    }
  ]
}
​
Multi-step workflows

const debugWorkflow = {
  name: "debug-error",
  async getMessages(error: string) {
    return [
      {
        role: "user",
        content: {
          type: "text",
          text: `Here's an error I'm seeing: ${error}`
        }
      },
      {
        role: "assistant",
        content: {
          type: "text",
          text: "I'll help analyze this error. What have you tried so far?"
        }
      },
      {
        role: "user",
        content: {
          type: "text",
          text: "I've tried restarting the service, but the error persists."
        }
      }
    ];
  }
};
​
Example implementation
Here’s a complete example of implementing prompts in an MCP server:

TypeScript
Python

from mcp.server import Server
import mcp.types as types

# Define available prompts
PROMPTS = {
    "git-commit": types.Prompt(
        name="git-commit",
        description="Generate a Git commit message",
        arguments=[
            types.PromptArgument(
                name="changes",
                description="Git diff or description of changes",
                required=True
            )
        ],
    ),
    "explain-code": types.Prompt(
        name="explain-code",
        description="Explain how code works",
        arguments=[
            types.PromptArgument(
                name="code",
                description="Code to explain",
                required=True
            ),
            types.PromptArgument(
                name="language",
                description="Programming language",
                required=False
            )
        ],
    )
}

# Initialize server
app = Server("example-prompts-server")

@app.list_prompts()
async def list_prompts() -> list[types.Prompt]:
    return list(PROMPTS.values())

@app.get_prompt()
async def get_prompt(
    name: str, arguments: dict[str, str] | None = None
) -> types.GetPromptResult:
    if name not in PROMPTS:
        raise ValueError(f"Prompt not found: {name}")

    if name == "git-commit":
        changes = arguments.get("changes") if arguments else ""
        return types.GetPromptResult(
            messages=[
                types.PromptMessage(
                    role="user",
                    content=types.TextContent(
                        type="text",
                        text=f"Generate a concise but descriptive commit message "
                        f"for these changes:\n\n{changes}"
                    )
                )
            ]
        )

    if name == "explain-code":
        code = arguments.get("code") if arguments else ""
        language = arguments.get("language", "Unknown") if arguments else "Unknown"
        return types.GetPromptResult(
            messages=[
                types.PromptMessage(
                    role="user",
                    content=types.TextContent(
                        type="text",
                        text=f"Explain how this {language} code works:\n\n{code}"
                    )
                )
            ]
        )

    raise ValueError("Prompt implementation not found")
​
Best practices
When implementing prompts:

Use clear, descriptive prompt names
Provide detailed descriptions for prompts and arguments
Validate all required arguments
Handle missing arguments gracefully
Consider versioning for prompt templates
Cache dynamic content when appropriate
Implement error handling
Document expected argument formats
Consider prompt composability
Test prompts with various inputs
​
UI integration
Prompts can be surfaced in client UIs as:

Slash commands
Quick actions
Context menu items
Command palette entries
Guided workflows
Interactive forms
​
Updates and changes
Servers can notify clients about prompt changes:

Server capability: prompts.listChanged
Notification: notifications/prompts/list_changed
Client re-fetches prompt list
​
Security considerations
When implementing prompts:

Validate all arguments
Sanitize user input
Consider rate limiting
Implement access controls
Audit prompt usage
Handle sensitive data appropriately
Validate generated content
Implement timeouts
Consider prompt injection risks
Document security requirements

Concepts
Tools
Enable LLMs to perform actions through your server

Tools are a powerful primitive in the Model Context Protocol (MCP) that enable servers to expose executable functionality to clients. Through tools, LLMs can interact with external systems, perform computations, and take actions in the real world.

Tools are designed to be model-controlled, meaning that tools are exposed from servers to clients with the intention of the AI model being able to automatically invoke them (with a human in the loop to grant approval).

​
Overview
Tools in MCP allow servers to expose executable functions that can be invoked by clients and used by LLMs to perform actions. Key aspects of tools include:

Discovery: Clients can list available tools through the tools/list endpoint
Invocation: Tools are called using the tools/call endpoint, where servers perform the requested operation and return results
Flexibility: Tools can range from simple calculations to complex API interactions
Like resources, tools are identified by unique names and can include descriptions to guide their usage. However, unlike resources, tools represent dynamic operations that can modify state or interact with external systems.

​
Tool definition structure
Each tool is defined with the following structure:


{
  name: string;          // Unique identifier for the tool
  description?: string;  // Human-readable description
  inputSchema: {         // JSON Schema for the tool's parameters
    type: "object",
    properties: { ... }  // Tool-specific parameters
  }
}
​
Implementing tools
Here’s an example of implementing a basic tool in an MCP server:

TypeScript
Python

app = Server("example-server")

@app.list_tools()
async def list_tools() -> list[types.Tool]:
    return [
        types.Tool(
            name="calculate_sum",
            description="Add two numbers together",
            inputSchema={
                "type": "object",
                "properties": {
                    "a": {"type": "number"},
                    "b": {"type": "number"}
                },
                "required": ["a", "b"]
            }
        )
    ]

@app.call_tool()
async def call_tool(
    name: str,
    arguments: dict
) -> list[types.TextContent | types.ImageContent | types.EmbeddedResource]:
    if name == "calculate_sum":
        a = arguments["a"]
        b = arguments["b"]
        result = a + b
        return [types.TextContent(type="text", text=str(result))]
    raise ValueError(f"Tool not found: {name}")
​
Example tool patterns
Here are some examples of types of tools that a server could provide:

​
System operations
Tools that interact with the local system:


{
  name: "execute_command",
  description: "Run a shell command",
  inputSchema: {
    type: "object",
    properties: {
      command: { type: "string" },
      args: { type: "array", items: { type: "string" } }
    }
  }
}
​
API integrations
Tools that wrap external APIs:


{
  name: "github_create_issue",
  description: "Create a GitHub issue",
  inputSchema: {
    type: "object",
    properties: {
      title: { type: "string" },
      body: { type: "string" },
      labels: { type: "array", items: { type: "string" } }
    }
  }
}
​
Data processing
Tools that transform or analyze data:


{
  name: "analyze_csv",
  description: "Analyze a CSV file",
  inputSchema: {
    type: "object",
    properties: {
      filepath: { type: "string" },
      operations: {
        type: "array",
        items: {
          enum: ["sum", "average", "count"]
        }
      }
    }
  }
}
​
Best practices
When implementing tools:

Provide clear, descriptive names and descriptions
Use detailed JSON Schema definitions for parameters
Include examples in tool descriptions to demonstrate how the model should use them
Implement proper error handling and validation
Use progress reporting for long operations
Keep tool operations focused and atomic
Document expected return value structures
Implement proper timeouts
Consider rate limiting for resource-intensive operations
Log tool usage for debugging and monitoring
​
Security considerations
When exposing tools:

​
Input validation
Validate all parameters against the schema
Sanitize file paths and system commands
Validate URLs and external identifiers
Check parameter sizes and ranges
Prevent command injection
​
Access control
Implement authentication where needed
Use appropriate authorization checks
Audit tool usage
Rate limit requests
Monitor for abuse
​
Error handling
Don’t expose internal errors to clients
Log security-relevant errors
Handle timeouts appropriately
Clean up resources after errors
Validate return values
​
Tool discovery and updates
MCP supports dynamic tool discovery:

Clients can list available tools at any time
Servers can notify clients when tools change using notifications/tools/list_changed
Tools can be added or removed during runtime
Tool definitions can be updated (though this should be done carefully)
​
Error handling
Tool errors should be reported within the result object, not as MCP protocol-level errors. This allows the LLM to see and potentially handle the error. When a tool encounters an error:

Set isError to true in the result
Include error details in the content array
Here’s an example of proper error handling for tools:

TypeScript
Python

try:
    # Tool operation
    result = perform_operation()
    return types.CallToolResult(
        content=[
            types.TextContent(
                type="text",
                text=f"Operation successful: {result}"
            )
        ]
    )
except Exception as error:
    return types.CallToolResult(
        isError=True,
        content=[
            types.TextContent(
                type="text",
                text=f"Error: {str(error)}"
            )
        ]
    )
This approach allows the LLM to see that an error occurred and potentially take corrective action or request human intervention.

​
Testing tools
A comprehensive testing strategy for MCP tools should cover:

Functional testing: Verify tools execute correctly with valid inputs and handle invalid inputs appropriately
Integration testing: Test tool interaction with external systems using both real and mocked dependencies
Security testing: Validate authentication, authorization, input sanitization, and rate limiting
Performance testing: Check behavior under load, timeout handling, and resource cleanup
Error handling: Ensure tools properly report errors through the MCP protocol and clean up resources

Concepts
Sampling
Let your servers request completions from LLMs

Sampling is a powerful MCP feature that allows servers to request LLM completions through the client, enabling sophisticated agentic behaviors while maintaining security and privacy.

This feature of MCP is not yet supported in the Claude Desktop client.

​
How sampling works
The sampling flow follows these steps:

Server sends a sampling/createMessage request to the client
Client reviews the request and can modify it
Client samples from an LLM
Client reviews the completion
Client returns the result to the server
This human-in-the-loop design ensures users maintain control over what the LLM sees and generates.

​
Message format
Sampling requests use a standardized message format:


{
  messages: [
    {
      role: "user" | "assistant",
      content: {
        type: "text" | "image",

        // For text:
        text?: string,

        // For images:
        data?: string,             // base64 encoded
        mimeType?: string
      }
    }
  ],
  modelPreferences?: {
    hints?: [{
      name?: string                // Suggested model name/family
    }],
    costPriority?: number,         // 0-1, importance of minimizing cost
    speedPriority?: number,        // 0-1, importance of low latency
    intelligencePriority?: number  // 0-1, importance of capabilities
  },
  systemPrompt?: string,
  includeContext?: "none" | "thisServer" | "allServers",
  temperature?: number,
  maxTokens: number,
  stopSequences?: string[],
  metadata?: Record<string, unknown>
}
​
Request parameters
​
Messages
The messages array contains the conversation history to send to the LLM. Each message has:

role: Either “user” or “assistant”
content: The message content, which can be:
Text content with a text field
Image content with data (base64) and mimeType fields
​
Model preferences
The modelPreferences object allows servers to specify their model selection preferences:

hints: Array of model name suggestions that clients can use to select an appropriate model:

name: String that can match full or partial model names (e.g. “claude-3”, “sonnet”)
Clients may map hints to equivalent models from different providers
Multiple hints are evaluated in preference order
Priority values (0-1 normalized):

costPriority: Importance of minimizing costs
speedPriority: Importance of low latency response
intelligencePriority: Importance of advanced model capabilities
Clients make the final model selection based on these preferences and their available models.

​
System prompt
An optional systemPrompt field allows servers to request a specific system prompt. The client may modify or ignore this.

​
Context inclusion
The includeContext parameter specifies what MCP context to include:

"none": No additional context
"thisServer": Include context from the requesting server
"allServers": Include context from all connected MCP servers
The client controls what context is actually included.

​
Sampling parameters
Fine-tune the LLM sampling with:

temperature: Controls randomness (0.0 to 1.0)
maxTokens: Maximum tokens to generate
stopSequences: Array of sequences that stop generation
metadata: Additional provider-specific parameters
​
Response format
The client returns a completion result:


{
  model: string,  // Name of the model used
  stopReason?: "endTurn" | "stopSequence" | "maxTokens" | string,
  role: "user" | "assistant",
  content: {
    type: "text" | "image",
    text?: string,
    data?: string,
    mimeType?: string
  }
}
​
Example request
Here’s an example of requesting sampling from a client:


{
  "method": "sampling/createMessage",
  "params": {
    "messages": [
      {
        "role": "user",
        "content": {
          "type": "text",
          "text": "What files are in the current directory?"
        }
      }
    ],
    "systemPrompt": "You are a helpful file system assistant.",
    "includeContext": "thisServer",
    "maxTokens": 100
  }
}
​
Best practices
When implementing sampling:

Always provide clear, well-structured prompts
Handle both text and image content appropriately
Set reasonable token limits
Include relevant context through includeContext
Validate responses before using them
Handle errors gracefully
Consider rate limiting sampling requests
Document expected sampling behavior
Test with various model parameters
Monitor sampling costs
​
Human in the loop controls
Sampling is designed with human oversight in mind:

​
For prompts
Clients should show users the proposed prompt
Users should be able to modify or reject prompts
System prompts can be filtered or modified
Context inclusion is controlled by the client
​
For completions
Clients should show users the completion
Users should be able to modify or reject completions
Clients can filter or modify completions
Users control which model is used
​
Security considerations
When implementing sampling:

Validate all message content
Sanitize sensitive information
Implement appropriate rate limits
Monitor sampling usage
Encrypt data in transit
Handle user data privacy
Audit sampling requests
Control cost exposure
Implement timeouts
Handle model errors gracefully
​
Common patterns
​
Agentic workflows
Sampling enables agentic patterns like:

Reading and analyzing resources
Making decisions based on context
Generating structured data
Handling multi-step tasks
Providing interactive assistance
​
Context management
Best practices for context:

Request minimal necessary context
Structure context clearly
Handle context size limits
Update context as needed
Clean up stale context
​
Error handling
Robust error handling should:

Catch sampling failures
Handle timeout errors
Manage rate limits
Validate responses
Provide fallback behaviors
Log errors appropriately
​
Limitations
Be aware of these limitations:

Sampling depends on client capabilities
Users control sampling behavior
Context size has limits
Rate limits may apply
Costs should be considered
Model availability varies
Response times vary
Not all content types supported

Concepts
Transports
Learn about MCP’s communication mechanisms

Transports in the Model Context Protocol (MCP) provide the foundation for communication between clients and servers. A transport handles the underlying mechanics of how messages are sent and received.

​
Message Format
MCP uses JSON-RPC 2.0 as its wire format. The transport layer is responsible for converting MCP protocol messages into JSON-RPC format for transmission and converting received JSON-RPC messages back into MCP protocol messages.

There are three types of JSON-RPC messages used:

​
Requests

{
  jsonrpc: "2.0",
  id: number | string,
  method: string,
  params?: object
}
​
Responses

{
  jsonrpc: "2.0",
  id: number | string,
  result?: object,
  error?: {
    code: number,
    message: string,
    data?: unknown
  }
}
​
Notifications

{
  jsonrpc: "2.0",
  method: string,
  params?: object
}
​
Built-in Transport Types
MCP includes two standard transport implementations:

​
Standard Input/Output (stdio)
The stdio transport enables communication through standard input and output streams. This is particularly useful for local integrations and command-line tools.

Use stdio when:

Building command-line tools
Implementing local integrations
Needing simple process communication
Working with shell scripts
TypeScript (Server)
TypeScript (Client)
Python (Server)
Python (Client)

const server = new Server({
  name: "example-server",
  version: "1.0.0"
}, {
  capabilities: {}
});

const transport = new StdioServerTransport();
await server.connect(transport);
​
Server-Sent Events (SSE)
SSE transport enables server-to-client streaming with HTTP POST requests for client-to-server communication.

Use SSE when:

Only server-to-client streaming is needed
Working with restricted networks
Implementing simple updates
TypeScript (Server)
TypeScript (Client)
Python (Server)
Python (Client)

from mcp.server.sse import SseServerTransport
from starlette.applications import Starlette
from starlette.routing import Route

app = Server("example-server")
sse = SseServerTransport("/messages")

async def handle_sse(scope, receive, send):
    async with sse.connect_sse(scope, receive, send) as streams:
        await app.run(streams[0], streams[1], app.create_initialization_options())

async def handle_messages(scope, receive, send):
    await sse.handle_post_message(scope, receive, send)

starlette_app = Starlette(
    routes=[
        Route("/sse", endpoint=handle_sse),
        Route("/messages", endpoint=handle_messages, methods=["POST"]),
    ]
)
​
Custom Transports
MCP makes it easy to implement custom transports for specific needs. Any transport implementation just needs to conform to the Transport interface:

You can implement custom transports for:

Custom network protocols
Specialized communication channels
Integration with existing systems
Performance optimization
TypeScript
Python
Note that while MCP Servers are often implemented with asyncio, we recommend implementing low-level interfaces like transports with anyio for wider compatibility.


@contextmanager
async def create_transport(
    read_stream: MemoryObjectReceiveStream[JSONRPCMessage | Exception],
    write_stream: MemoryObjectSendStream[JSONRPCMessage]
):
    """
    Transport interface for MCP.

    Args:
        read_stream: Stream to read incoming messages from
        write_stream: Stream to write outgoing messages to
    """
    async with anyio.create_task_group() as tg:
        try:
            # Start processing messages
            tg.start_soon(lambda: process_messages(read_stream))

            # Send messages
            async with write_stream:
                yield write_stream

        except Exception as exc:
            # Handle errors
            raise exc
        finally:
            # Clean up
            tg.cancel_scope.cancel()
            await write_stream.aclose()
            await read_stream.aclose()
​
Error Handling
Transport implementations should handle various error scenarios:

Connection errors
Message parsing errors
Protocol errors
Network timeouts
Resource cleanup
Example error handling:

TypeScript
Python
Note that while MCP Servers are often implemented with asyncio, we recommend implementing low-level interfaces like transports with anyio for wider compatibility.


@contextmanager
async def example_transport(scope: Scope, receive: Receive, send: Send):
    try:
        # Create streams for bidirectional communication
        read_stream_writer, read_stream = anyio.create_memory_object_stream(0)
        write_stream, write_stream_reader = anyio.create_memory_object_stream(0)

        async def message_handler():
            try:
                async with read_stream_writer:
                    # Message handling logic
                    pass
            except Exception as exc:
                logger.error(f"Failed to handle message: {exc}")
                raise exc

        async with anyio.create_task_group() as tg:
            tg.start_soon(message_handler)
            try:
                # Yield streams for communication
                yield read_stream, write_stream
            except Exception as exc:
                logger.error(f"Transport error: {exc}")
                raise exc
            finally:
                tg.cancel_scope.cancel()
                await write_stream.aclose()
                await read_stream.aclose()
    except Exception as exc:
        logger.error(f"Failed to initialize transport: {exc}")
        raise exc
​
Best Practices
When implementing or using MCP transport:

Handle connection lifecycle properly
Implement proper error handling
Clean up resources on connection close
Use appropriate timeouts
Validate messages before sending
Log transport events for debugging
Implement reconnection logic when appropriate
Handle backpressure in message queues
Monitor connection health
Implement proper security measures
​
Security Considerations
When implementing transport:

​
Authentication and Authorization
Implement proper authentication mechanisms
Validate client credentials
Use secure token handling
Implement authorization checks
​
Data Security
Use TLS for network transport
Encrypt sensitive data
Validate message integrity
Implement message size limits
Sanitize input data
​
Network Security
Implement rate limiting
Use appropriate timeouts
Handle denial of service scenarios
Monitor for unusual patterns
Implement proper firewall rules
​
Debugging Transport
Tips for debugging transport issues:

Enable debug logging
Monitor message flow
Check connection states
Validate message formats
Test error scenarios
Use network analysis tools
Implement health checks
Monitor resource usage
Test edge cases
Use proper error tracking

Python (Client)

async with sse_client("http://localhost:8000/sse") as streams:
    async with ClientSession(streams[0], streams[1]) as session:
        await session.initialize()