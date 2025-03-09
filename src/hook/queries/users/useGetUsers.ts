"use client";
import { queryClient } from "@/components/AuthLayout";
import { DOMAIN } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const fetchUser = async () => {
    const response = await axios.get(`${DOMAIN}/api/users/register`);
    return response.data;
}
const useGetUser = () => {
    const query = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser,
        staleTime: Infinity,
        gcTime: 1000 * 60 * 60,
        refetchOnWindowFocus: false, 
        refetchOnReconnect: false, 
        refetchOnMount: false,
    })
    if (!query.data && query.isSuccess) {
        queryClient.setQueryData(["user"], query.data);
      }
    return query;
}

export default useGetUser;




// localStorage.setItem("user", JSON.stringify(response.data));