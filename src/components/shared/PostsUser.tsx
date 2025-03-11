'use client'

import Image from 'next/image';
import { Button } from '../ui';
import { useState } from 'react';
import LikedPosts from './LikedPosts';
import { useParams } from 'next/navigation';
import Posts from './Posts';
import { useAllGetUsers } from '@/hook/queries';


const PostsUser = () => {
    const params = useParams();
    const id = params?.id as string;
    const [showPosts, setShowPosts] = useState(true);

    return (
        <>
            <div className="flex max-w-5xl w-full">
                <Button
                    onClick={() => setShowPosts(true)}
                    className={`profile-tab rounded-l-lg  ${showPosts && "!bg-black"}`} >
                    <Image
                        src="/assets/icons/posts.svg"
                        alt="posts"
                        width={20}
                        height={20}
                    />
                    Posts
                </Button>
                <Button
                    onClick={() => setShowPosts(false)}
                    className={`profile-tab rounded-l-lg  ${!showPosts && "!bg-black"}`}>
                    <Image
                        src="/assets/icons/like.svg"
                        alt="like"
                        width={20}
                        height={20}
                    />
                    Liked Posts
                </Button>
            </div>

            {showPosts ? <Posts id={id} /> : <LikedPosts id={id} />}
        </>
    )
}

export default PostsUser;


