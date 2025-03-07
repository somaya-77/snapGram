import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { DOMAIN } from "@/lib/constants";

const fetchLogout = async () => {
    const response = await axios.get(`${DOMAIN}/api/users/logout`);
    return response.data;
};

const useLogout = () => {
    return useQuery({
        queryKey: ["logout"],
        queryFn: fetchLogout,
        enabled: false,
    });
};

export default useLogout;