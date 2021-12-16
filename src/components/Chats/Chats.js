import { Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase';
import './Chats.css';

// Icons
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

function Chats() {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        db.collection('snapchat_chats')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))))
    }, [])
    return (
        <div>
            <div className="chats-header">
                <Avatar className='chats-avatar' />
                <div className="chats-search">
                    <SearchIcon />
                    <input type="text" placeholder='Friends' />
                </div>
                <ChatBubbleIcon className="chats-chatIcon" />
            </div>

            <div className="chats-posts">
                {posts.map(({ id, data: { profilePic, username, timestamp, imageUrl, read } }) => {
                    <Chat
                        key={id}
                        id={id}
                        username={username}
                        timestamp={timestamp}
                        imageUrl={imageUrl}
                        read={read}
                        profilePic={profilePic} />
                })}
            </div>
        </div>
    )
}

export default Chats
