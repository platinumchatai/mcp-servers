Install Replicate’s Node.js client library
npm install replicate

Copy
Set the REPLICATE_API_TOKEN environment variable
export REPLICATE_API_TOKEN=<paste-your-token-here>

Visibility

Copy
Find your API token in your account settings.

Import and set up the client
import Replicate from "replicate";

const replicate = new Replicate({
  auth: process.env.REPLICATE_API_TOKEN,
});

Copy
Run black-forest-labs/flux-dev using Replicate’s API. Check out the model's schema for an overview of inputs and outputs.

const input = {
  prompt: "black forest gateau cake spelling out the words \"FLUX DEV\", tasty, food photography, dynamic shot",
  go_fast: true,
  guidance: 3.5,
  megapixels: "1",
  num_outputs: 1,
  aspect_ratio: "1:1",
  output_format: "webp",
  output_quality: 80,
  prompt_strength: 0.8,
  num_inference_steps: 28
};

const output = await replicate.run("black-forest-labs/flux-dev", { input });
console.log(output);

Run a model from Node.js
Table of contents

Prerequisites
🐇 Quickstart: Scaffold a project with a one-liner
🐢 Slowstart: Set up a project from scratch
Step 1: Authenticate
Step 2: Create a new Node.js project
Step 3: Install the Replicate JavaScript client
Step 4: Write some code
Step 5: Run your code
Next steps
Further reading
Learn how to run a model on Replicate using Node.js.

This guide includes a quickstart to scaffold a new project with a single command in your terminal, followed by a step-by-step tutorial for setting up a project from scratch. By the end, you'll have a working Node.js project that can run any model on Replicate.

Prerequisites
Node.js 16 or greater: The simplest way to install Node.js is using the installer at nodejs.org.

🐇 Quickstart: Scaffold a project with a one-liner
To get up and running as quickly as possible, you can use create-replicate, an npm package that creates a project directory for you, writes some starter code, installs the dependencies, and runs the code.

Run the following command to scaffold a new project:


Copy
npx create-replicate
That's it. You should now have a working Node.js project that generates images with the SDXL model using Replicate's API.

If you want to use a different model than SDXL, specify it when creating your project:


Copy
npx create-replicate --model black-forest-labs/flux-schnell
To learn more about scaffolding new Node.js projects, check out the create-replicate documentation.

🐢 Slowstart: Set up a project from scratch
If you prefer to manually set up your Node.js project step by step, follow the instructions below.

Step 1: Authenticate
Authenticate by setting your Replicate API token in an environment variable:


Copy
export REPLICATE_API_TOKEN=r8_******
Step 2: Create a new Node.js project

Copy
# create the directory
mkdir my-replicate-app
cd my-replicate-app
 
# set up package.json
npm init -y
npm pkg set type=module
Step 3: Install the Replicate JavaScript client
Use npm to install the Replicate JavaScript client:


Copy
npm install replicate
Step 4: Write some code
Create a file called index.js and add the following code:


Copy
import Replicate from "replicate";
const replicate = new Replicate();
 
console.log("Running the model...");
const [output] = await replicate.run(
  "black-forest-labs/flux-schnell",
  {
    input: {
      prompt: "An astronaut riding a rainbow unicorn, cinematic, dramatic",
    },
  }
);
 
// Save the generated image
import { writeFile } from "node:fs/promises";
 
await writeFile("./output.png", output);
console.log("Image saved as output.png");
Step 5: Run your code
Next, run your code from your terminal:


Copy
node index.js
You should see output indicating the model is running and the image has been saved:


Copy
Running the model...
Image saved as output.png