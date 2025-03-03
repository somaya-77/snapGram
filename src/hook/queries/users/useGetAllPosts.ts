"use client";
import { DOMAIN } from "@/src/lib/constants";
import { IPost } from "@/src/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";


const fetchAllPosts = async (id: string): Promise<IPost[]> => {
    const response = await axios.get<IPost[]>(`${DOMAIN}/api/posts/user/${id}`);
    return response.data;
}
const useGetAllPosts = (id: string): UseQueryResult<IPost[]> => {
    const query = useQuery({
        queryKey: ["allUsers"],
        queryFn: () => fetchAllPosts(id)
    })
    return query;
}

export default useGetAllPosts;