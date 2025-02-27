"use client";
import useGetPost from "@/src/hook/queries/posts/useGetPost";
import CommentForm from "@/src/components/forms/CommentForm";
import { Loader, Comments, UserInfo } from "@/src/components/shared";
import Image from "next/image";

const PostDetailsContent = ({ id }: { id: string }) => {
    
    const { data, isLoading, isError, error } = useGetPost(id);
    if (!id) return <p>Error: Invalid Post ID</p>;
    if (isError) return <p>Error: {error?.message}</p>;

    return isLoading || !data ? (
        <Loader />
    ) : (
        <>
            <div className="post_details-card">
                {data.imageUrl ? <Image width={1000} height={1000} src={data.imageUrl || ""} alt="post image" className="post_details-img" /> : null}

                <UserInfo post={data} />
            </div>

            <CommentForm />
            <Comments comments={data.comment} />
        </>
    );
}

export default PostDetailsContent
