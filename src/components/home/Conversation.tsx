import * as React from "react";
import { cn } from "../../lib/utils";
import { useState, useEffect } from "react";
import { SendHorizontal } from "lucide-react";

import { Textarea } from "../Textarea";
import { Button } from "../Button";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConversationProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  chatIndex: number;
}

const Conversation = React.forwardRef<HTMLTextAreaElement, ConversationProps>(
  ({ className, chatIndex, ...props }, ref) => {
    const [prompt, setPrompt] = useState("");
    const [messages, setMessages] = useState([]);
    const [canSend, setCanSend] = useState(true);

    useEffect(() => {
      (async () => {
        const chatList = await (window as any).electronAPI.getStoreValue(
          "chat_list",
        );
        setMessages(chatList[chatIndex]);
      })();
    }, [chatIndex]);

    const storeMessages = async (updatedMessages: Array<string>) => {
      console.log("Updating chat list with new messages");
      const chatList = await (window as any).electronAPI.getStoreValue(
        "chat_list",
      );
      chatList[chatIndex] = updatedMessages;
      await (window as any).electronAPI.setStoreValue("chat_list", chatList);
    };

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
      storeMessages(newMessageHistory);
    };

    return (
      <div
        className={cn("flex flex-col items-center overflow-clip", className)}
      >
        <div className="max-h-full w-10/12 flex-grow overflow-scroll">
          <ul className="">
            {messages.map((message) => {
              return (
                <div className="p-6">
                  <h1 className="font-bold underline">{message.role}</h1>
                  <li className="break-words p-6">{message.content}</li>
                </div>
              );
            })}
          </ul>
        </div>
        <div className="h-1/12 my-10 flex w-5/6 flex-row items-center space-x-8 align-middle">
          <Textarea
            className="h-full resize-none"
            placeholder="Message Ollama"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <Button
            onClick={generate}
            disabled={!canSend || prompt.trim().length <= 0}
          >
            <SendHorizontal />
          </Button>
        </div>
      </div>
    );
  },
);

export default Conversation;
