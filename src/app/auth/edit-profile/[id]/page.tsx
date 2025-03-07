'use client'
import { useState } from "react";
import AuthLayout from "@/components/AuthLayout";
import UpdateUserForm from "@/components/forms/UpdateUserForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Image from "next/image";

const UpdateProfile = () => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthLayout>
        <div className="flex flex-1">
          <div className="common-container">
            <div className="flex-start gap-3 justify-start w-full max-w-5xl">
              <Image
                src="/assets/icons/edit.svg"
                width={36}
                height={36}
                alt="edit"
                className="invert-white"
              />
              <h2 className="h3-bold md:h2-bold text-left w-full">Edit Profile</h2>
            </div>

            <UpdateUserForm />
          </div>
        </div>
      </AuthLayout>
    </QueryClientProvider>
  );
};

export default UpdateProfile;