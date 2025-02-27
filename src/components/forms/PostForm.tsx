'use client'
import z from "zod";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { post_fields } from "@/src/constants";
import { Button, Input, Textarea } from "../ui";
import { FileUploader, Loader } from "../shared";
import { zodResolver } from "@hookform/resolvers/zod";
import { PostFormValidation } from "@/src/lib/validation";
import useCreatePost from "@/src/hook/queries/posts/useCreatePost";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";

const PostForm = () => {
    const router = useRouter();
    const { mutate, isPending } = useCreatePost()

    const form = useForm<z.infer<typeof PostFormValidation>>({
        resolver: zodResolver(PostFormValidation),
        defaultValues: ({
            caption: "",
            location: "",
            imageUrl: "",
            tags: [],
        }),
    });


    const handleSubmit = async (values: z.infer<typeof PostFormValidation>) => {
        mutate({ caption: values.caption, location: values.location, imageUrl: values.imageUrl, tags: values.tags });
        toast.success("your post created");
        form.reset();
        router.replace('/');
    };


    console.log(form.formState.errors)
    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="flex flex-col gap-9 w-full  max-w-5xl">

                {post_fields.map(item => {
                    const { name, label, type } = item;
                    return (
                        <FormField
                            key={name}
                            control={form.control}
                            name={name as "caption" | "imageUrl" | "location" | "tags"} 
                            render={({ field, fieldState }) => (
                                <FormItem>
                                    <FormLabel className="shad-form_label">{label}</FormLabel>
                                    <FormControl>
                                        {type === "textarea" ? (
                                            <Textarea
                                                className="shad-textarea custom-scrollbar"
                                                {...field}
                                                value={typeof field.value === "string" ? field.value : ""}
                                            />
                                        ) : type === "input" ? (
                                            <Input
                                                type="text"
                                                className="shad-input"
                                                {...field}
                                                value={typeof field.value === "string" ? field.value : ""}
                                            />
                                        ) : (
                                            <FileUploader fieldChange={field.onChange} mediaUrl={field.value as string} />
                                        )}
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                    );
                })}


                <div className="flex gap-4 items-center justify-end">
                    <Button
                        type="button"
                        className="shad-button_dark_4"
                        onClick={() => router.replace("/")}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="shad-button_primary whitespace-nowrap"
                    >
                        {isPending ? <Loader /> : "Post"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default PostForm;

