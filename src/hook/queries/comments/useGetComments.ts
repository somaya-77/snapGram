import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DOMAIN } from "@/lib/constants";

const fetchPostLikes = async (postId: number, userId: number) => {
    if (!postId || !userId) throw new Error("postId and userId are required");
    
    const response = await axios.get(`${DOMAIN}/api/posts/like`, {
        params: { postId, userId },
    });

    return response.data;
};

const useGetComments = (postId: number, userId: number) => {
    return useQuery({
        queryKey: ["comments", postId, userId],
        queryFn: () => fetchPostLikes(postId, userId),
        enabled: !!postId && !!userId, 
        refetchInterval: 3000,
    });
};

export default useGetComments;

