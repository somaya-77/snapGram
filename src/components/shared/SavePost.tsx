'use client'

import Loader from './Loader';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import useGetSaves from '@/hook/queries/save/useGetSave';
import usePostSave from '@/hook/queries/save/usePostSave';

type Props = {
    postId: string;
    userId: string;
};
const SavePost = ({ postId, userId }: Props) => {
    const { mutate } = usePostSave();
    const [saved, setSaved] = useState(false);
    const { data, isLoading } = useGetSaves(+postId, +userId);
    const initialSaved = data?.initialSaved ?? false;

    useEffect(() => {
        if (data) {
            setSaved(data.initialLiked);
        }
    }, [data]);


    const handleSave = () => {
        setSaved((prev) => !prev);
        mutate({ postId, userId });
    };

    return (
        <div className="flex gap-2">
            {isLoading ? <Loader /> : <Image
                src={saved || initialSaved ? "/assets/icons/saved.svg" : "/assets/icons/save.svg"}
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

