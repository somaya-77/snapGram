'use client'
import { BottomBar, LeftSidebar, TopBar } from "@/components/shared";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { useState } from "react";

type Props = {
    children: React.ReactNode;
};

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 2,
            gcTime: 1000 * 60 * 60,
            refetchOnMount: "always", 
            refetchOnWindowFocus: false, 
            refetchOnReconnect: true, 
        },
    },
});

const AuthLayout: React.FC<Props> = ({ children }) => {

   
    // const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <main className='w-full md:flex'>
                <TopBar />
                <LeftSidebar />
                <section className="flex flex-1 h-full mb-20 md:mb-0">
                    {children}
                </section>
                <BottomBar />
            </main>
            <ReactQueryDevtools />
        </QueryClientProvider>
    )
}

export default AuthLayout;





