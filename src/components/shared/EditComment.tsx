'use client'
import z from "zod";
import Loader from "./Loader";
import Image from "next/image";
import { Button, Input } from "../ui";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { CommentValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useEffect } from "react";
import { useGetComment, usePutComment } from "@/hook/queries";
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';

const EditComment = ({ id, setOpen }: { id: string, setOpen: Dispatch<SetStateAction<boolean>>; }) => { 
    const { mutate, isPending } = usePutComment();
    const { data: commentData } = useGetComment(id);

    const form = useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            text: commentData?.text || "",
            postId: +id,
        },
    });


    const handleUpdate = (data: z.infer<typeof CommentValidation>) => {
        mutate({
            id: id,
            text: data.text,
        });
        toast.success("Your updated comment success");
        setOpen(false)
    };

    useEffect(() => {
        if (commentData) {
            form.reset({
                text: commentData.text || "",
                postId: +id,
            });
        }
    }, [commentData, form]);

    return (
        <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50'>
            <div className='absolute opacity-4 w-full h-full top-0 left-0 bottom-0 flex-center'>
                <div className='w-full p-5 flex-center'>
                    <div className="p-5 pt-0 border border-dark-4 xl:rounded-l-[24px] rounded-[20px] w-full max-w-5xl bg-black z-50">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(handleUpdate)} className="w-full max-w-5xl">
                                <h3 className="body-bold md:h3-bold w-full my-10">Update Comment</h3>
                                <div className="">
                                    <FormField
                                        control={form.control}
                                        name="text"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormControl>
                                                    <Input type="text" className="shad-input" {...field} />
                                                </FormControl>
                                                <FormMessage className="shad-form_message" />
                                            </FormItem>
                                        )}
                                    />

                                    <div className="flex justify-end gap-4 mt-5">
                                        <Button onClick={() => setOpen(false)} className="h-12 bg-dark-4 px-5 text-light-1 rounded-lg">
                                            Cancel
                                        </Button>

                                        <Button
                                            type="submit"
                                            className="h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg"
                                            disabled={isPending}
                                        >
                                            {isPending ? <Loader /> : (
                                                <>
                                                    <Image
                                                        src={"/assets/icons/edit.svg"}
                                                        alt="add"
                                                        width={20}
                                                        height={20}
                                                    />
                                                    <p className="flex whitespace-nowrap small-medium">
                                                        Update Comment
                                                    </p>
                                                </>
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditComment;
