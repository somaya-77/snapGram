// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { DOMAIN } from "@/lib/constants";

// const fetchLogout = async () => {
//     const response = await axios.get(`${DOMAIN}/api/users/logout`);
//     return response.data;
// };

// const useLogout = () => {
//     return useQuery({
//         queryKey: ["logout"],
//         queryFn: fetchLogout,
//         enabled: false,
//     });
// };

// export default useLogout;


"use client";
import { useMutation, useQueryClient  } from "@tanstack/react-query";
import axios from "axios";
import { DOMAIN } from "@/lib/constants";

const fetchLogoutUser = async () => {
    const response = await axios.post(`${DOMAIN}/api/users/logout`, {}, { withCredentials: true });
    return response.data;
};

const useLogout = () => {
    const queryClient = useQueryClient(); 

    return useMutation({
        mutationFn: fetchLogoutUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] }); 
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        },
    });
};

export default useLogout;

export const logoutUser = async () => {
    try {
        const response = await axios.post(`${DOMAIN}/api/users/logout`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error("Logout failed:", error);
        throw new Error("Logout failed");
    }
};