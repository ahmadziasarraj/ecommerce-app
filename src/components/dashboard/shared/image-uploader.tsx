"use client";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { CldUploadWidget } from 'next-cloudinary';
import { Button } from "@/components/ui/button";
import { CloudUpload } from "lucide-react";
interface ImageUploaderProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
    type: 'standard' | 'profile' | 'cover';
    dontShowPreview?: boolean
    btnText?: string
}

const ImageUploader: FC<ImageUploaderProps> = ({
    disabled, onChange, onRemove, value, type, dontShowPreview, btnText
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    const onUpload = (result: any) => {
        onChange(result.info.secure_url);
    }

    if (type === "profile") {
        return (
            <div className="relative rounded-full w-44 h-44 bg-gray-200 border-2 border-white shadow-md">
                {value.length > 0 && <Image src={value[0]} width={176} height={176} alt="Profile" className="absolute top-0 left-0 bottom-0 right-0 w-44 h-44 rounded-full object-cover " />}
                <CldUploadWidget onSuccess={onUpload} uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET_NAME}>
                    {({ open }) => {
                        return (
                            <Button
                                size="icon"
                                className="size-9 absolute bottom-2 right-2 z-10 bg-cyan-800 p-2 rounded-full "
                                variant={"ghost"}
                                onClick={() => open()}
                                disabled={disabled}
                                type="button"
                            >
                                <CloudUpload />
                            </Button>
                        );
                    }}
                </CldUploadWidget>
            </div>
        );
    } else if (type === 'cover') {
        return (
            <div className="relative rounded w-full h-52 bg-gray-300 border border-white shadow-md overflow-hidden">
                {value.length > 0 && <Image src={value[0]} width={500} height={208} alt="Profile" className="absolute top-0 left-0 bottom-0 right-0 w-full h-52 object-cover " />}
                <CldUploadWidget onSuccess={onUpload} uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_PRESET_NAME}>
                    {({ open }) => {
                        return (
                            <Button
                                // size="icon"
                                className="shadow absolute bottom-2 capitalize right-2 z-10 bg-cyan-800 py-2 px-4 rounded "
                                variant={"ghost"}
                                onClick={() => open()}
                                disabled={disabled}
                                type="button"
                            >
                                {btnText}
                                <CloudUpload />
                            </Button>
                        );
                    }}
                </CldUploadWidget>
            </div>
        );
    }
    return (
        <div></div>
    );
};

export default ImageUploader;