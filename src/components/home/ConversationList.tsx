import * as React from "react";
import { cn } from "../../lib/utils";
import { Settings, BadgePlus } from "lucide-react";
import { useEffect, useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConversationListProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  setChatIndex: Function;
}

const ConversationList = React.forwardRef<
  HTMLTextAreaElement,
  ConversationListProps
>(({ className, setChatIndex, ...props }, ref) => {
  const [chatList, setChatList] = useState([]);

  useEffect(() => {
    console.log("Loading chats...");
    loadChats();
  }, []);

  const loadChats = async () => {
    const chats = await (window as any).electronAPI.getStoreValue("chat_list");
    console.log(chats);
    setChatList(chats);
  };

  const settingsClick = async () => {
    console.log("Settings clicked");
    const model = await (window as any).electronAPI.getStoreValue("model");
    console.log("Running model: ", model);
  };

  const createChat = async () => {
    const chat: any = [];

    await (window as any).electronAPI.setStoreValue("chat_list", [
      ...chatList,
      chat,
    ]);

    setChatIndex(chatList.length);
    setChatList([...chatList, chat]);
  };

  return (
    <div
      className={cn(
        "bg-primary flex flex-col items-center justify-center py-4",
        className,
      )}
    >
      <div className="flex-grow justify-center">
        <h1 className="text-center text-lg underline">Chats</h1>
        <ul className="">
          {chatList.map((chats, index) => {
            return (
              <div onClick={() => setChatIndex(index)} className="py-2">
                <li key={chats} className="break-words">
                  Chat {index}
                </li>
              </div>
            );
          })}
        </ul>
      </div>

      <div className="flex w-1/3 justify-between">
        <button
          className="hover:text-primary-foreground/50"
          onClick={settingsClick}
        >
          <Settings />
        </button>

        <button
          onClick={createChat}
          className="hover:text-primary-foreground/50"
        >
          <BadgePlus />
        </button>
      </div>
    </div>
  );
});

export default ConversationList;
