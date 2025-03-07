"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import Signup from '@/components/forms/Signup';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const Page = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex justify-between">
        <div className="flex h-screen flex-1 flex-center">
          <Signup />
        </div>
        <Image src="/assets/images/side-img.svg" alt="logo" width={1000} height={1000}
          className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat" />
      </div>
    </QueryClientProvider>
  )
}

export default Page;