"use client";
import Loader from './Loader';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import useGetLikes from '@/hook/queries/like/useGetLikes';
import usePostLike from '@/hook/queries/like/usePostLike';

type Props = {
    postId: string;
    userId: string;
};

const LikePost = ({ postId, userId }: Props) => {
    const { mutate, isPending } = usePostLike();
    const { data } = useGetLikes(+postId, +userId);
    const [liked, setLiked] = useState(false);

    const initialLiked = data?.initialLiked ?? false;
    const initialLikes = data?.initialLikes ?? 0;

    useEffect(() => {
        if (data) {
            setLiked(data.initialLiked);
        }
    }, [data]);

    const handleLike = () => {
        setLiked((prev) => !prev);
        mutate({ postId, userId });
    };

    return (
        <div className="flex gap-2 mr-5">
            {isPending ? <Loader /> : (
                <>
                    <Image
                        src={liked || initialLiked ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}
                        alt="like"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                        onClick={handleLike}
                    />
                    <p className="small-medium lg:base-medium">{liked ? initialLikes : initialLikes}</p>
                </>
            )}

        </div>
    );
};

export default LikePost;
