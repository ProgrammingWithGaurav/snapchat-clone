import React, { useEffect } from 'react';
import './Preview.css';
import { useSelector } from 'react-redux';
import { resetCameraImage, selectCameraImage } from '../../features/cameraSlice';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { v4 as uuid } from 'uuid';
import { db, storage } from '../../firebase';
import {selectUser} from '../../features/appSlice';
import firebase from 'firebase';

// icons
import CloseIcon from '@material-ui/icons/Close';
import TextFieldsIcon from '@material-ui/icons/TextFields';
import CreateIcon from '@material-ui/icons/Create';
import NoteIcon from '@material-ui/icons/Note';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import CropIcon from '@material-ui/icons/Crop';
import TimerIcon from '@material-ui/icons/Timer';
import SendIcon from '@material-ui/icons/Send';

function Preview() {
    const cameraImage = useSelector(selectCameraImage);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);

    useEffect(() => {
        if (!cameraImage) {
            navigate('/');
        }
    }, [cameraImage, navigate])

    const closePreview = () => {
        dispatch(resetCameraImage());
        navigate('/');
    }

    const sendPost = () => {
        const id = uuid();
        const uploadTask = storage.ref(`snapchat_posts/${id}`).putString(cameraImage, 'data_url')

        uploadTask.on('state_changed', null, (error) => {
            console.log(error);
        }, () => {
            storage.ref('snapchat_posts').child(id).getDownloadURL()
                .then((url) => {
                    db.collection('snapchat_posts').add({
                        imageUrl: url,
                        username: user.username,
                        read: false,
                        profilePic: user.profilePic,
                        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    })
                    navigate('/chats');
                })
        })
    }
    return (
        <div className='preview'>
            <CloseIcon className="preview-close" onClick={closePreview} />
            <div className="preview-toolbarRight">
                <TextFieldsIcon />
                <CreateIcon />
                <NoteIcon />
                <MusicNoteIcon />
                <AttachFileIcon />
                <CropIcon />
                <TimerIcon />
            </div>
            <img src={cameraImage} alt="user-img" />
            <div className="preview-footer" onClick={sendPost}>
                <h2>Send Now</h2>
                <SendIcon fontSize="small" className="preview-sendIcon" />
            </div>
        </div>
    )
}

export default Preview
