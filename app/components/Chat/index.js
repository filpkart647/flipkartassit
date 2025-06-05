import { getReq } from '@/utils/apiHandlers';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import Loading from '../Loading';
import dayjs from 'dayjs';
import { io } from 'socket.io-client';
const SOCKET_SERVER_URL = 'https://filpkartclone-6hc7.onrender.com';
const socket = io(SOCKET_SERVER_URL);

function Chat() {
  const [loading, setLoading] = useState(false);
  const [messageInput, setMessageInput] = useState('');
  const userData = JSON.parse(localStorage.getItem('userData'));
  const bottomRef = useRef(null);
  const [previousMessages, setPreviousMessages] = useState([]);
  const receiverId = userData?.randAdId || '';
  // useEffect(() => {
  //   if (receiverId.trim() !== '') {
  //     socket.emit('register', receiverId);
  //   }
  // }, [receiverId]);
  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      if (
        message?.receiver === userData?.id &&
        message?.sender === receiverId
      ) {
        setPreviousMessages((prev) => [...prev, message]);
      }
    });
    return () => {
      socket.off('receiveMessage');
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const sendMessage = (e) => {
    e.preventDefault();
    if (messageInput.trim() === '' || receiverId?.trim() === '') return;
    socket.emit('sendMessage', {
      senderId: userData?.id,
      receiverId: receiverId,
      content: messageInput,
    });
    const sentMsg = {
      sender: userData?.id,
      receiver: receiverId,
      content: messageInput,
      timestamp: new Date().toISOString(),
    };
    setPreviousMessages((prev) => [...prev, sentMsg]);
    setMessageInput('');
  };

  const getMessages = useCallback(async () => {
    if (!userData?.id) return;
    setLoading(true);
    try {
      const res = await getReq(`/chat/${userData.id}`);
      const { data, status, error } = res;
      if (status) {
        setPreviousMessages(data);
      } else if (error) {
        console.error(error);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [userData?.id]);

  useEffect(() => {
    getMessages();
  }, [getMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView();
  }, [previousMessages]);

  return (
    <>
      {loading && <Loading />}
      <section>
        <div className="bg-[#1e1e2f]  rounded-lg shadow-md h-[calc(100dvh-70px)] border border-gray-200">
          <div className="flex flex-col h-full">
            {/* Message List */}
            <div className="flex-1 overflow-y-auto p-2 bg-[#f1f3f6] rounded-md chatBg">
              {previousMessages?.map((msg, index) => (
                <div
                  key={index}
                  className={`flex flex-col ${
                    userData?.id === msg?.sender
                      ? 'items-end justify-end pl-5'
                      : 'items-start justify-start pr-5'
                  } mb-1`}
                >
                  <div
                    className={`p-2 rounded-md text-sm ${
                      userData?.id === msg?.sender
                        ? 'bg-[#4e88ff] text-white'
                        : 'bg-[#2d2d3a] text-gray-100'
                    }`}
                  >
                    {msg?.content}
                  </div>
                  <span className="text-gray-500 text-xs leading-3">
                    {dayjs(msg?.timestamp).format('hh:mm A')}
                  </span>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={sendMessage}
              className="bg-[#2a2a3b] border-t border-gray-300"
            >
              <div className="flex">
                <input
                  type="text"
                  className="w-full px-2 py-2 border rounded-none outline-none"
                  placeholder="Type your message..."
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white hover:bg-blue-600"
                >
                  Send
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Chat;
