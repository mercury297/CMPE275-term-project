import React, {useState} from "react";
import {DatePicker, Form, Input, message, Select} from "antd";
import "../../assets/scss/signup.scss";
import {toast} from "react-toastify";
import AuthService from "../../services/auth-service";
import {Link, useHistory} from "react-router-dom";
import { useGoogleLogin } from "react-google-login";

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const SignupPage = () => {
    const history = useHistory();
    const [state, setState] = useState({
        email: '',
        firstName: '',
        middleName: '',
        lastName: '',
        password: '',
        address: '',
        gender: '',
    });

    const changeHandler = e => {
        setState(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    const changeDOB = (value) => {
        setState(prevState => ({
            ...prevState,
            dateOfBirth: value,
        }));
    }

    const handleGenderChange = (value) => {
        setState(prevState => ({
            ...prevState,
            gender: value,
        }));
    }

    const handleSubmit = async () => {
        if (state.email && state.password) {
            const res = await AuthService.signup(state);
            if (res.success) {
                // Navigate to the schedule screen
                // if (res.user.role === 'admin') {
                //     history.replace("/admin-dashboard");
                // } else {
                //     history.replace("/patient/appointments");
                // }
                // Check if we have any
                message.success('Please verify your email, to start using the VMS!')
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
        <div className="signup">
            <div className='signup-main-container'>
                <div className='signup-content-container'>
                    <div className='signup-header'>
                        <div className='logo-cont'><span>VMS - Register</span></div>
                    </div>
                    <Form>
                        <div className='signup-email-container input-container'>
                            <div className='signup-email-header'><span>Email-ID</span></div>
                            <Input onChange={changeHandler}
                                   type='email'
                                   name='email'
                                   placeholder='johndoe@gmail.com'
                                   style={{width: "100%"}}/>
                        </div>
                        <div className='signup-email-container input-container'>
                            <div className='signup-email-header'><span>First Name</span></div>
                            <Input onChange={changeHandler}
                                   type='text'
                                   name='firstName'
                                   placeholder='First Name'
                                   style={{width: "100%"}}/>
                        </div>
                        <div className='signup-email-container input-container'>
                            <div className='signup-email-header'><span>Middle Name</span></div>
                            <Input onChange={changeHandler}
                                   type='text'
                                   name='MiddleName'
                                   placeholder='Middle Name'
                                   style={{width: "100%"}}/>
                        </div>
                        <div className='signup-email-container input-container'>
                            <div className='signup-email-header'><span>Last Name</span></div>
                            <Input onChange={changeHandler}
                                   type='text'
                                   name='lastName'
                                   placeholder='Last Name'
                                   style={{width: "100%"}}/>
                        </div>
                        <div className='signup-email-container input-container'>
                            <div className='signup-email-header'><span>Date of Birth</span></div>
                            <DatePicker
                                name='dateOfBirth'
                                onChange={changeDOB}
                                showToday={false}
                                suffixIcon={null}
                            />
                        </div>
                        <div className='signup-email-container input-container'>
                            <div className='signup-email-header'><span>Address</span></div>
                            <Input onChange={changeHandler}
                                   type='text'
                                   name='address'
                                   placeholder='Address'
                                   style={{width: "100%"}}/>
                        </div>
                        <div className='signup-email-container input-container'>
                            <div className='signup-email-header' style={{paddingRight: 0}}><span>Gender</span></div>
                            <div className='option-cont'>
                                <Select onChange={handleGenderChange} placeholder={'Gender'} suffixIcon={null}>
                                    <Select.Option value="male">Male</Select.Option>
                                    <Select.Option value="female">Female</Select.Option>
                                    <Select.Option value="others">Others</Select.Option>
                                </Select>
                            </div>
                        </div>
                        <div className='signup-password-container input-container'>
                            <div className='signup-password-header'>
                                <span className='signup-password-header-primary'>Password</span>
                            </div>
                            <Input onChange={changeHandler}
                                   name='password'
                                   type='password'
                                   placeholder='**********'
                                   style={{width: "100%"}}/>
                        </div>
                    </Form>
                    <button onClick={handleSubmit} className='signup-button'
                            disabled={!(state.email && state.password)}>
                        <span>Sign Up</span>
                    </button>
                    <div className='or'>OR</div>
                    <button type="button" className="login-with-google-btn" onClick={signIn}>
                        Sign in with Google
                    </button>
                    <div className='switch-cont'>
                        <span>Already have an account?</span> <Link className='link' to={'/auth/login'}> Login </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}


export default SignupPage;
