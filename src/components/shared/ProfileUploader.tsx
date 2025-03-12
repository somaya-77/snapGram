'use client'
import { useState, useCallback, useEffect } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import Image from "next/image";
import { DOMAIN } from "@/lib/constants";
import Loader from "./Loader";

const ProfileUploader = ({ field }) => {
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    async function uploadImage(file: File) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("pathName", "my-uploads");

        try {
            setIsUploading(true);
            const response = await fetch(`${DOMAIN}/api/upload`, {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.error || "wrong: Upload image");
            }

            return data.url;
        } catch (error) {
            return null;
        } finally {
            setIsUploading(false);
        }
    }

    const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];

        if (file) {
            const uploadedUrl = await uploadImage(file);
            if (uploadedUrl) {
                setPreview(uploadedUrl);
                field.onChange(uploadedUrl || "");

            }
        }
    };

    const onDrop = useCallback(async (acceptedFiles: FileWithPath[]) => {

        const file = acceptedFiles[0];
        if (file) {
            const uploadedUrl = await uploadImage(file);

            if (uploadedUrl) {
                setPreview(uploadedUrl);
                field.onChange(uploadedUrl || "");
            }
        }
    }, [field]);

    useEffect(() => {
        if (field.value) {
            setPreview(field.value);
        }
    }, [field.value]);


    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        accept: {
            "image/*": [".png", ".jpeg", ".jpg"],
        },
    });

    return (
        <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} onChange={handleFileChange} />

            {isUploading ? <Loader /> :
                <div className="cursor-pointer flex-center gap-4">
                    <Image
                        width={150}
                        height={150}
                        src={preview && preview.startsWith("http") ? preview : "/assets/icons/profile-placeholder.svg"}
                        alt="profile photo"
                        className="rounded-full object-cover object-top"
                    />
                    <p className="text-primary-500 small-regular md:base-semibold">
                        Change profile photo
                    </p>
                </div>}
        </div>
    );
};

export default ProfileUploader;













