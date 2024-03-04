import * as React from "react";
import { cn } from "../../lib/utils";
import { useState } from "react";

import { Textarea } from "../Textarea";
import { Button } from "../Button";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConversationProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Conversation = React.forwardRef<HTMLTextAreaElement, ConversationProps>(
  ({ className, ...props }, ref) => {
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([
      "**Sure, I can assist with testing. How can I help you?** **Here are some ways I can help with testing:** * **Identifying test cases:** I can help you identify the necessary test cases to be executed to ensure the functionality and performance of a product or system. * **Generating test scenarios:** I can generate comprehensive test scenarios that cover various scenarios and edge cases. * **Evaluating test results:** I can analyze and evaluate the results of test runs to identify and report any defects or areas for improvement. * **Providing test automation recommendations:** I can suggest best practices and automation techniques to streamline and improve test execution. * **Creating test reports:** I can generate comprehensive test reports that include detailed test cases, results, and pass/fail information. * **Identifying testing tools and frameworks:** I can recommend suitable testing tools and frameworks based on your specific requirements and programming language. **Please provide me with a specific request or question about testing, and I will be happy to assist you.**",
    ]);
    const [canSend, setCanSend] = useState(true);

    const generate = async () => {
      setCanSend(false); // Disable button to prevent duplicate sends

      const data = {
        model: "gemma:2b",
        prompt: prompt,
        stream: false,
      };

      try {
        const response = await fetch("http://localhost:11434/api/generate", {
          method: "POST",
          //mode: "cors", // no-cors, *cors, same-origin
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.response) {
          setMessages([...messages, result.response]);
          setPrompt("");
        } else {
          console.log("Awaited, but no response received: ", result);
        }
      } catch (error) {
        console.error("Error", error);
      }
      setCanSend(true);
    };

    return (
      <div className={cn("flex flex-col items-center", className)}>
        <div className="max-w-full flex-grow">
          <ul className="">
            {messages.map((message) => (
              <li className="break-words p-6">{message}</li>
            ))}
          </ul>
        </div>
        <div className="mb-10 flex w-5/6 flex-row items-center space-x-8 align-middle">
          <Textarea
            className="flex-grow resize-none"
            placeholder="Message Ollama"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button onClick={generate} disabled={!canSend}>
            Send
          </Button>
        </div>
      </div>
    );
  },
);

export default Conversation;
