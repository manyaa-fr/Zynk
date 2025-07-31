import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import OtpInput from './OtpInput';
import '../styles/OTPVerification.css';
import apiClient from '../config/axios';

const OTPVerification = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = location.state?.email || '';

    const onOtpSubmit = async (enteredOtp) => {
        try {
            const res = await apiClient.post('/auth/verify-otp', { 
                email, 
                otp: enteredOtp 
            });
            if (res.status === 200) {
              alert("OTP Verified Successfully!");
              navigate('/login');
            } else {
              alert(res.data.error || "Invalid OTP");
            }
        } catch (err) {
            console.error(err);
            alert(err.response?.data?.error || "Error verifying OTP");
        }
    };

    return (
        <div className="otp-verification-container">
            <div className="otp-verification-title">Verify Your Email</div>
            <div className="otp-verification-desc">
                OTP is sent to <span className="otp-email-highlight">{email}</span>
            </div>
            <div className="otp-input-row">
                <OtpInput length={4} onOtpSubmit={onOtpSubmit} inputClassName="otp-input" />
            </div>
            <div style={{ marginTop: 24, color: 'rgb(86, 58, 13)', fontSize: '1rem' }}>
                Enter the 4-digit code to complete your registration.
            </div>
        </div>
    );
};

export default OTPVerification;