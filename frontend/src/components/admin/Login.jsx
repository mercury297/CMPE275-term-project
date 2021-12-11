import React, {useState} from "react";
import {Form, Input} from "antd";
import {LockOutlined, UserOutlined} from '@ant-design/icons';
import "../../assets/scss/login.scss";
import {toast} from "react-toastify";
import AuthService from "../../services/auth-service";
import {useHistory} from "react-router-dom";

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
                if (res.user.role === 'admin') {
                    history.replace("/admin-dashboard");
                } else {
                    history.replace("/dashboard");
                }
                // Check if we have any
            } else {
                toast.error('Something went wrong');
            }
        } else {
            toast.error('Please enter both email and password to login!');
        }
    }

    return (
        <div className="signin">
            <div className='signin-main-container'>
                <div className="signin-pos-logo-container">
                    <img src='https://spa-durban.s3.us-east-2.amazonaws.com/spa-durban-logo.png' alt="logo"/>
                </div>
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
                        <span>Sign In</span>
                    </button>
                </div>
            </div>
        </div>
    );
}


export default LoginComponent;
