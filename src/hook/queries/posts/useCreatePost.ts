import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { DOMAIN } from "@/src/lib/constants";

const fetchData = async ({ caption, location, imageUrl, tags }: { caption: string; location: string; imageUrl: string; tags: string[] }) => {

    const response = await axios.post(`${DOMAIN}/api/posts`,  {
        caption, location, imageUrl, tags
    });
    return response.data;
};

console.log("fetchData",fetchData)
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
