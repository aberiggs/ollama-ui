import { useState } from "react";
import Conversation from "../components/home/Conversation";
import ConversationList from "../components/home/ConversationList";

const Home = () => {
  const [chatIndex, setChatIndex] = useState(-1);


  return (
    <div className="flex max-h-screen w-full flex-row">
      <ConversationList setChatIndex={setChatIndex} className="min-h-screen w-1/4" />

      <div className="w-3/4 h-screen">
      {(chatIndex >= 0)
          ? <Conversation chatIndex={chatIndex} className="h-screen" />
          : <NoOpenChatMessage />
        }
      </div>
    </div>
  );
};

const NoOpenChatMessage = () => {
  return (
  <div className="h-screen flex justify-center items-center">
    <p className="">Nothing to see here! Open or create a new chat.</p>
  </div>
  )
}

export default Home;
