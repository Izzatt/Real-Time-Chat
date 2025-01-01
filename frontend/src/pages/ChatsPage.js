import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import io from 'socket.io-client';
import '../styles.css';

function ChatPage() {
    const { chatId } = useParams(); // Get the chat ID from the URL
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [socket, setSocket] = useState(null);

    const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
    const userId = localStorage.getItem('user_id'); // Get the current user ID

    useEffect(() => {
        // Initialize WebSocket connection
        const socketInstance = io(API_BASE_URL);
        setSocket(socketInstance);

        // Join the specific chat room
        socketInstance.emit('join', { chat_id: chatId });

        // Listen for incoming messages
        socketInstance.on('message', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socketInstance.disconnect();
        };
    }, [API_BASE_URL, chatId]);

    useEffect(() => {
        // Fetch chat history on component mount
        const fetchMessages = async () => {
            try {
                const response = await axios.get(`http://backend:5000/api/chats/${chatId}`, {
                    params: { user_id: userId },
                });
                setMessages(response.data);
            } catch (error) {
                console.error('Error fetching chat messages:', error.response || error);
            }
        };

        fetchMessages();
    }, [API_BASE_URL, chatId, userId]);

    const handleSendMessage = async (e) => {
        e.preventDefault();

        if (!newMessage.trim()) return;

        const messageData = {
            chat_id: chatId,
            sender_id: userId,
            message: newMessage,
        };

        try {
            // Send the message via API
            await axios.post(`${API_BASE_URL}/api/chats/${chatId}/message`, messageData);

            // Emit the message to the WebSocket
            socket.emit('message', messageData);

            // Clear the input field
            setNewMessage('');
        } catch (error) {
            console.error('Error sending message:', error.response || error);
        }
    };

    return (
        <div className="chat-page">
            <div className="chat-header">
                <h2>Chat</h2>
            </div>
            <div className="chat-messages">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`message ${msg.sender_id === userId ? 'sent' : 'received'}`}
                    >
                        <span className="message-sender">
                            {msg.sender_username || 'Unknown'}
                        </span>
                        <p className="message-content">{msg.content}</p>
                    </div>
                ))}
            </div>
            <form className="chat-input" onSubmit={handleSendMessage}>
                <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    required
                />
                <button type="submit">Send</button>
            </form>
        </div>
    );
}

export default ChatPage;
