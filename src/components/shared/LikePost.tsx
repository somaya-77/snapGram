"use client";
import Loader from "./Loader";
import Image from "next/image";
import usePostLike from "@/hook/queries/like/usePostLike";
import { Like } from "@/types";
import { useGetUser } from "@/hook/queries";

type Props = {
    postId: string;
    userId: string;
    like: Like[];
};

const LikePost = ({ postId, userId, like }: Props) => {
    const { mutate, isPending } = usePostLike();
    const registration = useGetUser()
    const userIds = like?.map((el) => el.userId) || []; 
    const isLiked = userIds.includes(registration?.data.id); 

    const handleLike = () => {
        mutate(
            { postId, userId },
        );
    };

    if (isPending) return <Loader />;

    return (
        <div className="flex gap-2 mr-5">
            {isPending ? (
                <Loader />
            ) : (
                <>
                    <Image
                        src={isLiked ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}
                        alt="like"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                        onClick={handleLike}
                    />
                    <p className="small-medium lg:base-medium">{like?.length}</p>
                </>
            )}
        </div>
    );
};

export default LikePost;


