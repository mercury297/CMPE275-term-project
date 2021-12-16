import React, {useState} from "react";
import {Form, Input} from "antd";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import "../../assets/scss/login.scss";
import {toast} from "react-toastify";
import AuthService from "../../services/auth-service";
import {Link, useHistory} from "react-router-dom";
import {useGoogleLogin} from "react-google-login";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const LoginComponent = () => {
    const history = useHistory();
    const [state, setState] = useState({
        email: '',
        password: '',
    });

    const changeHandler = e => {
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const handleSubmit = async () => {
        if (state.email && state.password) {
            const res = await AuthService.login({
                email: state.email,
                password: state.password,
            });
            if (res.success) {
                // Navigate to the schedule screen
                localStorage.setItem('user', JSON.stringify(res));
                if (res.admin) {
                    history.replace("/admin/dashboard");
                } else {
                    history.replace("/patient/appointments");
                }
                // Check if we have any
            } else {
                toast.error('Something went wrong');
            }
        } else {
            toast.error('Please enter both email and password to login!');
        }
    }

    const onSuccess = () => {

    }

    const onFailure = () => {

    }
    const { signIn } = useGoogleLogin({
        onSuccess,
        onFailure,
        clientId: CLIENT_ID,
        isSignedIn: true,
        accessType: 'offline'
    });

    return (
        <div className="signin">
            <div className='signin-main-container'>
                <div className='signin-content-container'>
                    <div className='signin-header'>
                        <div className='logo-cont'><span>VMS - Login</span></div>
                    </div>
                    <Form>
                        <div className='signin-email-container input-container'>
                            <div className='signin-email-header'><span>Email-ID</span></div>
                            <Input onChange={changeHandler}
                                   type='email'
                                   name='email'
                                   placeholder='johndoe@gmail.com'
                                   prefix={<UserOutlined/>}
                                   style={{width: "100%"}}/>
                        </div>
                        <div className='signin-password-container input-container'>
                            <div className='signin-password-header'>
                                <span className='signin-password-header-primary'>Password</span>
                            </div>
                            <Input onChange={changeHandler}
                                   prefix={<LockOutlined/>}
                                   name='password'
                                   type='password'
                                   placeholder='**********'
                                   style={{width: "100%"}}/>
                        </div>
                    </Form>
                    <button onClick={handleSubmit} className='signin-button'
                            disabled={!(state.email && state.password)}>
                        <span>Log in</span>
                    </button>
                    <div className='or'>OR</div>
                    <button type="button" className="login-with-google-btn" onClick={signIn}>
                        Log in with Google
                    </button>
                    <div className='switch-cont'>
                        <span>Don't have an account?</span> <Link className='link' to={'/auth/signup'}> Sign up </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default LoginComponent;
