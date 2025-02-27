"use client";
import { DOMAIN } from "@/src/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const deletePost = async (id: string) => {
    await axios.delete(`${DOMAIN}/api/posts/${id}`);
};

const useDeletePost = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deletePost,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["posts"] });
        },
        onError: (error) => {
            console.error("Error deleting post:", error);
        },
    });
};

export default useDeletePost;
