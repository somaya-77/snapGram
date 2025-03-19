"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { DOMAIN } from "@/lib/constants";

const fetchData = async (userId: string) => {
  if (!userId) throw new Error("userId is required");
  const response = await axios.get(`${DOMAIN}/api/users/profile/${userId}`);
  const prof = localStorage.setItem("user", JSON.stringify(response.data))
  console.log("prof", prof)
  return response.data;
};

const useGetProfile = (userId?: string) => { 
  // const resolvedUserId = userId ? userId.then((result) => result.userId) : undefined;
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["profile", userId],
    queryFn: async () => {
        const resolved = await userId;
        if (resolved) {
            return fetchData(resolved);
        }
        return Promise.reject(new Error("UserId is not defined"));
    },
    enabled: !!userId,
    // staleTime: 1000 * 60 * 2, 
    // gcTime: 1000 * 60 * 60, 
    // refetchOnMount: "always", 
    // refetchOnReconnect: true, 
});

const refetchProfile = () => {
    queryClient.invalidateQueries({ queryKey: ["profile", userId] });
};

return { data, error, isLoading, refetchProfile };
};

export default useGetProfile;