import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { DOMAIN } from "@/lib/constants";

const savePost = async ({ postId, userId }: { postId: string; userId: string }) => {
    const response = await axios.post(`${DOMAIN}/api/posts/save`, { postId, userId });
    return response.data;
};

const usePostSave = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: savePost,
        onSuccess: (_, { postId, userId }) => {
            queryClient.invalidateQueries({ queryKey: ["postSaves", postId, userId] });
        },
    });
};

export default usePostSave;
