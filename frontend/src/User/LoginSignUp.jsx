import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import FaceIcon from '@mui/icons-material/Face';
import "./LoginSignUp.css";

import { useDispatch, useSelector } from 'react-redux';
import { clearErrors, login, register } from '../feature/User/userSlice';
import Loader from '../component/layout/Loader/Loader';
import { useNavigate } from 'react-router-dom';

function LoginSignUp() {
    const dispatch = useDispatch();

    const navigate = useNavigate ();

    const { error, loading, isAuthenticated, user } = useSelector((state) => state.user);

    const loginTab = useRef(null);
    const registerTab = useRef(null);
    const switcherTab = useRef(null);

    const [loginEmail, setLoginEmail] = useState("");
    const [loginPassword, setLoginPassword] = useState("");

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        password: "",
    });

    const { name, email, password } = newUser;

    const [avatar, setAvatar] = useState();
    const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

    // --- login form submit handler ---
    const loginSubmit = (e) => {
        e.preventDefault();
        dispatch(login({ email: loginEmail, password: loginPassword }));
    };

    // --- register form submit handler ---
    const registerSubmit = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("name", name);
        myForm.set("email", email);
        myForm.set("password", password);
        myForm.set("avatar", avatar);

        dispatch(register({name: name, email: email, password: password, avatar: avatar}));

    };

    // --- handle form data for register ---
    const registerDataChange = (e) => {
        if (e.target.name === "avatar") {
            const reader = new FileReader();
            reader.onload = () => {
                if (reader.readyState === 2) {
                    setAvatarPreview(reader.result);
                    setAvatar(reader.result);
                }
            };
            reader.readAsDataURL(e.target.files[0]);
        } else {
            setNewUser({ ...newUser, [e.target.name]: e.target.value });
        }
    };

    // --- show alert if there's an error ---
    useEffect(() => {
        if (error) {
            alert(error);
            dispatch(clearErrors());
        }

        if(isAuthenticated) {
            navigate('/account');
        }
    }, [dispatch, error, isAuthenticated]);


    // --- switch tabs between login and register ---
    const switchTabs = (e, tab) => {
        if (tab === "login") {
            switcherTab.current.classList.add("shiftToNeutral");
            switcherTab.current.classList.remove("shiftToRight");

            registerTab.current.classList.remove("shiftToNeutralForm");
            loginTab.current.classList.remove("shiftToLeft");
        }
        if (tab === "register") {
            switcherTab.current.classList.remove("shiftToNeutral");
            switcherTab.current.classList.add("shiftToRight");

            registerTab.current.classList.add("shiftToNeutralForm");
            loginTab.current.classList.add("shiftToLeft");
        }
    };

    return (
        <>
            { loading ? ( 
                <Loader /> 
                ) : (
                    <>
                        <div className="LoginSignUpContainer">
                            <div className="LoginSignUpBox">
                                <div>
                                    <div className="login_signUp_toggle">
                                        <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                                        <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                                    </div>
                                    <button ref={switcherTab}></button>
                                </div>

                                {/* -------- LOGIN FORM -------- */}
                                <form className='loginForm' ref={loginTab} onSubmit={loginSubmit}>
                                    <div className="loginEmail">
                                        <MailOutlineIcon />
                                        <input
                                            type='email'
                                            placeholder='Email'
                                            required
                                            value={loginEmail}
                                            onChange={(e) => setLoginEmail(e.target.value)}
                                        />
                                    </div>

                                    <div className="loginPassword">
                                        <LockOpenIcon />
                                        <input
                                            type='password'
                                            placeholder='Password'
                                            required
                                            value={loginPassword}
                                            onChange={(e) => setLoginPassword(e.target.value)}
                                        />
                                    </div>

                                    <Link to="/password/forgot">Forget Password ?</Link>
                                    <input type='submit' value="Login" className='loginBtn' />
                                </form>

                                {/* -------- REGISTER FORM -------- */}
                                <form
                                    className='signUpForm'
                                    ref={registerTab}
                                    encType='multipart/form-data'
                                    onSubmit={registerSubmit}
                                >
                                    <div className="signUpName">
                                        <FaceIcon />
                                        <input
                                            type='text'
                                            placeholder='Name'
                                            required
                                            name='name'
                                            value={name}
                                            onChange={registerDataChange}
                                        />
                                    </div>

                                    <div className="signUpEmail">
                                        <MailOutlineIcon />
                                        <input
                                            type='email'
                                            placeholder='Email'
                                            required
                                            name='email'
                                            value={email}
                                            onChange={registerDataChange}
                                        />
                                    </div>

                                    <div className="signUpPassword">
                                        <LockOpenIcon />
                                        <input
                                            type='password'
                                            placeholder='Password'
                                            required
                                            name='password'
                                            value={password}
                                            onChange={registerDataChange}
                                        />
                                    </div>

                                    <div id="registerImage">
                                        <img src={avatarPreview} alt='Avatar Preview' />
                                        <input
                                            type='file'
                                            name='avatar'
                                            accept='image/*'
                                            onChange={registerDataChange}
                                        />
                                    </div>

                                    <input
                                        type='submit'
                                        value="Register"
                                        className='signUpBtn'
                                    />
                                </form>
                            </div>
                        </div>
                    </>
                ) }
        </>
    );
}

export default LoginSignUp;
