import { Avatar } from '@material-ui/core';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import React from 'react';
import './Chat.css';
import ReactTimeAgo from 'react-timeago';
import { selectImage } from '../../features/appSlice';
import { useDispatch } from 'react-redux';
import { db } from '../../firebase';
import { useNavigate } from 'react-router-dom';

function Chat({ id, username, timestamp, read, imageUrl, profilePic }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const open = () => {
        if (!read) {
            dispatch(selectImage(imageUrl));
            db.collection('snapchat_posts').doc(id).update({
                read: true,
            })
        };
        navigate('/chats/view');
    }
    return (
        <div onClick={open} className='chat'>
            <Avatar className='chat-avatar' src={profilePic} />
            <div className="chat-info">
                <h4>{username}</h4>
                <p>Tap to view - <ReactTimeAgo date={new Date(timestamp?.toDate()).toUTCString()} /></p>
            </div>

            {!read && <StopRoundedIcon className="chat-readIcon" />}
        </div>
    )
}

export default Chat
