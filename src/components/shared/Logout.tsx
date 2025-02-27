'use client'

import Image from "next/image";
import { Button } from "../ui/button";
import { useRouter } from 'next/navigation';
import { useLogout } from '@/src/hook/queries';


const Logout = () => {
    const router = useRouter();
    const { refetch } = useLogout();

    const logoutAndRedirect = async () => {
        await refetch();
        router.replace('/auth/login');
    };

    return (
        <Button  onClick={logoutAndRedirect} variant="ghost" className="shad_button_ghost flex justify-end">
            <Image src="/assets/icons/logout.svg" alt="logout" width={32} height={32} />
            <p className="small-medium lg:base-medium">Logout</p>
        </Button>
    )
}

export default Logout
