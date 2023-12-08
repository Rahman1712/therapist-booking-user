/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../../store/chat-slice";
import { getAvatar } from '../../../utils/AvatarUtils';
import { useState } from "react";

const ChatNameItem = ({ user }) => {
  const [userColors, setUserColors] = useState({}); // Maintain user colors
  const { activeUser } = useSelector((state) => state.chat);
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const setActiveChat = () => {
    dispatch(chatActions.setActiveUser({ activeUser: user }));
    dispatch(chatActions.setRoomId({ roomId: `user_${user.userId}_therapist_${id}` }));
  }

  return (
    <div className={`flex flex-row items-center p-4 relative cursor-pointer ${activeUser?.userId === user.userId && 'bg-blue-100 rounded-md'}`} onClick={setActiveChat}>

      {getAvatar(user, userColors, setUserColors)} {/* Use getAvatar from AvatarUtils */}

      <div className="flex flex-col flex-grow ml-3">
        <div className="text-sm font-medium">{user.fullname}</div>
      </div>
    </div>
  )
}

export default ChatNameItem