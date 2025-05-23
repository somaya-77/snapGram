'use client'

import Link from "next/link";
import Loader from "./Loader";
import { IPost } from "@/types";
import useGetLikesUser from "@/hook/queries/like/useGetLikesUser";
import Image from "next/image";

const LikedPosts = ({ id }: { id: string }) => {
    const { data: likes, isLoading } = useGetLikesUser(id);

    return isLoading ? <Loader /> : <ul className="grid-container">
        {likes?.map((like: IPost) => (
            <li key={like.id} className="relative min-w-80 h-80">
                <Link href={`/posts/${like.id}`} className="grid-post_link">
                    <Image
                        width={1500}
                        height={1500}
                        src={like.imageUrl || ""}
                        alt="post"
                        className="h-full w-full object-cover"
                    />
                </Link>
            </li>
        ))}
    </ul>
}

export default LikedPosts


