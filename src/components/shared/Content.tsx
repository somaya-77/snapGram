'use client'
import { useParams } from 'next/navigation';
import { StatBlockProps } from '@/types';
import { Loader } from '@/components/shared';
import useGetProfile from '@/hook/queries/profile/useGetProfile';
import ContainUserProfile from '@/components/shared/ContainUserProfile';
import Image from 'next/image';

const StatBlock = ({ value, label }: StatBlockProps) => (
    <div className="flex-center gap-2">
        <p className="small-semibold lg:body-bold text-primary-500">{value}</p>
        <p className="small-medium lg:base-medium text-light-2">{label}</p>
    </div>
);

const Content = () => {
    const params = useParams();
    const id = params?.id as string;
    const profileId = new Promise<{ userId: string }>((resolve) => {
        resolve({ userId: id });
    });
    const { data: profile, isLoading } = useGetProfile(profileId);
    return (
        <>
            {isLoading ? <Loader /> : (
                <>
                    <div className="flex xl:flex-row flex-col max-xl:items-center flex-1 gap-7">
                        <Image
                            src={profile?.imageUrl || "/assets/icons/profile-placeholder.svg"}
                            alt="profile"
                            className="rounded-full object-cover object-top" width={200}
                            height={200}
                        />

                        <div className="flex flex-col flex-1 justify-between md:mt-2">
                            <div className="flex flex-col w-full">
                                <h1 className="text-center xl:text-left h3-bold md:h1-semibold w-full">
                                    {profile?.name}
                                </h1>
                                <p className="small-regular md:body-medium text-light-3 text-center xl:text-left">
                                    @{profile?.username}
                                </p>
                            </div>

                            <div className="flex gap-8 mt-10 items-center justify-center xl:justify-start flex-wrap z-20">
                                <StatBlock value={20} label="Followers" />
                                <StatBlock value={20} label="Following" />
                            </div>

                            <p className="small-regular md:body-medium text-light-3 text-center xl:text-left mt-2">
                                {profile?.bio}
                            </p>
                        </div>
                    </div>

                    <ContainUserProfile id={id} />
                </>
            )}
        </>
    )
}

export default Content;