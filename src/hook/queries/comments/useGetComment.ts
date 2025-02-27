"use client";
import { DOMAIN } from "@/src/lib/constants";
import { IComments } from "@/src/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const fetchPost = async (id: string) => {
    const response = await axios.get<IComments>(`${DOMAIN}/api/comments/${id}`);
    return response.data;
}
const useGetComment = (id?: string) => {
    const query = useQuery({
        queryKey: id ? ["comments",id] : [],
        queryFn: () =>  fetchPost(id!), 
        enabled: !!id, 
        // staleTime: 1000 * 60 * 1,
        // refetchInterval: 1000 * 60 * 2,
    })
    return query;
}

export default useGetComment;
