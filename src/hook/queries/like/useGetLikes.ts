import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DOMAIN } from "@/lib/constants";
import { Like } from "@/types";

export const fetchPostLikes = async (postId: number, userId: number) => {
    if (!postId || !userId) throw new Error("postId and userId are required");
    
    const response = await axios.get(`${DOMAIN}/api/posts/like`, {
        params: { postId, userId },
        // withCredentials: true,
    });

    return response.data;
};

const useGetLikes = (postId: number, userId: number) => {
    return useQuery({
        queryKey: ["postLikes", postId, userId],
        queryFn: () => fetchPostLikes(postId, userId),
        enabled: !!postId && !!userId, 
    });
};

export default useGetLikes;

