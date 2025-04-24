import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import { createSocketConnection } from '../utils/socket';
import axios from 'axios';
import { BASE_URL } from '../utils/constants';

const Chat = () => {
  const { targetUserId } = useParams();
  // console.log(targetUserId)

  const[messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store)=> store.user)
  const userId = user?._id

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    // console.log(chat.data.messages);

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessages(chatMessages);
  };
  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if(!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", {firstName : user.firstName, userId, targetUserId})

    socket.on("messageReceived", ({firstName, lastName, text}) => {
      // console.log(firstName + " "+ text);
      setMessages((messages) => [...messages, {firstName, lastName, text}])
    })

    return () => {
      socket.disconnect();
    }
  }, [userId, targetUserId])

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {firstName : user.firstName, lastName : user.lastName, userId, targetUserId, text : newMessage})
    setNewMessage("")
  }

  return (
    <div className="w-3/4 mt-11 mx-auto border border-gray-600 h-[85vh] flex flex-col rounded-xl">
      <h1 className="p-4 border-b border-gray-600">Chat</h1>
      <div className="flex-1 overflow-scroll p-5">
        {messages.map((msg, index) => {
          return <div key={index} className={"chat " + (user.firstName === msg.firstName ? "chat-end" : "chat-start")}>
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <div className="chat-header">
              {` ${msg.firstName} ${msg.lastName}`}
              {/* <time className="text-xs opacity-50">12:45</time> */}
            </div>
            <div className="chat-bubble">{msg.text}</div>
            {/* <div className="chat-footer opacity-50">Delivered</div> */}
          </div>
        })}
      </div>
      <div className="p-5 border-t border-gray-600 flex items-center gap-2">
        <input className="flex-1 border border-gray-500 text-white rounded p-2" value={newMessage} onChange={(e) => setNewMessage(e.target.value)}/>
        <button className="btn btn-secondary" onClick={sendMessage}>Send</button>
      </div>
    </div>
  )
}

export default Chat