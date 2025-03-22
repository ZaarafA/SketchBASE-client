import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";

const Messages = () => {
    const [users, setUsers] = useState([]);
    const [activeUser, setActiveUser] = useState(null);

    useEffect(() => {
        // Fetch all users from Firestore
        // TODO: only show users that have started a conversation
        const fetchUsers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "Users"));
                const usersList = querySnapshot.docs.map(doc => ({
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

    return (
        <div className="container">
            <Header />
            <div className="main">
                <Sidebar />
                <div className="content messages-content">
                    {/* Left Panel: List of All Users*/}
                    <div className="users-panel">
                        {users.map(user => (
                            <div key={user.id}
                                className={`user-box ${activeUser && activeUser.id === user.id ? 'active' : ''}`}
                                onClick={() => setActiveUser(user)}
                            >
                                <img src="https://picsum.photos/200" alt="User Profile" className="user-image" />
                                <p>{user.name}</p>
                            </div>
                        ))}
                    </div>
                    {/* Right Panel: Chat Area */}
                    <div className="chat-panel">
                        {/* Show messages if an user is selected */}
                        {activeUser ? (
                            <>
                                <div className="chat-header">
                                    <p>{activeUser.name}</p>
                                </div>
                                <div className="chat-messages">
                                    <p>Messages with {activeUser.name}</p>
                                </div>
                                <div className="chat-typebar">
                                    <input type="text" placeholder="Type your message..." />
                                    <button>Send</button>
                                </div>
                            </>
                        ) : (
                            <div className="no-active-user">
                                <p>Select a user</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Messages;
