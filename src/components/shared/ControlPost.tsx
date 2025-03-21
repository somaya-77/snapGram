'use client'
import Link from 'next/link';
import { Button } from '../ui';
import { useRouter } from "next/navigation";
import { multiFormatDateString } from '@/lib/utils';
import useDeletePost from '@/hook/queries/posts/useDeletePost';
import Image from 'next/image';
import Loader from './Loader';
import { toast } from 'react-toastify';

const ControlPost = ({ post, currentUser }: any) => {
    const router = useRouter();
    const postId = post?.userId;
    const userId = currentUser.data.id;
    const { mutate: deletePost, isPending } = useDeletePost();

    const handleDelete = () => {
        deletePost(post.id, {
            onSuccess: () => {
                toast.success("Post deleted successfully!");
                router.push("/");
            },
        });
    };
    
    return (
        <div className="flex-between w-full">
            <Link
                href={`/auth/profile/${post?.userId}`}
                className="flex items-center gap-3">

                <Image
                    src={
                        post?.user?.imageUrl ||
                        "/assets/icons/profile-placeholder.svg"
                    }
                    alt="creator"
                    className="lg:w-12 lg:h-12 rounded-full"
                    width={500}
                    height={500}
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
                   {isPending ? <Loader /> : <Image src={"/assets/icons/delete.svg"} alt="delete" width={24} height={24} />}
                </Button>
            </div>
        </div>
    )
}

export default ControlPost;
