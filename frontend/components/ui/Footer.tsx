import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="p-4 bg-black text-yellow-500 text-center">
            <p>&copy; {new Date().getFullYear()} Caterpillar. All rights reserved.</p>
        </footer>
    );
};

export default Footer;
