"use client"
import z from "zod";
import { useEffect,useState } from "react";
import { toast } from 'react-toastify';
import { useForm } from "react-hook-form";
import { useRouter } from 'next/navigation';
import { zodResolver } from "@hookform/resolvers/zod";
import { PostFormValidation } from '@/src/lib/validation';
import { usePutPost, useGetPost } from '@/src/hook/queries';
import { Button, Input, Textarea } from '@/src/components/ui';
import { FileUploader, Loader } from '@/src/components/shared';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/src/components/ui/form';


const UpdatePostForm = ({ params }: { params: Promise<{ userId: string }> }) => { 
    const [userId, setUserId] = useState<string | null>(null);

    const router = useRouter();
    const { mutate, isPending } = usePutPost();

    useEffect(() => {
        params.then((resolvedParams) => {
            setUserId(resolvedParams.userId);
        });
    }, [params]);

    const { data: postDetails } = useGetPost(userId ?? "");

    const form = useForm<z.infer<typeof PostFormValidation>>({
        resolver: zodResolver(PostFormValidation),
        defaultValues: {
            caption: postDetails?.caption || "",
            location: "",
            imageUrl: "",
            tags: [],
        },
    });
    console.log("object", postDetails)
    const handleSubmit = async (values: z.infer<typeof PostFormValidation>) => {
        console.log("values", values)
       
        mutate({
            id: userId,
            imageUrl: values.imageUrl,
            caption: values.caption,
            location: values.location,
            tags: values.tags,
        });
        toast.success("Your updated post success");
        router.replace('/')
    };
    const convertUrlToFile = async (imageUrl: string): Promise<string> => {
        // const response = await fetch(imageUrl);
        // const blob = await response.blob();
        // const file = new File([blob], "image.jpg", { type: blob.type });
        return imageUrl;  
    };
    useEffect(() => {
        form.setValue("caption", postDetails?.caption ?? "");
        if (postDetails?.imageUrl) {
            convertUrlToFile(postDetails.imageUrl).then((url) => {
                form.setValue("imageUrl", url);
            });
        }
        form.setValue("location", postDetails?.location ?? "");
        if (postDetails?.tags) {
            form.setValue("tags", postDetails.tags.map(tag => tag.name));
        }

    }, [postDetails,form]);

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
                                <FileUploader fieldChange={field.onChange} mediaUrl={field.value} />
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

                <FormField
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
