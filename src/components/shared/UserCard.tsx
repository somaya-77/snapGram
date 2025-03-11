'use client'
import React from 'react';
import Link from 'next/link';
import { Button } from '../ui';
import Image from 'next/image';
import { IUser } from '@/types';
import { Loader } from 'lucide-react';
import { useGetUser, useAllGetUsers } from '@/hook/queries';

const UserCard = () => {
    const userRegistration = useGetUser()
    const { data, isLoading } = useAllGetUsers()
    return (
        <>
            {isLoading && !data ? (
                <Loader />
            ) : (
                <ul className="user-grid">
                    {data?.map((user: IUser) => {
                        if (userRegistration?.data?.id === user?.id) return;
                        return (
                            <li key={user.id} className="flex-1 min-w-[100px] w-full  ">
                                <Link href={`auth/profile/${user?.id}`} className="user-card">
                                    <Image
                                        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
                                        alt="creator"
                                        className="rounded-full"
                                        width={60}
                                        height={60}
                                    />

                                    <div className="flex-center flex-col gap-1">
                                        <p className="base-medium text-light-1 text-center line-clamp-1">
                                            {user?.name}
                                        </p>
                                        <p className="small-regular text-light-3 text-center line-clamp-1">
                                            @{user?.username}
                                        </p>
                                    </div>

                                    <Button type="button" size="sm" className="shad-button_primary bg-primary-500 px-5">
                                        Follow
                                    </Button>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            )}
        </>
    )
}

export default UserCard;


