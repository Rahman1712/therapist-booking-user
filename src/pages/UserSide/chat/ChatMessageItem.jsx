/* eslint-disable react/prop-types */

const ChatMessageItem = ({ isself, icon, message, timestamp }) => {
  return (
    <div className={`${isself ? 'col-start-6 col-end-13 ' : 'col-start-1 col-end-8 '}  p-3 rounded-lg`}>
      <div className={`flex items-center ${isself ? ' justify-start flex-row-reverse' : ' flex-row'}`}>
        <div
          className={`flex items-center justify-center h-10 w-10 rounded-full flex-shrink-0`}
        >
          {icon}
        </div>
        <div
          className={`relative ${isself ? 'mr-3' : 'ml-3'} text-sm ${isself ? 'bg-indigo-100' : 'bg-white'} py-2 px-4 shadow rounded-xl`}
        >
          <div className="mb-1">{message}</div>
          <div className="text-xs text-[.6rem] text-gray-500">{formatTimestamp(timestamp)}</div>
        </div>
      </div>
    </div>
  );
}

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  const options = {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  };
  const formattedTime = new Intl.DateTimeFormat('en-US', options).format(date);
  return formattedTime;
}

export default ChatMessageItem;
