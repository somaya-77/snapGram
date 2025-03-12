'use client'
import Link from 'next/link';
import Image from 'next/image';
import { IPost } from '@/types';
import { Loader } from '@/components/shared';
import useGetUser from '@/hook/queries/users/useGetUsers';
import useGetSavesUser from '@/hook/queries/save/useGetSavesUser';

const ContentSaved = () => {
    const { data: user } = useGetUser()
    const { data: saves, isLoading } = useGetSavesUser(user?.id);

    return isLoading ? <Loader /> : <ul className="grid-container">
        {saves?.map((save: IPost) => (
            <li key={save.id} className="relative min-w-80 h-80">
                <Link href={`/posts/${save.id}`} className="grid-post_link">
                    <Image
                        src={save.imageUrl || ""}
                        alt="post"
                        width={1000}
                        height={1000}
                        className="h-full w-full object-cover"
                    />
                </Link>

                <div className="grid-post_user">
                    <div className="flex items-center justify-start gap-2 flex-1">
                        {/* <Image
                            src={profile?.id === id ? profile?.imageUrl : "/assets/icons/profile-placeholder.svg"}
                            alt="creator"
                            className="rounded-full"
                            height={35}
                            width={35}
                        /> */}
                        <p className="line-clamp-1">{save?.caption}</p>
                    </div>
                </div>
            </li>
        ))}
    </ul>

}

export default ContentSaved;
