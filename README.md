# MCP Servers - OpenAI and Flux Integration

This repository contains MCP (Model Context Protocol) servers for integrating with OpenAI's o1 model and Flux capabilities.

## Server Configurations

### OpenAI o1 MCP Server

The o1 server enables interaction with OpenAI's o1 preview model through the MCP protocol.

```json
{
  "mcpServers": {
    "openai": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-openai"],
      "env": {
        "OPENAI_API_KEY": "<YOUR_OPENAI_API_KEY>"
      }
    }
  }
}
```

Key features:
- Direct access to o1-preview model
- Streaming support
- Temperature and top_p parameter control
- System message configuration

### Flux MCP Server

The Flux server provides integration with Flux capabilities through MCP.

```json
{
  "mcpServers": {
    "flux": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-flux"],
      "env": {
        "FLUX_API_KEY": "<YOUR_FLUX_API_KEY>"
      }
    }
  }
}
```

Key features:
- Real-time data processing
- Event streaming
- Batch operations
- Custom workflow integration

## Usage

1. Install dependencies:
```bash
npm install @modelcontextprotocol/server-openai @modelcontextprotocol/server-flux
```

2. Set up environment variables in your .env file:
```env
OPENAI_API_KEY=your_openai_key_here
FLUX_API_KEY=your_flux_key_here
```

3. Start the servers using the configurations above.

## Security

- Store API keys securely
- Use environment variables for sensitive data
- Follow security best practices in SECURITY.md

## License

MIT License - See LICENSE file for details.