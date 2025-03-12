import axios from "axios";
import { DOMAIN } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const deleteComment = async (id: number) => {
    const response = await axios.delete(`${DOMAIN}/api/comments/${id}`);
    return response.data;
};

const useDeleteComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteComment,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["comments"] }); 
        },
    });
};

export default useDeleteComment;
