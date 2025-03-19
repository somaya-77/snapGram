'use client'
import Link from "next/link";
import Image from "next/image";
import Logout from "./Logout";
import { useGetProfile, useGetUser } from "@/hook/queries";
import { useEffect } from "react";

const TopBar = () => {
  // const user = useGetUser();
  // const id = user?.data?.id as string | undefined;
  // const userIdPromise = Promise.resolve({ userId: id });
  // const { data: profile } = useGetProfile(userIdPromise)
  let profile = null
  useEffect(() => {
    
    profile = JSON.parse(localStorage.getItem("user") || "{}");
}, []);

  // const profile = JSON.parse(localStorage.getItem("user") || "{}");
  return (
    <section className="topBar">
      <div className="flex-between py-4 px-5">
        <Link href="/" className="flex gap-3 items-center">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={130}
            height={325}
          />
        </Link>

        <div className="flex gap-2">
          <Logout />
          <Link href={`/auth/profile/${profile?.id}`} className="flex-center gap-3">
            <Image src={profile?.imageUrl ||'/assets/icons/profile-placeholder.svg'}  alt='profile' width={50} height={50}
              className="size-8 rounded-full" />
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TopBar;
