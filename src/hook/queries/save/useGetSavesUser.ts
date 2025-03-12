import { DOMAIN } from "@/lib/constants";
import { IPost, Save } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";

export const fetchSavedPosts = async (userId: string): Promise<IPost[]> => {
    const response = await axios.get<IPost[]>(`${DOMAIN}/api/posts/save/${userId}`);

    return response.data;
};


const useGetSavesUser = (userId: string): UseQueryResult<IPost[]> => {

    const query = useQuery({
        queryKey: ["postSaves", userId],
        queryFn: () => fetchSavedPosts(userId),
        // staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
    return query;
}

export default useGetSavesUser;
