import React, { useEffect, useRef, useState } from 'react';
import '../App.css';

const OtpInput = ({ length = 4, onOtpSubmit = () => {}, inputClassName = '' }) => {
    const [Otp, setOtp] = useState(new Array(length).fill(""));
    const inputRefs = useRef([]);
    useEffect(() => {
        if(inputRefs.current[0]){
            inputRefs.current[0].focus();
        }
    }, [])

    const handleChange = (index, e) => {
        const value = e.target.value;
        if (isNaN(value)) return;
        const newOtp = [...Otp];
        newOtp[index] = value.substring(value.length-1);
        setOtp(newOtp);
        const combinedOtp = newOtp.join("");
        if(combinedOtp.length === length && !newOtp.includes("")) {
            onOtpSubmit(combinedOtp);
        }
        if(value && index<length-1 && inputRefs.current[index+1]){
            inputRefs.current[index+1].focus();
        }
    };
    const handleClick = (index) => {
        inputRefs.current[index].setSelectionRange(1, 1)
    };
    const handleKeyDown = (index, e) => {
        if (e.key==="backspace" && !Otp[index] && index>0 && inputRefs.current[index-1]){
            inputRefs.current[index-1].focus();
        }
    };
    return (
        <div className="otp-input-row">
            {Otp.map((value, index) => (
                <input
                    key={index}
                    type="text"
                    ref={input => (inputRefs.current[index] = input)}
                    value={value}
                    onChange={e => handleChange(index, e)}
                    onClick={() => handleClick(index)}
                    onKeyDown={e => handleKeyDown(index, e)}
                    className={inputClassName}
                    maxLength={1}
                    autoComplete="one-time-code"
                />
            ))}
        </div>
    );
}

export default OtpInput;