import Conversation from "../components/home/Conversation"
import ConversationList from "../components/home/ConversationList"


const Home = () => {
    return (
        <div className="flex flex-row min-h-screen" >
            <ConversationList className="min-h-screen w-1/4"/>
            <Conversation className="flex-grow"/>
        </div>
    )
}

export default Home