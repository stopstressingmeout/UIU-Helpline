import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-primary text-white p-4 text-center">
            <p>© {new Date().getFullYear()} UIU Helpline. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
