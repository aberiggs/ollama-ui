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
    const [messages, setMessages] = useState([]);
    const [canSend, setCanSend] = useState(true);

    const generate = async () => {
      setCanSend(false); // Disable button to prevent duplicate sends

      const newMessageHistory = [
        ...messages,
        { role: "user", content: prompt },
      ];

      const data = {
        model: "gemma:2b",
        messages: newMessageHistory,
        stream: false,
      };

      setMessages(newMessageHistory);
      setPrompt("");

      try {
        const response = await fetch("http://localhost:11434/api/chat", {
          method: "POST",
          //mode: "cors", // no-cors, *cors, same-origin
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        });

        const result = await response.json();
        if (result.done && result.message) {
          setMessages([...newMessageHistory, result.message]);
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
            {messages.map((message) => {
              return (
                <div className="w-full p-6">
                  <h1>{message.role}</h1>
                  <li className="break-words p-6">{message.content}</li>
                </div>
              );
            })}
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
