import axios from 'axios';
import { DOMAIN } from "@/src/lib/constants";
import { useMutation, useQueryClient } from '@tanstack/react-query';

const deleteComment = async (id: number) => {
    const response = await axios.delete(`${DOMAIN}/api/comments/${id}`);
    return response.data;
};


const useDeleteComment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteComment,
        onSuccess: (id: number) => {
            queryClient.invalidateQueries({ queryKey: ['comments'], id });
        },
        onError: (error) => {
            console.error("Error deleting comment:", error);
        },
    });
};

export default useDeleteComment;
