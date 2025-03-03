"use client"
import z from "zod";
import { useEffect,useState } from "react";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { useRouter, useParams } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { PostFormValidation } from '@/src/lib/validation';
import { usePutPost, useGetPost } from '@/src/hook/queries';
import { Button, Input, Textarea } from '@/src/components/ui';
import { FileUploader, Loader } from '@/src/components/shared';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form';


const UpdatePostForm = () => {
    const params = useParams();
    const router = useRouter();
    const { mutate, isPending } = usePutPost();
    const postId = params?.id as string | undefined;
    const { data: postDetails } = useGetPost(postId);
    const [tagInput, setTagInput] = useState("");

    const form = useForm<z.infer<typeof PostFormValidation>>({
        resolver: zodResolver(PostFormValidation),
        defaultValues: {
            caption: postDetails?.caption || "",
            location: postDetails?.location || "",
            imageUrl: postDetails?.imageUrl || "",
            tags: postDetails?.tags?.map(tag => tag.name) || [],
        },
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
        console.log("values", values)
        mutate({
            id: postId,
            imageUrl: values.imageUrl,
            caption: values.caption,
            location: values.location,
            tags: values.tags,
        });
        toast.success("Your updated post success");
        router.replace('/')
    };

    useEffect(() => {
        if (postDetails) {
            form.setValue("caption", postDetails?.caption ?? "");
            form.setValue("imageUrl", postDetails?.imageUrl ?? "");
            form.setValue("location", postDetails?.location ?? "");
            form.setValue("tags", postDetails.tags.map(tag => tag.name));
        }
    }, [postDetails, form]);
    console.log(form.formState.errors)
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-9 w-full max-w-5xl">

                <FormField
                    control={form.control}
                    name="caption"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Caption</FormLabel>
                            <FormControl>
                                <Textarea className="shad-textarea custom-scrollbar" {...field} value={field.value} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="imageUrl"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Photos</FormLabel>
                            <FormControl>
                                <FileUploader field={field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Location</FormLabel>
                            <FormControl>
                                <Input type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                />

                {/* <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="shad-form_label">Add Tags</FormLabel>
                            <FormControl>
                                <Input placeholder="Art, Expression, Learn" type="text" className="shad-input" {...field} />
                            </FormControl>
                            <FormMessage className="shad-form_message" />
                        </FormItem>
                    )}
                /> */}

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
                    <Button type="button" className="shad-button_dark_4" onClick={() => router.back()}>
                        Cancel
                    </Button>
                    <Button type="submit" className="shad-button_primary whitespace-nowrap">
                        {isPending ? <Loader /> : "Update"}
                    </Button>
                </div>
            </form>
        </Form>
    )
}

export default UpdatePostForm
