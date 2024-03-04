import Conversation from "../components/home/Conversation";
import ConversationList from "../components/home/ConversationList";

const Home = () => {
  return (
    <div className="flex min-h-screen w-full flex-row">
      <ConversationList className="min-h-screen w-1/4" />
      <Conversation className="w-3/4" />
    </div>
  );
};

export default Home;
