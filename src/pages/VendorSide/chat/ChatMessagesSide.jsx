/* eslint-disable react/prop-types */
import { useSelector } from 'react-redux';
import ChatMessagesList from './ChatMessagesList'
import { useRef, useState } from 'react';
import { getAvatar, getTherapistAvatar } from '../../../utils/AvatarUtils';

const ChatMessagesSide = ({ sendMsg, setNewMessage, messages }) => {
  const [userColors, setUserColors] = useState({}); // Maintain user colors
  const inputRef = useRef(null);

  const { activeUser } = useSelector((state) => state.chat);
  const { fullname, imageUrl } = useSelector((state) => state.auth);

  const userAvatar = getAvatar(activeUser, userColors, setUserColors);
  const therapistAvatar = getTherapistAvatar(fullname, imageUrl);

  const clearInput = () => {
    if (inputRef.current) {
      inputRef.current.value = '';
      setNewMessage('');
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMsg();
    clearInput();
  }

  return (
    <div className="flex flex-col h-full w-full bg-transparent px-4 py-6
    relative 
    before:bg-chat
    before:bg-cover
    before:absolute
    before:top-0
    before:right-0
    before:bottom-0
    before:left-0
    before:opacity-10
    before:-z-10
    ">

      {activeUser &&
        <div className="flex flex-row items-center py-4 px-6 rounded-2xl shadow">
          <div className="flex items-center justify-center h-10 w-10 rounded-full">
            {userAvatar}
          </div>
          <div className="flex flex-col ml-3">
            <div className="font-semibold text-sm">{activeUser?.fullname}</div>
            <div className="text-xs text-gray-500">{activeUser?.mobile}</div>
          </div>
        </div>
      }

      <ChatMessagesList messages={messages} userAvatar={userAvatar} therapistAvatar={therapistAvatar} />

      <form onSubmit={handleSendMessage}>
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center w-full border rounded-3xl h-12 px-2">
            <button className="flex items-center justify-center h-10 w-10 text-gray-400 ml-1">
              <svg className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"></path>
              </svg>
            </button>
            <div className="w-full">
              <input type="text"
                ref={inputRef}
                className="border border-transparent w-full focus:outline-none text-sm h-10 flex items-center" placeholder="Type your message...."
                onChange={(e) => { setNewMessage(e.target.value); }}
              />
            </div>
            <div className="flex flex-row">
              <button className="flex items-center justify-center h-10 w-8 text-gray-400">
                <svg className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"></path>
                </svg>
              </button>
              <button className="flex items-center justify-center h-10 w-8 text-gray-400 ml-1 mr-2">
                <svg className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
              </button>
            </div>
          </div>
          <div className="ml-6">
            <button
              type='submit'
              className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-200 hover:bg-gray-300 text-indigo-800 "
            // onClick={() => {
            //   sendMsg();
            //   clearInput();
            // }}
            >
              <svg className="w-5 h-5 transform rotate-90 -mr-px"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
              </svg>
            </button>
          </div>
        </div>
      </form>

    </div>
  )
}

export default ChatMessagesSide;