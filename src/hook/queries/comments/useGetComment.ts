"use client";
import { DOMAIN } from "@/lib/constants";
import { IComments } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const fetchPost = async (id: string) => {
    const response = await axios.get<IComments>(`${DOMAIN}/api/comments/${id}`);
    console.log("API Response:", response.data);
    return response.data;
}
const useGetComment = (id?: string) => {
    const query = useQuery({
        queryKey: id ? ["comments",id] : undefined,
        queryFn: () =>  fetchPost(id!), 
        enabled: !!id, 
    })
    return query;
}

export default useGetComment;


