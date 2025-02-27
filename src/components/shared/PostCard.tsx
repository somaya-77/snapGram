'use client'
import Link from 'next/link';
import Loader from './Loader';
import Image from 'next/image';
import { IPost } from '@/src/types';
import PostStats from './PostStats';
import { multiFormatDateString } from '@/src/lib/utils';
import useGetUser from '@/src/hook/queries/users/useGetUsers';
import useGetPosts from '@/src/hook/queries/posts/useGetPosts';

const PostCard = () => { // TODO
  const { data, isLoading } = useGetPosts();
  const user = useGetUser()
  console.log("object", data)
  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <ul className="flex flex-col flex-1 gap-9 w-full">
          {data?.map((post: IPost) => (
            <li key={post.id} className="flex justify-center w-full">
              <div className="post-card">
                <div className='flex-between'>
                  <div className='flex items-center gap-3'>
                    <Link href={`/auth/profile/${post?.user.id}`}>
                      <Image
                        src='/assets/icons/profile-placeholder.svg'
                        alt='creator'
                        className='rounded-full w-12 lg:h-12'
                        width={50}
                        height={50}
                      />
                    </Link>

                    <div className='flex flex-col'>
                      <p className='base-medium lg:body-bold text-light-1'>
                        {post?.user?.name ?? "Unknown"}
                      </p>
                      <div className='flex-center gap-2 text-light-3'>
                        <p className='subtle-semibold lg:small-regular'>
                          {multiFormatDateString(post?.createdAt)}
                        </p>
                        <span>-</span>
                        <p className='subtle-semibold lg:small-regular'>
                          {post.location}
                        </p>
                      </div>
                    </div>
                  </div>

                  {user?.data?.id === post?.user?.id && (
                    <Link href={`/edit-post/${post.id}`}>
                      <Image src="/assets/icons/edit.svg" alt="Edit" width={20} height={20} />
                    </Link>
                  )}
                </div>

                <Link href={`/posts/${post.id}`}>
                  <div className='small-medium lg:base-medium py-5'>
                    <p>{post.caption}</p>
                    <ul className='flex gap-1 mt-2'>
                      {Array.isArray(post?.tags) &&
                        post.tags.map((tag) => (
                          <li key={tag.id} className="text-light-3">
                            #{tag.name}
                          </li>
                        ))}
                    </ul>
                  </div>
{/* 
                  {post.imageUrl && (
                    <Image
                      src={post.imageUrl}
                      alt='post image'
                      className='post-card_img'
                      width={60}
                      height={60}
                    />
                  )} */}
                </Link>

                {/* {user?.data?.id === post?.user?.id ? '' : */}
                 <PostStats postId={post?.id} userId={user?.data?.id}/>
              </div>
            </li>
          )
          )}
        </ul>
      )}
    </>
  )
}

export default PostCard;
