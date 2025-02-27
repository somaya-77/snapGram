import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { DOMAIN } from "@/src/lib/constants";

const likePost = async ({ postId, userId }: { postId: string; userId: string }) => {
    const response = await axios.post(`${DOMAIN}/api/posts/like`, { postId, userId });
    return response.data;
};

const usePostLike = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: likePost,
        onSuccess: (_, { postId, userId }) => {
            queryClient.invalidateQueries({ queryKey: ["postLikes", postId, userId] });
        },
    });
};

export default usePostLike;
