"use client";
import { useState } from "react";
import { Button } from "@/components/ui";
import AuthLayout from "@/components/AuthLayout";
import { useParams, useRouter } from "next/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RelatedPosts, PostDetailsContent } from "@/components/shared";
import Image from "next/image";

const PostDetails = () => {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <AuthLayout>
        <div className="post_details-container">
          <div className="hidden md:flex max-w-5xl w-full">
            <Button
              onClick={() => router.back()}
              variant="ghost"
              className="shad-button_ghost">
              <Image src={"/assets/icons/back.svg"} alt="back" width={24} height={24} />
              <p className="small-medium lg:base-medium">Back</p>
            </Button>
          </div>

          <PostDetailsContent id={id} />
          <RelatedPosts />
        </div>
      </AuthLayout>
    </QueryClientProvider>
  );
};

export default PostDetails;