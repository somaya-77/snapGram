// 'use client'
// import { Button } from "../ui";
// import Image from "next/image";
// import { useCallback, useState } from "react";
// import { convertFileToUrl } from "@/src/lib/utils";
// import { FileWithPath, useDropzone } from "react-dropzone";

// type FileUploaderProps = {
//   fieldChange: (files: File[]) => void;
//   mediaUrl: string;
// };

// const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
//   const [file, setFile] = useState<File[]>([]);
//   const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

//   const onDrop = useCallback(
//     (acceptedFiles: FileWithPath[]) => {
//       setFile(acceptedFiles);
//       fieldChange(acceptedFiles);
//       setFileUrl(convertFileToUrl(acceptedFiles[0]));
//     },
//     [file]
//   );

//   const { getRootProps, getInputProps } = useDropzone({
//     onDrop,
//     accept: {
//       "image/*": [".png", ".jpeg", ".jpg"],
//     },
//   });

//   return (
//     <div
//       {...getRootProps()}
//       className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer">
//       <input {...getInputProps()} className="cursor-pointer" />

//       {file.length > 0 ? (
//         <>
//           <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
//             <img src={fileUrl} alt="image" className="file_uploader-img" />
//           </div>
//           <p className="file_uploader-label">Click or drag photo to replace</p>
//         </>
//       ) : (
//         <div className="file_uploader-box">

//           <Image
//             src="/assets/icons/file-upload.svg"
//             width={96}
//             height={77}
//             alt="file-upload"
//           />

//           <h3 className="base-medium text-light-2 mb-2 mt-6">Drag photo here</h3>

//           <p className="text-light-4 small-regular mb-6">SVG, PNG, JPG</p>

//           <Button className="shad_button_dark_4">
//             Select your photo
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUploader;
'use client'
import { Button } from "../ui";
import Image from "next/image";
import { useCallback, useState } from "react";
import { convertFileToUrl } from "@/src/lib/utils"; // Make sure this is correct
import { FileWithPath, useDropzone } from "react-dropzone";

type FileUploaderProps = {
  fieldChange: (files: File[]) => void;
  mediaUrl: string;
};

const FileUploader = ({ fieldChange, mediaUrl }: FileUploaderProps) => {
  const [file, setFile] = useState<File[]>([]);
  const [fileUrl, setFileUrl] = useState<string>(mediaUrl);

  const onDrop = useCallback(
    (acceptedFiles: FileWithPath[]) => {
      const files: File[] = acceptedFiles.map(file => file as File);
      setFile(files);
      fieldChange(files);  // Pass the files correctly
      const fileUrls = files.map(file => convertFileToUrl(file));  // تحويل كل ملف إلى URL
      setFileUrl(fileUrls[0]);  // إذا أردت تخزين URL أول صورة فقط
    },
    [fieldChange]
  );
  

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".png", ".jpeg", ".jpg"],  // Accept image files
    },
  });

  return (
    <div
      {...getRootProps()}
      className="flex flex-center flex-col bg-dark-3 rounded-xl cursor-pointer">
      <input {...getInputProps()} className="cursor-pointer" />

      {file.length > 0 ? (
        <>
          <div className="flex flex-1 justify-center w-full p-5 lg:p-10">
            <Image width={15} height={15} src={fileUrl} alt="image" className="file_uploader-img" />
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
