// import { useQuery } from "@tanstack/react-query";
// import axios from "axios";
// import { DOMAIN } from "@/lib/constants";


// const fetchData = async (userId: string) => {
//     if (!userId) throw new Error("userId is required");
//     const response = await axios.get(`${DOMAIN}/api/users/profile/${userId}`);
//     return response.data;
// };

// const useGetProfile = (userId: Promise<{ userId: string }>) => {
//     const { data, error, isLoading } = useQuery({
//         queryKey: ["profile", userId], 
//         queryFn: async () => {
//             const resolved = await userId; 
//             return fetchData(resolved.userId); 
//         },
//         enabled: !!userId, 
//         staleTime: Infinity,
//         gcTime: 1000 * 60 * 60,
//         refetchOnWindowFocus: false, 
//         refetchOnReconnect: false, 
//         refetchOnMount: false,
//     });

//     return { data, error, isLoading };
// };

// export default useGetProfile;


"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DOMAIN } from "@/lib/constants";

const fetchData = async (userId: Promise<{ userId: string; }>) => {
  if (!userId) throw new Error("userId is required");
  const response = await axios.get(`${DOMAIN}/api/users/profile/${userId}`);
  return response.data;
};

const useGetProfile = (userId?: Promise<{ userId: string; }>) => { 
  const { data, error, isLoading } = useQuery({
    queryKey: ["profile", userId], 
    queryFn: () => fetchData(userId!), 
    enabled: !!userId,
    staleTime: Infinity,
    gcTime: 1000 * 60 * 60,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
    refetchOnMount: false,
  });

  return { data, error, isLoading };
};

export default useGetProfile;