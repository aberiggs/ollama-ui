import { Textarea } from "./components/Textarea"


const Root = () => {

    
    return(
        <div>
            <p className="text-3xl font-bold underline">
                Root route
            </p>
            <Textarea className="resize-none" placeholder="Message Ollama"/>
        </div>
    )
}

export default Root