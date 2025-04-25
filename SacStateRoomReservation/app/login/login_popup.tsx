import React from 'react';
import Popup from 'reactjs-popup';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import 'reactjs-popup/dist/index.css';
import '/styles/login_popup.css'; // Import your styles

interface LoginPopupProps {
    open: boolean;
    onClose: () => void;
}

const LoginPopup: React.FC<LoginPopupProps> = ({ open, onClose }) => {
    return (
        <Popup open={open} onClose={onClose} modal nested>
            <div>
                <Button onClick={onClose} className='close-button'>
                    X
                </Button>
            </div>
            <div className='popup-content'>
                Enter your CSUS email address
            </div>
            <div>
            <Input
                    placeholder="jchidella@csus.edu"
                    className="bg-white text-black"
                    style={{ paddingLeft: '0.5' }} // Remove left padding
            />
            </div>
            <div>
            <Button
                style={{ marginTop: '10px', backgroundColor: '#c4b581', color: 'black'}} // Use backgroundColor
            >
                Submit
            </Button>
            </div>
        </Popup>
    );
};

export default LoginPopup;
