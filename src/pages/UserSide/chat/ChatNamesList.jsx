import { useSelector } from 'react-redux';
import ChatNameItem from './ChatNameItem';

const ChatNamesList = () => {
  const {therapistsData} = useSelector((state) => state.chat);

  return (
    <div className="flex flex-col divide-y h-full overflow-y-auto ">
      {therapistsData.map((therapist,i) => (
        <ChatNameItem therapist={therapist} key={i} /> 
      ))}
     <hr className='border-b-gray-400' />
    </div>
  )
}

export default ChatNamesList