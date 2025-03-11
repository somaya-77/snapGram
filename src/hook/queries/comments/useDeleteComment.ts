// import axios from 'axios';
// import { DOMAIN } from "@/lib/constants";
// import { useMutation, useQueryClient } from '@tanstack/react-query';

// const deleteComment = async (id: number) => {
//     const response = await axios.delete(`${DOMAIN}/api/comments/${id}`);
//     return response.data;
// };


// const useDeleteComment = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: deleteComment,
//         onSuccess: (id: number) => {
//             queryClient.invalidateQueries({ queryKey: ['comments'], id });
//         },
//         onError: (error) => {
//             console.error("Error deleting comment:", error);
//         },
//     });
// };

// export default useDeleteComment;

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
            console.log("Comment deleted successfully:", data);
        },
        onError: (error) => {
            console.error("Error deleting comment:", error);
        },
    });
};

export default useDeleteComment;
