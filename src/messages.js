import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';
import proPic from './images/pro_pic.png';

const initialMessages = [
  {
    id: '1',
    name: 'John Doe',
    message: 'Looking forward to the event!',
    timeSent: '12:30 PM',
    daysAgo: '1d',
    unreadCount: 2,
    replies: [],
  },
  {
    id: '2',
    name: 'Jane Smith',
    message: 'Can I get more details?',
    timeSent: '10:15 AM',
    daysAgo: '3d',
    unreadCount: 1,
    replies: [],
  },
  {
    id: '3',
    name: 'Emily Johnson',
    message: 'Excited to attend!',
    timeSent: '09:45 AM',
    daysAgo: '5d',
    unreadCount: 0,
    replies: [],
  },
];

const Messages = () => {
  const navigate = useNavigate();
  const [reply, setReply] = useState('');
  const [messages, setMessages] = useState(initialMessages);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBack = () => {
    navigate(-1);
  };

  const handleReplyClick = (message) => {
    setSelectedMessage(message);
    setIsModalOpen(true);
  };

  const handleSendMessage = () => {
    if (reply.trim() === '') return; // Prevent empty replies

    const updatedMessages = messages.map((msg) => {
      if (msg.id === selectedMessage.id) {
        const newReplies = [...msg.replies, reply];
        return {
          ...msg,
          replies: newReplies, // Add reply to the selected message
        };
      }
      return msg;
    });

    setMessages(updatedMessages);
    setReply(''); // Clear the input

    // Automatically display your sent message below the sender's message
    const newReply = {
      message: reply,
      timeSent: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), // Current time
    };

    const updatedMessageWithReply = {
      ...selectedMessage,
      replies: [...selectedMessage.replies, newReply],
    };

    setSelectedMessage(updatedMessageWithReply); // Update selected message with the new reply
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMessage(null);
  };

  return (
    <div className="gradientContainer-messages">
      <button onClick={handleBack} className="closeButton-messages">
        &#x2715;
      </button>
      <div className="scrollViewContent-messages">
        {messages.map((message) => (
          <div key={message.id} className="messageContainer-messages" onClick={() => handleReplyClick(message)}>
            <img src={proPic} alt="Profile" className="profileImage-messages" />
            <div className="messageContent-messages">
              <p className="senderName-messages">{message.name}</p>
              <p className="messagePreview-messages">{message.message}</p>
            </div>
            <div className="messageDetails-messages">
              <p className="daysAgo-messages">{message.daysAgo}</p>
              {message.unreadCount > 0 && (
                <div className="reminderCircle-messages">
                  <p className="reminderText-messages">{message.unreadCount}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && selectedMessage && (
  <div className="modal-messages">
    <div className="modalContent-messages">
      <button onClick={handleCloseModal} className="closeModalButton-messages">X</button>
      
      <div className="modalHeader-messages">
        <img src={proPic} alt="Profile" className="modalProfileImage-messages" />
        <p className="modalSenderName-messages">{selectedMessage.name}</p>
      </div>
      <div className="separator-messages" />
      <div className="modalHeader-messages">
      <p className="modalTimeSent-messages">{selectedMessage.timeSent}</p>
      </div>
      <div className="messageDisplayContainer-messages">
        <div className="messageDisplay-messages">
          <p className="messageText-messages">{selectedMessage.message}</p>
        </div>
        {selectedMessage.replies.map((replyObj, index) => (
          <div key={index} className="replyDisplay-messages">
            <p className="replyText-messages">{replyObj.message}</p>
            <p className="replyTime-messages">{replyObj.timeSent}</p>
          </div>
        ))}
      </div>

      <div className="replyContainer-messages">
        <textarea
          className="replyInput-messages"
          value={reply}
          onChange={(e) => setReply(e.target.value)}
          placeholder="Type your reply here..."
        />
        <button className="sendButton-messages" onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  </div>
)}

    </div>
  );
};

export default Messages;
