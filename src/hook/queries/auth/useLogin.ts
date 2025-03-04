'use client'
import { DOMAIN } from "@/src/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const login = async ({ email, password }: { email: string; password: string }) => {
    try {
        const response = await axios.post(`${DOMAIN}/api/users/login`, { email, password });
        return response.data;
    } catch (error: any) {
        console.error("Login API Error:", error.response?.data || error.message);
        throw new Error(error.response?.data?.message || "Login failed");
    }
};


// const useLogin = () => {
//     const queryClient = useQueryClient();

//     return useMutation({
//         mutationFn: login,
//         onSuccess: (_, { email, password  }) => {
//             queryClient.invalidateQueries({ queryKey: ["login", email, password ] });
//         },
//         onError: (error) => {
//             console.error("Error login:", error);
//         },
//     });
// };

// export default useLogin;


const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: login,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["login"] });
        },
        onError: (error) => {
            console.error("Error login:", error);
        },
    });
};

export default useLogin;



