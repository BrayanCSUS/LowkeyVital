'use client';

import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";

const SignOutButton: React.FC = () => {
    const { user, logout } = useAuth(); // Get user and logout function from context

    const handleClick = () => {
        // Check if the current path is '/reservations'
        if (window.location.pathname === '/reservations')
            window.location.href = '/'; // Redirect to the root of the home page
        
        toast({ title: "Log Out Successful",
                description: "You are now logged out.",
                duration: 10000,
        });
        logout();
    };

    // Render the button only if the user is logged in
    if (!user) {
        return null;
    }

    return (
        <Button onClick={handleClick} variant="outline" className="text-[#00563F] hover:bg-white hover:text-[#00563F]">
            Sign Out
        </Button>
    );
};

export default SignOutButton;
