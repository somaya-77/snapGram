import Link from "next/link";
import Image from "next/image";
import Logout from "./Logout";
import { Button } from "../ui";


const TopBar = () => {
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

        <Logout />
        <div className="flex gap-4">
          <Button variant="ghost" className="shad_button_ghost">
            <Image src="/assets/icons/logout.svg" alt="logout" width={50} height={50} />
          </Button>
          <Link href='' className="flex-center gap-3">
            <Image src="/assets/images/profile.svg" alt='profile' width={50} height={50}
            className="size-8 rounded-full"/>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default TopBar;
