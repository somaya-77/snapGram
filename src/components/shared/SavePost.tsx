'use client'
import Loader from './Loader';
import Image from 'next/image';
import usePostSave from '@/hook/queries/save/usePostSave';
import { Save } from '@/types';
import { useGetUser } from '@/hook/queries';

type Props = {
    postId: string;
    userId: string;
    save: Save[];
};
const SavePost = ({ postId, userId, save }: Props) => {
    const { mutate,isPending } = usePostSave();
    const registration = useGetUser()
    const userIds = save?.map((el) => el.userId) || []; 
    const isSaved = userIds.includes(registration?.data.id); 

    const handleSave = () => {
        mutate({ postId, userId });
    };

    return (
        <div className="flex gap-2">
            {isPending ? <Loader /> : <Image
                src={isSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
                alt="share"
                width={20}
                height={20}
                className="cursor-pointer"
                onClick={handleSave}
            />}
        </div>
    )
}

export default SavePost;

