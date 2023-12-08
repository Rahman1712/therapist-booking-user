/* eslint-disable react/prop-types */
import { useDispatch, useSelector } from "react-redux";
import { chatActions } from "../../../store/chat-slice";
import { getAvatarTherapist } from '../../../utils/AvatarUtils';
import { useState } from "react";

const ChatNameItem = ({ therapist }) => {
  const [therapistColors, setTherapistColors] = useState({}); 
  const { activeTherapist } = useSelector((state) => state.chat);
  const { id } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const setActiveChat = () => {
    // alert(`user_${id}_therapist_${therapist.therapistId}`);
    dispatch(chatActions.setActiveTherapist({ activeTherapist: therapist }));
    dispatch(chatActions.setRoomId({ roomId: `user_${id}_therapist_${therapist.therapistId}` }));
  }

  return (
    <div className={`flex flex-row items-center p-4 relative cursor-pointer  ${activeTherapist?.therapistId === therapist.therapistId && 'bg-blue-100 rounded-md'}`} onClick={setActiveChat}>

      {getAvatarTherapist(therapist, therapistColors, setTherapistColors)} 

      <div className="flex flex-col flex-grow ml-3">
        <div className="text-sm font-medium">{therapist.fullname}</div>
      </div>
    </div>
  )
}

export default ChatNameItem