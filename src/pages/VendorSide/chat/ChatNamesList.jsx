import { useSelector } from 'react-redux';
import ChatNameItem from './ChatNameItem';

const ChatNamesList = () => {
  const {usersData} = useSelector((state) => state.chat);

  return (
    <div className="flex flex-col divide-y h-full overflow-y-auto ">
      {usersData.map((user,i) => (
        <ChatNameItem user={user} key={i} /> 
      ))}
     <hr className='border-b-gray-400' />
    </div>
  )
}

export default ChatNamesList