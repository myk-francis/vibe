import { gemini, createAgent } from "@inngest/agent-kit";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    // Create a new agent with a system prompt (you can add optional tools, too)
    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert next.js deloper.  You wrinte readable, mentainable code. You write simple Next.js & React snippets",
      model: gemini({ model: "gemini-2.0-flash" }),
    });

    // Run the agent with an input.  This automatically uses steps
    // to call your AI model.
    const { output } = await codeAgent.run(
      `Write the following snippet of code: ${event.data.value}`
    );

    return {
      output,
    };
  }
);
