'use client'
import { useState } from 'react';
import AuthLayout from '@/components/AuthLayout';
import { Content, PostsUser } from '@/components/shared';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";


const Profile = () => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <AuthLayout>
                <div className="profile-container">
                    <div className="profile-inner_container">
                        <Content />
                    </div>
                    <PostsUser />
                </div>
            </AuthLayout>
        </QueryClientProvider>
    );
};

export default Profile;






