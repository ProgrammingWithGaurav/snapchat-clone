import { Avatar } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { auth, db } from '../../firebase';
import './Chats.css';

// Icons
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import Chat from '../Chat/Chat';
import { useSelector } from 'react-redux';
import { selectUser } from '../../features/appSlice';
import { resetCameraImage } from '../../features/cameraSlice'
import RadioButtonUnCheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

function Chats() {
    const [posts, setPosts] = useState([]);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    const takeSnap = () => {
        dispatch(resetCameraImage());
        navigate('/');
    }

    useEffect(() => {
        db.collection('snapchat_posts')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => setPosts(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data(),
            }))))
    }, [])
    return (
        <div>
            <div className="chats-header">
                <Avatar className='chats-avatar' src={user.profilePic} onClick={() => auth.signOut()} />
                <div className="chats-search">
                    <SearchIcon className="chats-searchIcon" />
                    <input type="text" placeholder='Friends' />
                </div>
                <ChatBubbleIcon className="chats-chatIcon" />
            </div>

            <div className="chats-posts">
                {posts.map(({ id, data: { profilePic, username, timestamp, imageUrl, read } }) => {
                    return (<Chat
                        key={id}
                        id={id}
                        username={username}
                        timestamp={timestamp}
                        imageUrl={imageUrl}
                        read={read}
                        profilePic={profilePic} />
                    )
                })}
            </div>

            <RadioButtonUnCheckedIcon
                className="chats-takePicIcon"
                onClick={takeSnap}
                fontSize='large'
            />
        </div>
    )
}

export default Chats
