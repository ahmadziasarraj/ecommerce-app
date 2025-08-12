import Image from "next/image";
import { FC } from "react"
import LogoImg from '../../../public/logo.jpg';

interface LogoProps {
    width: string,
    height: string
}

const Logo: FC<LogoProps> = async ({width, height}) => {
    return (
        <div style={{width, height}}>
            <Image 
                alt="Logo"
                src={LogoImg}
                className="w-full h-full object-cover overflow-visible"
            />
        </div>
    );
}

export default Logo;