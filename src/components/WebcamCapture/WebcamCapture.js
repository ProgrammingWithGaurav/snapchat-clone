import React, { useCallback, useRef } from 'react';
import Webcam from 'react-webcam';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from '../../features/cameraSlice';
import { useNavigate } from 'react-router-dom';
import './WebcamCapture.css';

const videoContraints = {
    width: 250,
    height: 400,
    facingMode: 'user',
    audio: false
}

function WebcamCapture() {
    const webcamRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        navigate('/preview');
    }, [webcamRef])
    return (
        <div className='webcamCapture'>
            <Webcam
                screenshotFormat='image/jpeg'
                videoConstraints={videoContraints}
                ref={webcamRef} />
            <RadioButtonUncheckedIcon fontSize='large' className="webcamCapture-button" onClick={capture} />
        </div>
    )
}

export default WebcamCapture
