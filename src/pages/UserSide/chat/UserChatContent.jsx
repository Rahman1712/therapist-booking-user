import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SockJS from "sockjs-client/dist/sockjs";
import Stomp from 'stompjs';
import { chatActions } from "../../../store/chat-slice";
import { userAxiosApi } from "../../../config/axiosConfig";
import { USER_CHAT_MESSAGES_API, USER_BOOKING_API, WEBSOCKET_URI } from "../../../constants";
import ChatNamesSide from "./ChatNamesSide";
import ChatMessagesSide from "./ChatMessagesSide";

const UserChatContent = () => {

  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [bookedTherapists, setBookedTherapists] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  const {id, access_token} = useSelector((state) => state.auth);
  const {roomId, chatItem} = useSelector((state) => state.chat);
  const dispatch = useDispatch();

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
      { headers: {Authorization: `Bearer ${access_token}` }},
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
      {Authorization: `Bearer ${access_token}`},
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
      await loadBookedTherapistsData();
    } catch (error) {
      console.error('Error loading booked therapists data:', error);
    }
  
    try {
      await chatTherapistsData();
    } catch (error) {
      console.error('Error fetching chat therapists data:', error);
    }
  
    try {
      await fetchChatByRoomId(roomId);
    } catch (error) {
      console.error('Error fetching chat by roomId:', error);
    }
  }
  
  async function fetchChatByRoomId(roomId) {
    try{
    const response = await userAxiosApi.get(USER_CHAT_MESSAGES_API+ `/by-roomId/${roomId}`);
      console.log("Chat data " ,response.data);
      console.log("------------------==================--------------");
      setMessages(response.data.messages);
      dispatch(chatActions.setChatItem({chatItem: response.data}))
    }catch(error) {
      console.error(error);
    }
  }

  const loadBookedTherapistsData =  async () => {
    try {
      const response = await userAxiosApi.get(USER_BOOKING_API + `/book-therapists/by-user/${id}`);
      console.log(response.data);
      setBookedTherapists(response.data);
    } catch (error) {
      console.error(error);
    }
  }

  const chatTherapistsData = async () => {
    try {
      const response = await userAxiosApi.get(USER_CHAT_MESSAGES_API + `/therapists/${id}`);
      console.log(response.data);
      dispatch(chatActions.setTherapistsData({therapistsData : response.data}));
    } catch (error) {
      console.error(error);
    }
  }

  const sendMsg = () => {
    if(newMessage.trim() == ''){
      return;
    }
    stompClient.send(`/app/chat/${roomId}`, {}, JSON.stringify(
      { roomId: roomId,
        chatId: chatItem.id,
        content: newMessage, 
        role: "USER"
      }));
    // setNewMessage('');
  };

  return (
    <div className="flex flex-row h-[90vh] antialiased text-gray-800 w-full ">
      <ChatNamesSide 
      userId={id}
      bookedTherapists={bookedTherapists}
      fetchMessages={fetchMessages}
      />

      <ChatMessagesSide sendMsg={sendMsg} messages={messages} setNewMessage={setNewMessage} />
    </div>
  );
};

export default UserChatContent;
