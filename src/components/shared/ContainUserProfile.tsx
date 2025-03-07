'use client'
import Link from "next/link";
import { Button } from "../ui";
import useGetUser from "@/hook/queries/users/useGetUsers";
import Image from "next/image";

const ContainUserProfile = ({ id }: { id: string }) => {
    const { data: user } = useGetUser();
    if (!user) return null;

    return (
        <div className="flex justify-center gap-4">
            {String(user?.id) === id ? (
                <Link
                    href={`/auth/edit-profile/${id}`}
                    className="h-12 bg-dark-4 px-5 text-light-1 flex-center gap-2 rounded-lg"
                >
                    <Image
                        src="/assets/icons/edit.svg"
                        alt="edit"
                        width={20}
                        height={20}
                    />
                    <p className="flex whitespace-nowrap small-medium">Edit Profile</p>
                </Link>
            ) : (
                <div>
                    <Button type="button" className="shad-button_primary px-8 bg-primary-500">Follow</Button>
                </div>
            )}
        </div>
    );
};

export default ContainUserProfile;
