import * as React from "react"
import { cn } from "../../lib/utils"

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface ConversationListProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const ConversationList = React.forwardRef<HTMLTextAreaElement, ConversationListProps>(
    ({ className, ...props }, ref) => {

        return (
            <div className={cn("bg-primary flex justify-center", className)}>
                <h1>
                    Chats
                </h1>
            </div>
        )
    }
)


export default ConversationList
