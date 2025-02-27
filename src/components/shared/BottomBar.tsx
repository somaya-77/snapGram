'use client'
import Link from 'next/link';
import Image from 'next/image';
import { bottomLinks } from '@/src/constants';
import { usePathname } from "next/navigation";

const BottomBar = () => {
const pathname = usePathname();
  return (
    <section className="bottom-bar">
      {bottomLinks.map((el, i) => {
        const { route, label, imageUrl } = el;
        const isActive = pathname === route;
        return (
          <Link href={route} key={i}  className={`flex-center flex-col gap-1 p-2 transition ${isActive && "bg-primary-500 rounded-[10px]"}`}>
            <Image src={imageUrl} alt={label} width={22} height={22} className={`${isActive && 'invert-white'}`} />
            <h3 className='tiny-medium text-light-2'>{label}</h3>
          </Link>
        )
      })}
    </section>
  )
}

export default BottomBar;
