"use client";
import { DOMAIN } from "@/src/lib/constants";
import { IPost } from "@/src/types";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import axios from "axios";


const fetchPosts = async (query: string): Promise<IPost[]> => {
    const response = await axios.get<IPost[]>(`${DOMAIN}/api/posts/search?searchText=${query}`);
    return response.data;
}
const useSearchPosts = (query: string): UseQueryResult<IPost[]> => {
    const querySearch = useQuery({
        queryKey: ["posts", "search", {query}],
        queryFn: () => fetchPosts(query),
        staleTime: 1000 * 60 * 5,
        enabled: query.length > 0,
    })
    return querySearch;
}

export default useSearchPosts;
