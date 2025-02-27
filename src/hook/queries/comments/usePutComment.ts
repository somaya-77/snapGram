"use client";
import axios from "axios";
import { DOMAIN } from "@/src/lib/constants";
import { UpdateComments } from "@/src/types";
import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";

const updateComment = async ({ id, text }: { id: string; text: string; }) => {
    const response = await axios.put<UpdateComments>(`${DOMAIN}/api/comments/${id}`, { text });
    return response.data;
};

const usePutComment = (): UseMutationResult<
UpdateComments,
    Error,
    { id: string; text: string; }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateComment,
        onSuccess: (_, { id, text }) => {
            queryClient.invalidateQueries({ queryKey: ["commentUpdate", id, text] });
        },
        onError: (error) => {
            console.error("Update failed:", error);
        },
    });
};

export default usePutComment;
