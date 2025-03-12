import { DOMAIN } from "@/lib/constants";
import { Save } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const fetchSavedPosts = async (userId: string) => {
    const response = await axios.get(`${DOMAIN}/api/posts/save/${userId}`);

    return response.data;
};


const useGetSavesUser = (userId: string) => {

    const query = useQuery({
        queryKey: ["postSaves", userId],
        queryFn: () => fetchSavedPosts(userId),
        // staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
    return query;
}

export default useGetSavesUser;
