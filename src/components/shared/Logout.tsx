'use client'

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation';
import { useLogout } from '@/hook/queries';
import { useState } from "react";
import { logoutUser } from "@/hook/queries/auth/useLogout";


const Logout = () => {
    const router = useRouter();
    // const { mutateAsync, isPending } = useLogout();
    const [isLoading, setIsLoading] = useState(false);

    const logoutAndRedirect = async () => {
        setIsLoading(true);
        try {
            await logoutUser(); 
            router.replace("/auth/login"); 
        } catch (error) {
            console.error("Error during logout:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Button  onClick={logoutAndRedirect} disabled={isLoading} variant="ghost" className="shad_button_ghost flex justify-end">
            <Image src="/assets/icons/logout.svg" alt="logout" width={32} height={32} />
            <p className="small-medium lg:base-medium">Logout</p>
        </Button>
    )
}

export default Logout
