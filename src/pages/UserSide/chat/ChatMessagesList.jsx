/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import ChatMessageItem from "./ChatMessageItem"

const ChatMessagesList = ({messages, therapistAvatar, userAvatar}) => {
  const {roomId} = useSelector((state) => state.chat);

  return (
    <div className="h-full overflow-hidden py-4">
      <div className="h-full overflow-y-auto">
       {roomId ? 
        <>
        {messages && messages.length > 0  ?
        <div className="grid grid-cols-12 gap-y-2">
          {messages.map((message) => (
            <ChatMessageItem
              key={message.id}
              isself={message.role == "USER"}
              icon={message.role == "USER" ? userAvatar: therapistAvatar}
              message={message.content}
              timestamp={message.timestamp}
            />
          ))}
        </div>
        :
        <div className="text-center flex justify-center items-center mt-10">
          <span className="text-cyan-900 font-roboto-mono">no messages in this chat</span>
        </div>
        }
        </>
        :
        <div className="text-center flex justify-center items-center mt-10">
          <span className="text-cyan-900 font-roboto-mono">select a therapist to chat</span>
        </div>
        }
      </div>
    </div>
  )
}

export default ChatMessagesList