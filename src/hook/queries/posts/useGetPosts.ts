"use client";
import { DOMAIN } from "@/src/lib/constants";
import { IPost } from "@/src/types";
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
        staleTime: 1000 * 60 * 1,
        refetchInterval: 1000 * 60 * 2,
    })
    return query;
}

export default useGetPosts;
