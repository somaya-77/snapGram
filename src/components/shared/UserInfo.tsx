import PostStats from './PostStats';
import useGetUser from '@/hook/queries/users/useGetUsers';
import { IPost, Tag } from '@/types';
import ControlPost from './ControlPost';

// compare between current user and created post
const UserInfo = ({ post }: { post: IPost }) => {
    const currentUser = useGetUser()

    return (
        <div className="post_details-info">
            <ControlPost post={post} currentUser={currentUser} />

            <hr className="border w-full border-dark-4/80" />

            <div className="flex flex-col flex-1 w-full small-medium lg:base-regular">
                <p>{post.caption}</p>
                <ul className="flex gap-1 mt-2">
                    {post?.tags?.map((tag: Tag) => (
                        <li key={tag.id} className="text-light-3 small-regular">
                            #{tag.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="w-full">
                {currentUser.data.id === post.userId ? '' : <PostStats like={post?.Like} save={post?.Save} postId={post.id} userId={post.userId} />}
            </div>
        </div>
    )
}

export default UserInfo;
