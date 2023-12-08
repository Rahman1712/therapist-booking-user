import  { useState } from 'react'
import AddChatNamePopup from './AddChatNamePopup';
import { chatsAxiosApi } from '../../../config/axiosConfig';
import { CHAT_MESSAGES_API } from '../../../constants';
import ChatNamesList from './ChatNamesList';

const ChatNamesSide = ({ therapistId, bookedUsers, fetchMessages }) => {
  const [isAddChatNameOpen, setAddChatNameOpen] = useState(false);

  const handleAddChatName = async (newChatUser) => {
    console.log('Added chat name:', newChatUser);
    const chatRequest = {
      userId: newChatUser.userId,
      therapistId,
      roomId: `user_${newChatUser.userId}_therapist_${therapistId}`
    };

    chatsAxiosApi.post(CHAT_MESSAGES_API + '/create', chatRequest)
      .then(response => {
        console.log('Chat created successfully:', response.data);
        fetchMessages();
      })
      .catch(error => {
        console.error('Error creating chat:', error.response ? error.response.data : error.message);
        // Handle error, show error message, etc.
      });
  };

  return (
    <div className="flex flex-row  flex-shrink-0 bg-transparent p-4
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

    w-1/4
    md:w-80
    ">
      <div className="flex flex-col w-full h-full pl-4 pr-4 py-4 -mr-4">
        <div className="flex flex-row items-center">
          <div className="flex flex-row items-center">
            <div className="text-xl font-semibold ">Messages</div>
          </div>
          <div className="ml-auto">
            <button className="flex items-center justify-center h-7 w-7 bg-gray-200 text-gray-500 rounded-full">
              <svg className="w-4 h-4 stroke-current"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            </button>
          </div>
        </div>


        <div className="mt-5">
          <div className="text-xs text-gray-400 font-semibold uppercase">
            Users
          </div>
        </div>
        <div className="h-full overflow-hidden relative pt-2">

         <ChatNamesList />

          <div className="absolute bottom-0 right-0 mr-2">
            <button
              onClick={() => setAddChatNameOpen(true)}
              className="flex items-center justify-center shadow-sm h-10 w-10 bg-red-500 text-white rounded-full">
              <svg className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
            </button>
          </div>

        </div>
      </div>

      {isAddChatNameOpen &&
        <AddChatNamePopup
          isOpen={isAddChatNameOpen}
          onClose={() => setAddChatNameOpen(false)}
          onSubmit={handleAddChatName}
          bookedUsers={bookedUsers}
        />
      }
    </div>
  )
}

export default ChatNamesSide