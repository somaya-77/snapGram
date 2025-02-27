'use client'
import Link from 'next/link'
import Loader from './Loader';
import Image from 'next/image';
import PostStats from './PostStats';
import {useGetUser,useGetPosts,useSearchPosts} from '@/src/hook/queries';

type GridPostListProps = {
    searchQuery: string;
};

const GridPostList = ({ searchQuery }: GridPostListProps) => {
    const { data, isLoading } = useGetPosts();
    const user = useGetUser()
    const searchData = useSearchPosts(searchQuery);

    const posts = searchData.data && searchData.data.length > 0 ? searchData.data : data;
    return (
        <ul className="grid-container">
            {isLoading ? <Loader /> : posts?.map((post) => (
                <li key={post.id} className="relative min-w-80 h-80">
                    <Link href={`/posts/${post.id}`} className="grid-post_link">
                        <Image
                        width={15}
                        height={15}
                            src={post.imageUrl || ""}
                            alt="post"
                            className="h-full w-full object-cover"
                        />
                    </Link>

                    <div className="grid-post_user">
                        <div className="flex items-center justify-start gap-2 flex-1">
                            <Image
                                src={
                                    post.imageUrl ||
                                    "/assets/icons/profile-placeholder.svg"
                                }
                                alt="creator"
                                className="rounded-full"
                                height={35}
                                width={35}
                            />
                            <p className="line-clamp-1">{post.caption}</p>
                        </div>
                        <PostStats postId={post.id} userId={user.data.id} />
                    </div>

                </li>
            ))}
        </ul>
    )

}

export default GridPostList;

