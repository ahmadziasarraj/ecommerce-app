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
}

const ImageUploader: FC<ImageUploaderProps> = ({
    disabled, onChange, onRemove, value, type, dontShowPreview
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
            <div className="relative rounded-full w-44 h-44 bg-gray-200 border-2 border-white shadow-md inset-x-96 ">
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
    }
    return (
        <div></div>
    );
};

export default ImageUploader;