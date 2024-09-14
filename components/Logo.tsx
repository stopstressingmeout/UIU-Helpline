import React from 'react';
import Image from 'next/image';
import logo from '../public/logo.png';

interface LogoProps {
    className?: string;
}

const Logo: React.FC<LogoProps> = ({ className }) => {
    return (
        <div className={`overflow-hidden aspect-square rounded-full h-12 w-12 flex justify-center items-center outline-2 ${className}`}>
            <Image src={logo} className="rounded-full scale-[1.6]" alt={"logo"} width={1000} height={1000} />
        </div>
    );
};

export default Logo;