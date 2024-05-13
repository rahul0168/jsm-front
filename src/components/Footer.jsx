import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        
        <footer className=" bottom-0 left-0 right-0 px-4 md:px-10 py-4 bg-white">
        <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
             
                <p className="text-sm text-gray-600">&copy; demoJob.com | All rights reserved</p>
            </div>
            <div className="hidden md:block">
                <p className="text-sm text-gray-600">Follow us</p>
                <div className="flex space-x-3 mt-1">
                    <Link to="#" className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                        <img src="https://placehold.co/20x20" alt="X" />
                    </Link>
                    <Link to="#" className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                        <img src="https://placehold.co/20x20" alt="T" />
                    </Link>
                    <Link to="#" className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                        <img src="https://placehold.co/20x20" alt="F" />
                    </Link>
                </div>
            </div>
        
        </div>
    </footer>
    
    );
};

export default Footer;
