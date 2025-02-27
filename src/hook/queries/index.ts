import useLogin from '@/src/hook/queries/auth/useLogin';
import useLogout from '@/src/hook/queries/auth/useLogout';
import useGetSaves from '@/src/hook/queries/save/useGetSave';
import useGetPost from '@/src/hook/queries/posts/useGetPost';
import usePutPost from '@/src/hook/queries/posts/usePutPost';
import useGetUser from '@/src/hook/queries/users/useGetUsers';
import usePostSave from '@/src/hook/queries/save/usePostSave';
import usePostLike from '@/src/hook/queries/like/usePostLike';
import useGetLikes from '@/src/hook/queries/like/useGetLikes';
import useGetPosts from '@/src/hook/queries/posts/useGetPosts';
import useRegistration from '@/src/hook/queries/auth/useRegister';
import useCreatePost from '@/src/hook/queries/posts/useCreatePost';
import useDeletePost from '@/src/hook/queries/posts/useDeletePost';
import usePutProfile from '@/src/hook/queries/profile/usePutProfile';
import useAllGetUsers from '@/src/hook/queries/users/useGetAllUsers';
import useGetAllPosts from '@/src/hook/queries/users/useGetAllPosts';
import useGetProfile from '@/src/hook/queries/profile/useGetProfile';
import useSearchPosts from '@/src/hook/queries/posts/useSearchPosts';
import useGetSavesUser from '@/src/hook/queries/save/useGetSavesUser';
import useGetLikesUser from '@/src/hook/queries/like/useGetLikesUser';
import useGetComments from '@/src/hook/queries/comments/useGetComments';
import useDeleteComment from '@/src/hook/queries/comments/useDeleteComment';
import useCreateComment from '@/src/hook/queries/comments/useCreateComment';
import usePutComment from '@/src/hook/queries/comments/usePutComment';
import useGetComment from '@/src/hook/queries/comments/useGetComment';

export {
    // profile
    useGetProfile, usePutProfile,
    // auth
    useLogin, useRegistration, useLogout,
    // save
    useGetSaves, useGetSavesUser, usePostSave,
    // like
    useGetLikes, useGetLikesUser, usePostLike,
    // comments
    useCreateComment, useGetComments, useDeleteComment,usePutComment,useGetComment,
    // user
    useGetAllPosts, useAllGetUsers, useGetUser,
    // posts
    useCreatePost, useDeletePost, useGetPost, useGetPosts, usePutPost, useSearchPosts,
}