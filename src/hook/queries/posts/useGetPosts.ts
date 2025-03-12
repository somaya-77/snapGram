"use client";
import { DOMAIN } from "@/lib/constants";
import { IPost } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";


const fetchPosts = async (): Promise<IPost[]> => {
    const response = await axios.get<IPost[]>(`${DOMAIN}/api/posts`);
    return response.data;
}
const useGetPosts = (): UseQueryResult<IPost[]> => {
    const query = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
        staleTime: 0,
        gcTime: 0,
        refetchInterval: 500,
    })
    return query;
}

export default useGetPosts;
