"use client";
import { DOMAIN } from "@/lib/constants";
import { IUpdatePost } from "@/types";
import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import axios from "axios";

const updatePost = async ({ id, caption, location, imageUrl, tags }: { id: string; caption: string; location: string; imageUrl: string; tags: string[]}) => {
    const response = await axios.put<IUpdatePost>(`${DOMAIN}/api/posts/${id}`, { caption, location, imageUrl, tags });
    return response.data;
};

const usePutPost = (): UseMutationResult<
IUpdatePost,
    Error,
    { id: string; caption: string; location: string; imageUrl: string; tags: string[] }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updatePost,
        onSuccess: (_, { id, caption, location, imageUrl, tags }) => {
            queryClient.invalidateQueries({ queryKey: ["postUpdate", id, caption, location, imageUrl, tags] });
        },
        onError: (error) => {
            console.error("Update failed:", error);
        },
    });
};

export default usePutPost;
