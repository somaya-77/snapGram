'use client'
import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/constants";
import { LinkSidBar, Loader, Logout } from "./";
import useGetUser from "@/hook/queries/users/useGetUsers";
import { useGetProfile } from "@/hook/queries";


const LeftSidebar = () => {
  const user = useGetUser();
  const id = user?.data?.id as string | undefined;
  const userIdPromise = Promise.resolve({ userId: id });
  const { data: profile,isLoading } = useGetProfile(userIdPromise)
  return (
    <nav className="leftSideBar">
      <div className="flex flex-col gap-11 ">
        <Link href="/" className="flex gap-3 items-center">
          <Image
            src="/assets/images/logo.svg"
            alt="logo"
            width={170}
            height={100}
          />
        </Link>

        <Link href={`/auth/profile/${profile?.id || ''}`} className="flex gap-3 items-center">
          {profile?.imageUrl ? (
            <Image
              className="rounded-full"
              src={profile.imageUrl || ""}
              alt="avatar"
              width={48}
              height={48}
            />
          ) : (
            <div className="bg-primary-500 flex justify-center items-center bg-light-blue text-white rounded-full w-12 h-12 avatar">
              {profile?.name?.slice(0, 1).toUpperCase()}
            </div>
          )}


          <div className="flex flex-col">
            {!isLoading ? <p className="body-bold">{profile?.name} </p> : <Loader />}
            <p className="small-regular text-light-3">
              {profile ? `@${profile.username}` : ''}
            </p>
          </div>
        </Link>

        {/* links  */}
        <ul className="flex flex-col gap-6">
          {sidebarLinks.map((el, i) => {
            return <LinkSidBar key={i} {...el} />
          })}
        </ul>
      </div>

      <Logout />
    </nav>
  )
}

export default LeftSidebar;
