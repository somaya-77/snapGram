'use client'
import { BottomBar, LeftSidebar, TopBar } from "@/components/shared";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from "react";

type Props = {
    children: React.ReactNode;
};
const AuthLayout: React.FC<Props> = ({ children }) => {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <main className='w-full md:flex'>
                <TopBar />
                <LeftSidebar />
                <section className="flex flex-1 h-full mb-20">
                    {children}
                </section>
                <BottomBar />
            </main>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default AuthLayout;





