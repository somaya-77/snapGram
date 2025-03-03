import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { DOMAIN } from "@/src/lib/constants";

const fetchData = async (imageFile: File) => {

    const formData = new FormData();
    formData.append("imageUrl", imageFile);
    formData.append("pathname", "profile_images");
    console.log("🔍 Data sent to API:", formData.get("imageUrl"), formData.get("pathname"));
    const response = await axios.post(`${DOMAIN}/api/upload`,
        formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });
   const image = (await response.data) as {url: string}
    return image.url;
};
console.log("object", fetchData)
const useUploadImage = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: fetchData,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["uploadImage"] });
        },
    });
};

export default useUploadImage;
