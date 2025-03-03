'use client'

import Link from "next/link";
import Loader from "./Loader";
import { IPost } from "@/src/types";
import useGetLikesUser from "@/src/hook/queries/like/useGetLikesUser";
import Image from "next/image";

const LikedPosts = ({ id }: { id: string }) => {
    const { data: likes, isLoading } = useGetLikesUser(id);

    if (likes.length === 0) {
        return <p>No liked posts yet!</p>
    }
    return isLoading ? <Loader /> : <ul className="grid-container">
        {likes?.map((like: IPost) => (
            <li key={like.id} className="relative min-w-80 h-80">
                <Link href={`/posts/${like.id}`} className="grid-post_link">
                    <Image
                        width={100}
                        height={100}
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


