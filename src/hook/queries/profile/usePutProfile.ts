"use client";
import axios from "axios";
import { IUpdateUser } from "@/src/types";
import { DOMAIN } from "@/src/lib/constants";
import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";

const updateProfile = async ({ id, imageUrl, name, username, email, bio }: { id: string; imageUrl: string; name: string; username: string; email: string; bio: string }) => {
    const response = await axios.put<IUpdateUser>(`${DOMAIN}/api/users/profile/${id}`, { imageUrl, name, username, email, bio });
    return response.data;
};

const usePutProfile = (): UseMutationResult<
    IUpdateUser,
    Error,
    {  id: string; imageUrl: string; name: string; username: string; email: string; bio: string }
> => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfile,
        onSuccess: (_, { id, imageUrl, name, username, email, bio }) => {
            queryClient.invalidateQueries({ queryKey: ["putProfile", id, imageUrl, name, username, email, bio] });
        },
        onError: (error) => {
            console.error("Update failed:", error);
        },
    });
};

export default usePutProfile;
