import React, {useEffect, useState} from 'react';
import {Button, message} from 'antd';
import '../../assets/scss/email.scss';
import AdminService from "../../services/admin.service";

const EmailVerificationComponent = () => {
    const [email, setEmail] = useState('mukul84jha@gmail.com');
    const [verificationCode, setVerificationCode] = useState('SF234FSF');

    useEffect(() => {
        const pathParams = window.location.pathname.split('/');
        setEmail(pathParams[2]);
        setVerificationCode(pathParams[3]);
    }, []);

    const handleClick = () => {
        AdminService.verifyEmail({email, verificationCode}).then(res => {
            if (res.success) {
                localStorage.setItem('user', JSON.stringify(res.data));
                if (res.user.role === 'admin') {
                    window.location = process.env.REACT_APP_ENDPOINT;
                } else {
                    window.location = process.env.REACT_APP_ENDPOINT;
                }
            } else {
                message.error(res.message);
            }
        })
    }

    return (
        <div className='email-v-container'>
            <div className='email-v-content-cont'>
                <div className='email-detail'>
                    <h1>VMS - Email Verification</h1>
                    <h2><span>Email:</span> {email}</h2>
                    <h2 className='last'><span>Verification Code:</span> {verificationCode}</h2>
                    <Button type='primary' size='large' onClick={handleClick}>Proceed to Verify</Button>
                </div>
            </div>
        </div>
    )
}

export default EmailVerificationComponent;