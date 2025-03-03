import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DOMAIN } from "@/src/lib/constants";


const fetchData = async (userId: string) => {
    if (!userId) throw new Error("userId is required");

    const response = await axios.get(`${DOMAIN}/api/users/profile/${userId}`);
    console.log("response.data",response.data)
    return response.data;
};

const useGetProfile = (userId: Promise<{ userId: string }>) => {
    const { data, error, isLoading } = useQuery({
        queryKey: ["profile", userId], 
        queryFn: async () => {
            const resolved = await userId; 
            return fetchData(resolved.userId); 
        },
        enabled: !!userId, 
    });

    return { data, error, isLoading };
};

export default useGetProfile;
