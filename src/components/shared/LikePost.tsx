// "use client";
// import Loader from './Loader';
// import Image from 'next/image';
// import React, { useState, useEffect } from 'react';
// import useGetLikes from '@/hook/queries/like/useGetLikes';
// import usePostLike from '@/hook/queries/like/usePostLike';

// type Props = {
//     postId: string;
//     userId: string;
// };

// const LikePost = ({ postId, userId }: Props) => {
//     const { mutate, isPending } = usePostLike();
//     const { data } = useGetLikes(+postId, +userId);
//     const [liked, setLiked] = useState(false);
//     const [likesCount, setLikesCount] = useState(0);

//     useEffect(() => {
//         if (data) {
//             setLiked(data.initialLiked ?? false);
//             setLikesCount(data.initialLikes ?? 0);
//         }
//     }, [data]);

//     const handleLike = () => {
//         const newLiked = !liked;
//         setLiked(newLiked);
//         setLikesCount((prev) => (newLiked ? prev + 1 : prev - 1));
//         mutate(
//             { postId, userId },
//             {
//                 onError: (error) => {
//                     setLiked(liked);
//                     setLikesCount((prev) => (liked ? prev + 1 : prev - 1));
//                     console.error("Like mutation error:", error);
//                 },
//             }
//         );
//     };

//     return (
//         <div className="flex gap-2 mr-5">
//             {isPending ? <Loader /> : (
//                 <>
//                     <Image
//                         src={liked ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}
//                         alt="like"
//                         width={20}
//                         height={20}
//                         className="cursor-pointer"
//                         onClick={handleLike}
//                     />
//                     <p className="small-medium lg:base-medium">{likesCount}</p>
//                 </>
//             )}

//         </div>
//     );
// };

// export default LikePost;
"use client";
import Loader from "./Loader";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import useGetLikes from "@/hook/queries/like/useGetLikes";
import usePostLike from "@/hook/queries/like/usePostLike";

type Props = {
    postId: string;
    userId: string;
};

const LikePost = ({ postId, userId }: Props) => {
    const { mutate, isPending } = usePostLike();
    const { data, isLoading, error } = useGetLikes(Number(postId), Number(userId)); 
    const [liked, setLiked] = useState(false);
    const [likesCount, setLikesCount] = useState(0);

    useEffect(() => {
        if (data) {
            setLiked(data.initialLiked ?? false);
            setLikesCount(data.initialLikes ?? 0);
        }
    }, [data]);

    const handleLike = () => {
        const newLiked = !liked;
        setLiked(newLiked);
        setLikesCount((prev) => (newLiked ? prev + 1 : prev - 1));
        mutate(
            { postId, userId }, 
            {
                onError: (error) => {
                    setLiked(liked);
                    setLikesCount((prev) => (liked ? prev + 1 : prev - 1));
                    console.error("Like mutation error:", error);
                },
            }
        );
    };

    if (isLoading) return <Loader />;
    if (error) return <div>Error loading likes</div>;

    return (
        <div className="flex gap-2 mr-5">
            {isPending ? (
                <Loader />
            ) : (
                <>
                    <Image
                        src={liked ? "/assets/icons/liked.svg" : "/assets/icons/like.svg"}
                        alt="like"
                        width={20}
                        height={20}
                        className="cursor-pointer"
                        onClick={handleLike}
                    />
                    <p className="small-medium lg:base-medium">{likesCount}</p>
                </>
            )}
        </div>
    );
};

export default LikePost;

    // const initialLiked = data?.initialLiked ?? false;


    // useEffect(() => {
    //     if (data) {
    //         setLiked(data.initialLiked);
    //         setLikesCount((prev) => liked ? prev - 1 : prev + 1);
    //         setLikesCount(data.initialLikes);
    //     }
    // }, [data]);

    // const handleLike = () => {
    //     setLiked((prev) => !prev);
    //     mutate({ postId, userId });
    // };
