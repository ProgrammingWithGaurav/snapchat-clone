import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectSelectedImage } from '../../features/appSlice';
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import './ChatView.css';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';

function ChatView() {
    const navigate = useNavigate();
    const selectedImage = useSelector(selectSelectedImage);
    useEffect(() => {
        if (!selectedImage) {
            exit();
        }
    }, [selectedImage])
    const exit = () => {
        navigate('/chats');
    }
    return (
        <div className="chatView">
            <img src={selectedImage} alt="image" />
            <div className="chatView-timer">
                <CountdownCircleTimer isPlaying duration={10} strokeWidth={10} size={50} colors={[
                    ['#004777', 0.33],
                    ['#F7B801', 0.33],
                    ['#A30000', 0.33],
                ]}>
                    {({ remainingTime }) => {
                        if (remainingTime === 0) {
                            exit();
                        }
                        return remainingTime
                    }}
                </CountdownCircleTimer>
            </div>
        </div>
    )
}

export default ChatView
