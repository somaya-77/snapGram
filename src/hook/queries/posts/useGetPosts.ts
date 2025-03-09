"use client";
import { DOMAIN } from "@/lib/constants";
import { IPost } from "@/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";


const fetchPosts = async (): Promise<IPost[]> => {
    console.log("Fetching posts...");
    const response = await axios.get<IPost[]>(`${DOMAIN}/api/posts`);
    console.log("Data received:", response.data);
    console.log("API URL:", `${DOMAIN}/api/posts`);

    return response.data;
}
const useGetPosts = (): UseQueryResult<IPost[]> => {
    const query = useQuery({
        queryKey: ["posts"],
        queryFn: fetchPosts,
    })
    return query;
}

export default useGetPosts;
