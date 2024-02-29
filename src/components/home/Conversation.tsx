import * as React from "react"
import { cn } from "../../lib/utils"

import { Textarea } from "../Textarea"
import { Button } from "../Button"


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConversationProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Conversation = React.forwardRef<HTMLTextAreaElement, ConversationProps>(
    ({ className, ...props }, ref) => {

        return (
            <div className={cn("flex flex-col items-center", className)}>
                <div className="flex-grow">

                </div>
                <div className="flex flex-row mb-10 w-5/6 align-middle items-center space-x-8">
                    <Textarea className="resize-none flex-grow" placeholder="Message Ollama"/>
                    <Button variant="destructive">Send</Button>
                </div>
                
            </div>
        )
    }
)

export default Conversation