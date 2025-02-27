'use client'
import Link from "next/link";
import Image from "next/image";
import { INavLink } from "@/src/types";
import { usePathname } from "next/navigation";

const LinkSidBar = ({ imageUrl, route, label }: INavLink) => {
    const pathname = usePathname();
    const isActive = pathname === route;
    return (
        <li className={`leftSideBar_link group ${isActive && "bg-primary-500"}`}>
            <Link href={route} className='flex gap-4 items-center p-4'>
                <Image src={imageUrl} alt={label} width={22} height={22} className={`group-hover:invert-white ${isActive && 'invert-white'}`} />
                <h3>{label}</h3>
            </Link>
        </li>
    )
}

export default LinkSidBar;

