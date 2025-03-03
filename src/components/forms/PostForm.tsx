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
import { useState } from "react";

const PostForm = () => {

const [tagInput, setTagInput] = useState("");
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

    const handleAddTag = () => {
        if (tagInput.trim() !== "") {
            const currentTags = form.getValues("tags") || []; 
            form.setValue("tags", [...currentTags, tagInput.trim()]); 
            setTagInput(""); 
        }
    };
    
    const handleRemoveTag = (index: number) => {
        const updatedTags = form.getValues("tags").filter((_, i) => i !== index);
        form.setValue("tags", updatedTags);
    };

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
                            name={name as "caption" | "imageUrl" | "location" }
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
                                            <FileUploader field={field} />
                                        )}
                                    </FormControl>
                                    <FormMessage>{fieldState.error?.message}</FormMessage>
                                </FormItem>
                            )}
                        />
                    );
                })}

                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <div className="flex items-center gap-2">
                                <Input
                                    type="text"
                                    value={tagInput}
                                    className="shad-input"
                                    onChange={(e) => setTagInput(e.target.value)}
                                    placeholder="Add a tag..."
                                />
                                <Button type="button" onClick={handleAddTag} className="shad-button_dark_4 bg-primary-500">
                                    Add
                                </Button>
                            </div>

                            {/* Display added tags */}
                            <div className="flex flex-wrap gap-2 mt-2">
                                {form.watch("tags")?.map((tag, index) => (
                                    <span key={index} className="shad-input rounded-md p-3">
                                        {tag}
                                        <button type="button" onClick={() => handleRemoveTag(index)} className="ml-2 text-primary-500">
                                            ×
                                        </button>
                                    </span>
                                ))}
                            </div>

                            <FormMessage />
                        </FormItem>
                    )}
                />



                <div className="flex gap-4 items-center justify-end">
                    <Button
                        type="button"
                        className="shad-button_dark_4"
                        onClick={() => router.replace("/")}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="shad-button_primary whitespace-nowrap bg-primary-500"
                    >
                        {isPending ? <Loader /> : "Post"}
                    </Button>
                </div>
            </form>
        </Form>
    );
};

export default PostForm;

