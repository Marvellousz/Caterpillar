import React from 'react';
import Image from 'next/image';
import logo from '@/public/caterpillar.svg'; // Adjust the path to your logo

const Header: React.FC = () => {
    return (
        <header className="flex justify-between items-center p-4 bg-yellow-500">
            <h1 className="text-2xl font-bold">Caterpillar</h1>
            <Image src={logo} alt="Logo" width={50} height={50} />
        </header>
    );
};

export default Header;
