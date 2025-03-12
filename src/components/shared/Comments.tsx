'use client'
import { useState } from "react";
import { IComments, IPost } from "@/types";
import EditComment from "./EditComment";
// import { useGetUser, useDeleteComment } from "@/src/hook/queries";
import Image from "next/image";
import { useDeleteComment, useGetUser } from "@/hook/queries";
import { toast } from "react-toastify";

const Comments = ({ comments }: { comments: IComments[] }) => {

    const { mutate, isPending } = useDeleteComment();
    const [open, setOpen] = useState(false);
    const [commentId, setCommentId] = useState(null);
    const { data } = useGetUser();

    const handleDelete = (id: number) => {
        mutate(id, {
            onSuccess: () => {
                toast.success("Comment deleted successfully!");
            },
            onError: (error) => {
                toast.error("Failed to delete comment.");
            },
        });
    };
    const handleEdit = (id: number) => {
        setCommentId(id)
        setOpen(true)
    }
    return (
        <div className="w-full max-w-5xl">
            {comments?.length > 0 ? <ul className="py-2 px-5 flex flex-col gap-1 mt-4 border border-dark-4 xl:rounded-l-[24px] bg-dark-2 rounded-[20px] w-full max-w-5xl">
                
                {comments.map((item) => (
                    <li key={item.id} className="text-light-3 small-regular border-b border-dark-4/80 pb-2  last:border-none">
                        <div className="flex justify-between py-2">

                            <div className="flex flex-col">
                                <span className="text-lg text-white">@{item.user.username}</span>
                                <span className="text-lg">{item.text}</span>
                            </div>

                            {item?.userId === data.id && (
                                <div className="flex gap-6">
                                    <button
                                        onClick={() => handleEdit(item.id)}
                                    >
                                        <Image src="/assets/icons/edit.svg" alt="edit" width={20} height={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
                                        disabled={isPending}
                                    >
                                        <Image src="/assets/icons/delete.svg" alt="delete" width={20} height={20} />
                                    </button>
                                </div>
                            )}
                        </div>
                    </li>
                )
                )}
            </ul> : null}
            {open && <EditComment id={commentId} setOpen={setOpen} />}
        </div>

    );
};

export default Comments;




