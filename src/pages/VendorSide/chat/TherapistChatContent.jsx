import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from 'stompjs';
import { chatActions } from "../../../store/chat-slice";
import { chatsAxiosApi, therapistsAxiosApi } from "../../../config/axiosConfig";
import { CHAT_MESSAGES_API, THERAPIST_BOOKING_API, WEBSOCKET_URI } from "../../../constants";
import ChatNamesSide from "./ChatNamesSide";
import ChatMessagesSide from "./ChatMessagesSide";
import { useNavigate } from "react-router";

const TherapistChatContent = () => {

  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [bookedUsers, setBookedUsers] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const { id, access_token, submited, username } = useSelector((state) => state.auth);
  const { roomId, chatItem } = useSelector((state) => state.chat);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length == 2) {
      return parts.pop().split(";").shift();
    }
  }

  useEffect(() => {
    const socket = new SockJS(
      WEBSOCKET_URI,
      null,
      { headers: { Authorization: `Bearer ${access_token}` } },
    );
    const stomp = Stomp.over(socket);

    const headers = {
      Authorization: `Bearer ${access_token}`,
      "X-XSRF-TOKEN": getCookie("XSRF-TOKEN")
    }

    stomp.connect(headers, () => {
      setStompClient(stomp);
      stomp.subscribe(`/topic/chat/${roomId}`, (message) => {
        // Handle incoming messages
        const newMessage = JSON.parse(message.body);
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      },
        { Authorization: `Bearer ${access_token}` },
      );
    });

    fetchMessages();

    return () => {
      // Disconnect WebSocket on component unmount
      if (stomp.connected) {
        stomp.disconnect();
      }
    };
  }, [roomId]);


  async function fetchMessages() {
    try {
      await loadBookedUsersData();
    } catch (error) {
      console.error('Error loading booked users data:', error);
    }

    try {
      await chatUsersData();
    } catch (error) {
      console.error('Error fetching chat users data:', error);
    }

    try {
      await fetchChatByRoomId(roomId);
    } catch (error) {
      console.error('Error fetching chat by roomId:', error);
    }
  }

  async function fetchChatByRoomId(roomId) {
    try {
      const response = await chatsAxiosApi.get(CHAT_MESSAGES_API + `/by-roomId/${roomId}`);
      console.log("Chat data ", response.data);
      setMessages(response.data.messages);
      dispatch(chatActions.setChatItem({ chatItem: response.data }))
    } catch (error) {
      console.error(error);
    }
  }


  const loadBookedUsersData = async () => {
    try {
      const response = await therapistsAxiosApi.get(THERAPIST_BOOKING_API + `/book-users/by-therapist/${id}`);
      console.log(response.data);
      setBookedUsers(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const chatUsersData = async () => {
    try {
      const response = await chatsAxiosApi.get(CHAT_MESSAGES_API + `/users/${id}`);
      console.log(response.data);
      dispatch(chatActions.setUsersData({ usersData: response.data }));
    } catch (error) {
      console.error(error);
    }
  }

  const sendMsg = () => {
    if (newMessage.trim() == '') {
      return;
    }
    stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(
      {
        roomId: roomId,
        chatId: chatItem.id,
        content: newMessage,
        role: "THERAPIST"
      }));
    setNewMessage('');
  };

  return (
    <div className="flex flex-row h-[90vh] antialiased text-gray-800 w-full">
      {submited && (
        <>
          <ChatNamesSide
            therapistId={id}
            bookedUsers={bookedUsers}
            fetchMessages={fetchMessages}
          />

          <ChatMessagesSide sendMsg={sendMsg} messages={messages} setNewMessage={setNewMessage} />
        </>
      )}
      {!submited && (
        <div className="flex justify-center items-start w-full p-10 mt-5">
          <div className="mb-4 bg-white rounded-md shadow-md p-4 border-2 border-rose-400 w-full">
            <div className="flex flex-col mb-4 mt-5 justify-center items-center">
              <p className="font-semibold mb-2 text-center">details not added</p>
              <button
                onClick={() => navigate(`/vendor/detail/${username}`)}
                className="text-white bg-cyan-700 shadow-xl hover:bg-slate-200 hover:text-cyan-700  font-medium rounded-lg text-sm px-3 py-2.5 text-center mr-2 mb-2 w-[100px]">
                Add Detail
              </button>
            </div>
          </div>
        </div>
      )}

    </div>

  );
};

export default TherapistChatContent;
