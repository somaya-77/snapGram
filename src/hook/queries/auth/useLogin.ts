'use client'
import { DOMAIN } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const login = async ({ email, password }: { email: string; password: string }) => {
   
        const response = await axios.post(`${DOMAIN}/api/users/login`, { email, password });
        return response.data;
    
};


const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: login,
        onSuccess: (_, { email, password  }) => {
            queryClient.invalidateQueries({ queryKey: ["login", email, password ] });
        },
        onError: (error) => {
            console.error("Error login:", error);
        },
    });
};

export default useLogin;






