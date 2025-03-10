'use client'
import z from "zod";
import { Form } from "../ui/form";
import { Loader } from "../shared";
import { Button, Input } from "../ui";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { useParams } from 'next/navigation';
import {useCreateComment} from "@/hook/queries";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentValidation } from "@/lib/validation";
import Image from "next/image";



const CommentForm = () => {
    const params = useParams();
    const id = params?.id as string;
    const { mutate, isPending } = useCreateComment();
    
    const form = useForm<z.infer<typeof CommentValidation>>({
        resolver: zodResolver(CommentValidation),
        defaultValues: {
            text: "",
            postId: +id,
        },
    });

    const handleSubmit = (data: z.infer<typeof CommentValidation>) => {
        mutate({
            text: data.text,
            postId: Number(id),
        });
        toast.success("Your comment created success")
        form.reset();
    };


    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full max-w-5xl">
                <hr className="border w-full border-dark-4/80" />

                <h3 className="body-bold md:h3-bold w-full my-10">Comments</h3>

                <div className="flex-center gap-2">
                    <Input
                        type="text"
                        placeholder="Type your comment..."
                        className="explore-search"
                        {...form.register("text")}
                    />

                    <Button
                        type="submit"
                        className="h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg"
                        disabled={isPending}
                    >
                        {isPending ? <Loader /> : (
                            <>
                                <Image
                                    src="/assets/icons/edit.svg"
                                    alt="add"
                                    width={20}
                                    height={20}
                                />
                                <p className="flex whitespace-nowrap small-medium">
                                    Add Comment
                                </p>
                            </>
                        )}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default CommentForm;
