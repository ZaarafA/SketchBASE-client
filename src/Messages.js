import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { collection, getDocs, addDoc, serverTimestamp, query, orderBy, onSnapshot } from "firebase/firestore";
import { db, auth } from "./firebase";

const Messages = () => {
    const [users, setUsers] = useState([]);
    const [activeUser, setActiveUser] = useState(null);
    const [messageText, setMessageText] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        // Fetch all users from Firestore
        // TODO: only show users that have started a conversation
        const fetchUsers = async () => {
            try {
                const query = await getDocs(collection(db, "Users"));
                const usersList = query.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setUsers(usersList);
            } catch (error) {
                console.error("Error fetching users: ", error);
            }
        };

        fetchUsers();
    }, []);

    useEffect(() => {
        if (!activeUser) return;
        // Get all messages chronologically
        const messagesQuery = query(collection(db, "Messages"), orderBy("createdAt"));

        // event listener for new message docs
        const subscribe = onSnapshot(messagesQuery, (snapshot) => {
            const messagesList = snapshot.docs
                .map(doc => ({ id: doc.id, ...doc.data() }))
                .filter(msg =>
                    // filter only messages in this conversation
                    (msg.from === auth.currentUser.uid && msg.to === activeUser.id) ||
                    (msg.from === activeUser.id && msg.to === auth.currentUser.uid)
                );
            setMessages(messagesList);
        });

        return () => subscribe();
    }, [activeUser]);

    // Function to send a new message
    const sendMessage = async () => {
        if (!messageText.trim() || !activeUser) return;
        try {
            await addDoc(collection(db, "Messages"), {
                text: messageText,
                createdAt: serverTimestamp(),
                to: activeUser.id,
                from: auth.currentUser.uid,
            });
            setMessageText("");
        } catch (error) {
            console.error("Error sending message: ", error);
        }
    };

    return (
        <div className="container">
            <Header />
            <div className="main">
                <Sidebar />
                <div className="content messages-content">
                    {/* Left Panel: List of All Users*/}
                    <div className="users-panel">
                        <p>Direct Messages</p>
                        {users.map(user => (
                            <div key={user.id}
                                className={`user-box ${activeUser && activeUser.id === user.id ? 'active' : ''}`}
                                onClick={() => {if(auth.currentUser){setActiveUser(user)}}}
                            >
                                <img src="https://picsum.photos/200" alt="User Profile" className="user-image" />
                                <p>{user.name}</p>
                            </div>
                        ))}
                    </div>
                    {/* Right Panel: Chat Area */}
                    <div className="chat-panel">
                        {activeUser ? (
                            <>
                                <div className="chat-header">
                                    <p>{activeUser.name}</p>
                                </div>
                                <div className="chat-messages">
                                    {messages.length > 0 ? (
                                        messages.map(msg => (
                                            <div key={msg.id} className={`message ${msg.from === auth.currentUser.uid ? 'sent' : 'received'}`}>
                                                <p>{msg.text}</p>
                                            </div>
                                        ))
                                    ) : (<p>No messages yet.</p>)}
                                </div>
                                <div className="chat-typebar">
                                    <input type="text" placeholder="Type your message..." value={messageText}
                                        onChange={(e) => setMessageText(e.target.value)}/>
                                    <button onClick={sendMessage}>Send</button>
                                </div>
                            </>
                        ) : (<div className="no-active-user">
                                <p>Login and Select a user</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
