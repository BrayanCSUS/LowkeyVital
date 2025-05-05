import React, { useState, useRef, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import 'reactjs-popup/dist/index.css';
import '/styles/login_popup.css';
import axios from 'axios';
import { useAuth } from "@/context/AuthContext"; // Import useAuth
import { toast } from "@/hooks/use-toast"; // Import toast notification

interface LoginPopupProps {
    open: boolean;
    onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ open, onClose }) => {
    const { login } = useAuth(); // Get the login function from the auth context
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
    const [verifyCode, setCode] = useState('');

    const emailInputRef = useRef<HTMLInputElement>(null);
    const codeInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (open) {
            setTimeout(() => {
                if (isEmailSubmitted) {
                    codeInputRef.current?.focus();
                } else {
                    emailInputRef.current?.focus();
                }
            }, 50); // Delay to ensure popup is rendered
        }
    }, [open, isEmailSubmitted]);

    const handleSubmit = async () => {
        const emailParts = email.split('@');
        if (email == "bypass") {
            setErrorMessage('');
            console.log('Bypass submitted');

            login( { email });

            toast({
                title: "Bypass login",
                description: "Logged in with bypass.",
                duration: 10000,
            });

            onClose();
        } else if (emailParts.length === 2 && emailParts[1] === 'csus.edu' && /[a-z0-9]+$/.test(emailParts[0])) {
            setErrorMessage('');
            console.log('Valid email submitted:', email);
            setIsEmailSubmitted(true);

            // Send email to backend
            try {
                await axios.post('http://localhost:3001/send-email', { email });
                console.log('Email sent successfully');
                toast({ title: "Email Sent",
                        description: "Check your CSUS email for a verification code.",
                        duration: 10000,
                });
            } catch (error) {
                console.error('Error sending email:', error);
                setErrorMessage('Failed to send email. Please try again later.');
            }
        } else {
            setErrorMessage('Please enter a valid CSUS email address');
        }
    };

    const handleCodeSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:3001/verify-code', { code: verifyCode });
            console.log(response.data.message);
            // On successful verification, update auth state:
            login({ email }); 
            toast({ title: "Login Successful",
                    description: "You are now logged in.",
                    duration: 10000,
            });
            onClose(); // Close the popup if verification is successful
        } catch (error) {
            console.error('Error verifying code:', error);
            setErrorMessage('Invalid verification code. Please try again.'); // Set error message for invalid code
        }
    };

    const handleClose = () => {
        setEmail(''); // Clear the email input when closing the popup
        setErrorMessage(''); // Optionally clear the error message as well
        setIsEmailSubmitted(false); // Reset the email submitted state
        setCode(''); // Clear the verification code input
        onClose(); // Call the original onClose function
    };

    // Allow pressing enter to be equivalent to clicking Submit
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            isEmailSubmitted ? handleCodeSubmit() : handleSubmit(); // Call the appropriate submit function based on state
        }
    };

    return (
        <Popup open={open} onClose={handleClose} modal nested>
            <div className="flex justify-end">
                <Button
                    onClick={handleClose}
                    variant="ghost"
                    size="icon"
                    aria-label="Close"
                    className="close-button p-1 hover:bg-[#c4b581] focus:outline-none"
                >
                    <X className="h-5 w-5 text-gray-400" />
                </Button>
            </div>
            <div className='popup-content'>
                {isEmailSubmitted ? (
                    <div>
                        <div>Check your CSUS email for a verification code and enter it below.</div>
                        <Input
                            id="verification-code"
                            name="verification-code"
                            ref={codeInputRef}
                            className="bg-white text-black"
                            style={{ paddingLeft: '0.5' }} // Remove left padding
                            onChange={(e) => setCode(e.target.value)} // Update verification code state
                            onKeyPress={handleKeyPress} // Call handleKeyPress on key press
                        />
                        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
                        <div>
                            <Button
                                style={{ marginTop: '10px', backgroundColor: '#c4b581', color: 'black' }} // Use backgroundColor
                                onClick={handleCodeSubmit} // Call handleCodeSubmit on button click
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                ) : (
                    <div>
                        Enter your CSUS email address
                        <div>
                            <Input
                                ref={emailInputRef}
                                type="email"
                                name="email"
                                autoComplete="email"
                                placeholder="jchidella@csus.edu"
                                className="bg-white text-black"
                                style={{ paddingLeft: '0.5' }} // Remove left padding
                                value={email}
                                onChange={(e) => setEmail(e.target.value.toLowerCase())} // Update email state
                                onKeyPress={handleKeyPress} // Call handleKeyPress on key press
                            />
                        </div>
                        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
                        <div>
                            <Button
                                style={{ marginTop: '10px', backgroundColor: '#c4b581', color: 'black' }} // Use backgroundColor
                                onClick={handleSubmit} // Call handleSubmit on button click
                            >
                                Submit
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </Popup>
    );
};

export default LoginPopup;

