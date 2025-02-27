import Link from "next/link";
import Image from "next/image";
import { sidebarLinks } from "@/src/constants";
import { LinkSidBar, Loader, Logout } from "./";
import useGetUser from "@/src/hook/queries/users/useGetUsers";

const LeftSidebar = () => {
  const { data } = useGetUser();

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

        <Link href={`/auth/profile/${data?.id || ''}`} className="flex gap-3 items-center">
          <div
            className="bg-primary-500 flex justify-center items-center bg-light-blue text-white rounded-full w-12 h-12 avatar"
          >
            {data && data?.name.slice(0, 1).toUpperCase()}
          </div>

          <div className="flex flex-col">
            {data ? <p className="body-bold">{data.name} </p> : <Loader />}
            <p className="small-regular text-light-3">
              {data ? `@${data.username}` : ''}
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
