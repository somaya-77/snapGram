import { DOMAIN } from "@/lib/constants";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";
import { IPost, Like } from "@/types";
export const fetchLikedPosts = async (userId: string): Promise<IPost[]> => {
    const response = await axios.get<IPost[]>(`${DOMAIN}/api/posts/like/${userId}`);
    return response.data;
};


const useGetLikesUser = (userId: string): UseQueryResult<IPost[]> => {

    const query = useQuery({
        queryKey: ["postLikes", userId],
        queryFn: () => fetchLikedPosts(userId),
        // staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
    return query;
}

export default useGetLikesUser
