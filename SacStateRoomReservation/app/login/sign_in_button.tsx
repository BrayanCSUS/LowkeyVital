"use client";

import React, { useState } from 'react';
import LoginPopup from './login_popup';
import { Button } from "@/components/ui/button";

const SignInButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Open the popup
    const handleClick = () => {
        setIsOpen(true); 
    };

    // Close the popup
    const closePopup = () => {
        setIsOpen(false);
    };

    return (
        <div>
            <Button onClick={handleClick} variant="outline" className="text-[#00563F] hover:bg-white hover:text-[#00563F]">
                Sign In
            </Button>
            <LoginPopup open={isOpen} onClose={closePopup} /> {/* Show popup if open */}
        </div>
    );
};

export default SignInButton;
