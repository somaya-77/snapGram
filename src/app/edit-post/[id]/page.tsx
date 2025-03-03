"use client"
import Image from 'next/image';
import { useState } from 'react';
import AuthLayout from '@/src/components/AuthLayout';
import UpdatePostForm from '@/src/components/forms/UpdatePostForm';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const EditPostPage = () => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <AuthLayout>
                <div className="flex flex-1 w-full">
                    <section className='common-container w-full'>
                        <div className='max-w-5xl flex-start gap-3 justify-start w-full'>
                            <Image src='/assets/icons/add-post.svg' alt='add' width={36} height={36} />
                            <h2 className='h3-bold md:h2-bold text-left w-full'>Update Post</h2>
                        </div>

                        <UpdatePostForm  />
                    </section>
                </div>
            </AuthLayout>
        </QueryClientProvider>
    );
};

export default EditPostPage;
