"use client";
import { DOMAIN } from "@/lib/constants";
import { IPost } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";


const fetchPost = async (id: string) => {
    const response = await axios.get<IPost>(`${DOMAIN}/api/posts/${id}`);
    return response.data;
}
const useGetPost = (id?: string) => {
    const query = useQuery({
        queryKey: id ? ["postDetails",id] : [],
        queryFn: () =>  fetchPost(id!), 
        enabled: !!id, 
    })
    return query;
}

export default useGetPost;


