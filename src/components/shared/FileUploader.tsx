
'use client'
import { Button } from "../ui";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { FileWithPath, useDropzone } from "react-dropzone";
import { DOMAIN } from "@/src/lib/constants";


const FileUploader = ({ field }) => {
  const [preview, setPreview] = useState<string | null>(null);

  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("pathName", "my-uploads");


    try {
      const response = await fetch(`${DOMAIN}/api/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "حدث خطأ أثناء رفع الصورة");
      }

      console.log("✅ رابط الصورة المرفوعة:", data.url);
      return data.url;
    } catch (error) {
      console.error("❌ خطأ في رفع الصورة:", error.message);
      return null;
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
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer">
      <input {...getInputProps()}  onChange={handleFileChange} />

      {preview ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <Image width={1000} height={1000} src={preview || ""} alt="image" className="file_uploader-img" />
          </div>
          <p className="file_uploader-label">Click or drag photo to replace</p>
        </>
      ) : (
        <div className="file_uploader-box">
          <Image
            src="/assets/icons/file-upload.svg"
            width={96}
            height={77}
            alt="file-upload"
          />
          <h3 className="base-medium text-light-2 mb-2 mt-6">Drag photo here</h3>
          <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>
          <Button className="shad_button_dark_4">Select your photo</Button>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
