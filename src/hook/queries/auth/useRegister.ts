import { DOMAIN } from "@/src/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

const registerData = async ({ name, username, email, password  }: {  name:string; username:string; email: string; password: string; }) => {
    const response = await axios.post(`${DOMAIN}/api/users/register`, { name, username, email, password  });
    return response.data;
};

const useRegistration = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: registerData,
        onSuccess: (_, { name, username, email, password  }) => {
            queryClient.invalidateQueries({ queryKey: ["register", name, username, email, password ] });
        },
        onError: (error) => {
            console.error("Error registration:", error);
        },
    });
};

export default useRegistration;


