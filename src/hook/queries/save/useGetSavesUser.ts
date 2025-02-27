import { useQuery } from "@tanstack/react-query";

export const fetchSavedPosts = async (userId: string) => {
    const response = await fetch(`/api/posts/save/${userId}`);

    if (!response.ok) {
        throw new Error("Failed to fetch saved posts");
    }

    return response.json();
};


const useGetSavesUser = (userId: string) => {

    const query = useQuery({
        queryKey: ["savedPosts", userId],
        queryFn: () => fetchSavedPosts(userId),
        staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
    return query;
}

export default useGetSavesUser;
