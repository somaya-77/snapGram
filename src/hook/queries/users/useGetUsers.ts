"use client";
import { DOMAIN } from "@/src/lib/constants";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const fetchUser = async () => {
    const response = await axios.get(`${DOMAIN}/api/users/register`);
    return response.data;
}
const useGetUser = () => {
    const query = useQuery({
        queryKey: ["user"],
        queryFn: fetchUser
    })
    return query;
}

export default useGetUser;