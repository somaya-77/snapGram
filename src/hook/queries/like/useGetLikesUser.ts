import { useQuery } from "@tanstack/react-query";

export const fetchLikedPosts = async (userId: string) => {
    const response = await fetch(`/api/posts/like/${userId}`);

    if (!response.ok) {
        throw new Error("Failed to fetch liked posts");
    }

    return response.json();
};


const useGetLikesUser = (userId: string) => {

    const query = useQuery({
        queryKey: ["postLikes", userId],
        queryFn: () => fetchLikedPosts(userId),
        // staleTime: 1000 * 60 * 5, // Cache data for 5 minutes
    });
    return query;
}

export default useGetLikesUser
