'use client'
import Link from 'next/link';
import Loader from './Loader';
import Image from 'next/image';
import useAllGetPosts from '@/src/hook/queries/users/useGetAllPosts';


const Posts = ({ id }: { id: string }) => {
    const { data: allPosts, isLoading } = useAllGetPosts(id);
    return isLoading ? <Loader /> : <ul className="grid-container">
        {allPosts?.map((post) => (
            <li key={post.id} className="relative min-w-80 h-80">
                <Link href={`/posts/${post.id}`} className="grid-post_link">
                    <Image
                        src={post.imageUrl || ""}
                        alt="post"
                        height={100}
                        width={100}
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
                        <p className="line-clamp-1">{post?.caption}</p>
                    </div>
                </div>
            </li>
        ))}
    </ul>
}
export default Posts;