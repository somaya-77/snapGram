'use client'
import Link from 'next/link';
import { Button } from '../ui';
import { useRouter } from "next/navigation";
import { multiFormatDateString } from '@/src/lib/utils';
import useDeletePost from '@/src/hook/queries/posts/useDeletePost';
import Image from 'next/image';

const ControlPost = ({ post, currentUser }: any) => {
    const router = useRouter();
    const postId = post?.userId;
    const userId = currentUser.data.id;
    const { mutate: deletePost } = useDeletePost();

    const handleDelete = () => {
        deletePost(post.id, {
            onSuccess: () => {
                alert("Post deleted successfully!");
                router.push("/");
            },
        });
    };
    
    return (
        <div className="flex-between w-full">
            <Link
                href={`/profile/${post.id}`}
                className="flex items-center gap-3">

                <Image
                    src={
                        post.imageUrl ||
                        "/assets/icons/profile-placeholder.svg"
                    }
                    alt="creator"
                    className="lg:w-12 lg:h-12 rounded-full"
                    width={8}
                    height={8}
                />
                <div className="flex gap-1 flex-col">
                    <p className="base-medium lg:body-bold text-light-1">{post.caption}</p>
                    <div className="flex-center gap-2 text-light-3">
                        <p className="subtle-semibold lg:small-regular ">{multiFormatDateString(post.createdAt)}</p>
                        •<p className="subtle-semibold lg:small-regular">{post.location}</p>
                    </div>
                </div>
            </Link>

            <div className="flex-center gap-4">
                <Link href={`/edit-post/${post.id}`} className={`${postId !== userId && "hidden"}`}>
                    <Image src={"/assets/icons/edit.svg"} alt="edit" width={24} height={24} />
                </Link>

                <Button
                    onClick={handleDelete}
                    variant="ghost"
                    className={`${postId !== userId && "hidden"}`}
                >
                    <Image src={"/assets/icons/delete.svg"} alt="delete" width={24} height={24} />
                </Button>
            </div>
        </div>
    )
}

export default ControlPost;
