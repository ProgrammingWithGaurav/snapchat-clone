import { Button } from '@material-ui/core';
import React from 'react';
import './Login.css';
import GithubIcon from '@material-ui/icons/GitHub';
import Google from './google_svg.svg'
import { useDispatch } from 'react-redux';
import { auth, providerGithub, providerGoogle } from '../../firebase';
import { login } from '../../features/appSlice';

function Login() {
    const dispatch = useDispatch();

    const signInGoogle = () => {
        auth.signInWithPopup(providerGoogle)
            .then(result => {
                dispatch(login({
                    username: result.user.displayName,
                    profilePic: result.user.photoURL,
                    id: result.user.uid
                }))
            }).catch(err => alert(err.message))
    }

    const signInGithub = () => {
        auth.signInWithPopup(providerGithub)
            .then(function (result) {
                var token = result.credential.accessToken;
                var user = result.user;

                console.log(token)
                console.log(user)
            }).catch(function (error) {
                alert(error.message);
            });
    }
    return (
        <div className="login">
            <div className="login-container">
                <img src="https://cdn-icons-png.flaticon.com/128/1409/1409941.png" alt="snapchat logo" />
                <Button variant="outlined" className="login-google" onClick={signInGoogle}>
                    <img src={Google} style={{ marginRight: '10px' }} />
                    Login with Google
                </Button>
                <Button variant="outlined" className="login-github" onClick={signInGithub}>
                    <GithubIcon style={{ marginRight: '10px' }} /> Login with Github
                </Button>
            </div>
        </div >
    )
}

export default Login
