import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import 'reactjs-popup/dist/index.css';
import '/styles/login_popup.css';

interface LoginPopupProps {
    open: boolean;
    onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ open, onClose }) => {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isEmailSubmitted, setIsEmailSubmitted] = useState(false);
    const [verifyCode, setCode] = useState('');

    const handleSubmit = () => {
        // Check if the email ends with @csus.edu
        const emailParts = email.split('@');
        if (email === "bypass") {
            // Allow enter website without verify if enter bypass
            setErrorMessage('');
            console.log('Bypass submitted');
            // Add login bypass here
            onClose();
        } else if (emailParts.length === 2 && emailParts[1] === 'csus.edu' && /^[a-zA-Z0-9]+$/.test(emailParts[0])) {
            // Check if the part before @ is alphanumeric
            setErrorMessage('');
            console.log('Valid email submitted:', email);
            setIsEmailSubmitted(true); // Set the state to indicate email has been submitted
        } else {
            setErrorMessage('Please enter a valid CSUS email address');
        }
    };

    const handleCodeSubmit = () => {
        if (verifyCode == "bypass") {
            onClose();
        }
        else if (verifyCode == "00000") {
            onClose();
        }
        else {
           setErrorMessage('Invalid verification code. Please try again.'); // Set error message for invalid code
        }
    }

    const handleClose = () => {
        setEmail(''); // Clear the email input when closing the popup
        setErrorMessage(''); // Optionally clear the error message as well
        setIsEmailSubmitted(false); // Reset the email submitted state
        onClose(); // Call the original onClose function
    };

    //Allow pressing enter to be equivilent to clicking Submit
    const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            isEmailSubmitted ? handleCodeSubmit() : handleSubmit(); // Call the appropriate submit function based on state
        }
    };

    return (
        <Popup open={open} onClose={handleClose} modal nested>
            <div>
                <Button onClick={handleClose} className='close-button'>
                    X
                </Button>
            </div>
            <div className='popup-content'>
                {isEmailSubmitted ? (
                    <div>
                        <div>Please check your inbox and enter the verification code</div>
                        {/* New input box after valid email submission */}
                        <Input
                            className="bg-white text-black"
                            style={{ paddingLeft: '0.5' }} // Remove left padding
                            onChange={(e) => setCode(e.target.value)} // Update email state
                            onKeyPress={handleKeyPress} // Call handleKeyPress on key press
                        />
                        <div>
                        </div>
                        {errorMessage && <div className="error-message">{errorMessage}</div>} {/* Display error message */}
                        <div>
                            <Button
                                style={{ marginTop: '10px', backgroundColor: '#c4b581', color: 'black' }} // Use backgroundColor
                                onClick={handleCodeSubmit} // Call handleSubmit on button click
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
                                placeholder="jchidella@csus.edu"
                                className="bg-white text-black"
                                style={{ paddingLeft: '0.5' }} // Remove left padding
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} // Update email state
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