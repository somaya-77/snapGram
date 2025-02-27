import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { DOMAIN } from "@/src/lib/constants";

const fetchData = async ({ caption, location, imageUrl, tags }: { caption: string; location: string; imageUrl: string; tags: string[] }) => {
    const formData = new FormData();
    formData.append("caption", caption);
    formData.append("location", location);
    formData.append("tags", tags.join(','));  
 
    // imageUrl.forEach(file => {
        formData.append("imageUrl", imageUrl);
    // });

    const response = await axios.post(`${DOMAIN}/api/posts`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};


const useCreatePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: fetchData,
        onSuccess: (_, { caption, location, imageUrl, tags }) => {
            queryClient.invalidateQueries({ queryKey: ["createPost", caption, location, imageUrl, tags] });
        },
    });
};

export default useCreatePost;
