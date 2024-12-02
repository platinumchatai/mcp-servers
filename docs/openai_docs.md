Developer quickstart
Learn how to make your first API request.
The OpenAI API provides a simple interface to state-of-the-art AI models for natural language processing, image generation, semantic search, and speech recognition. Follow this guide to learn how to generate human-like responses to natural language prompts, create vector embeddings for semantic search, and generate images from textual descriptions.

Create and export an API key
Create an API key in the dashboard here, which you’ll use to securely access the API. Store the key in a safe location, like a .zshrc file or another text file on your computer. Once you’ve generated an API key, export it as an environment variable in your terminal.

Export an environment variable on macOS or Linux systems

export OPENAI_API_KEY="your_api_key_here"
Make your first API request
With your OpenAI API key exported as an environment variable, you're ready to make your first API request. You can either use the REST API directly with the HTTP client of your choice, or use one of our official SDKs as shown below.

To use the OpenAI API in server-side JavaScript environments like Node.js, Deno, or Bun, you can use the official OpenAI SDK for TypeScript and JavaScript. Get started by installing the SDK using npm or your preferred package manager:

Install the OpenAI SDK with npm

npm install openai
With the OpenAI SDK installed, create a file called example.mjs and copy one of the following examples into it:

Create a human-like response to a prompt

import OpenAI from "openai";
const openai = new OpenAI();

const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
            role: "user",
            content: "Write a haiku about recursion in programming.",
        },
    ],
});

console.log(completion.choices[0].message);
Execute the code with node example.mjs (or the equivalent command for Deno or Bun). In a few moments, you should see the output of your API request!


OpenAI developer platform
Developer quickstart
Set up your environment and make your first API request in minutes
5 min

import OpenAI from "openai";
const openai = new OpenAI();
const completion = await openai.chat.completions.create({
    model: "gpt-4o",
    messages: [
        {"role": "user", "content": "write a haiku about ai"}
    ]
});