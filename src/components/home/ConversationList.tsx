import * as React from "react"
import { cn } from "../../lib/utils"

import { Textarea } from "../Textarea"


// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConversationListProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ConversationList = React.forwardRef<HTMLTextAreaElement, ConversationListProps>(
    ({ className, ...props }, ref) => {

        return (
            <div className={cn("bg-zinc-800 flex justify-center", className)}>
                <h1>
                    Chats
                </h1>
            </div>
        )
    }
)


export default ConversationList
