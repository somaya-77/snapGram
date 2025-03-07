"use client";
import { DOMAIN } from "@/lib/constants";
import { IUser } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";


const fetchAllUsers = async (): Promise<IUser[]> => {
    const response = await axios.get<IUser[]>(`${DOMAIN}/api/users`);
    return response.data;
}
const useAllGetUsers = (): UseQueryResult<IUser[]> => {
    const query = useQuery({
        queryKey: ["allUsers"],
        queryFn: fetchAllUsers
    })
    return query;
}

export default useAllGetUsers;