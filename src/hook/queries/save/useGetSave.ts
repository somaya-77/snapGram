import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DOMAIN } from "@/lib/constants";
import { Save } from "@/types";

const fetchPostSaves = async (postId: number, userId: number) => {
    if (!postId || !userId) throw new Error("postId and userId are required");
    
    const response = await axios.get<Save>(`${DOMAIN}/api/posts/save`, {
        params: { postId, userId },
    });

    return response.data;
};

const useGetSaves = (postId: number, userId: number) => {
    return useQuery({
        queryKey: ["postSaves", postId, userId],
        queryFn: () => fetchPostSaves(postId, userId),
        enabled: !!postId && !!userId, 
    });
};

export default useGetSaves;

