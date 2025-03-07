import useLogin from '@/hook/queries/auth/useLogin';
import useLogout from '@/hook/queries/auth/useLogout';
import useGetSaves from '@/hook/queries/save/useGetSave';
import useGetPost from '@/hook/queries/posts/useGetPost';
import usePutPost from '@/hook/queries/posts/usePutPost';
import useGetUser from '@/hook/queries/users/useGetUsers';
import usePostSave from '@/hook/queries/save/usePostSave';
import usePostLike from '@/hook/queries/like/usePostLike';
import useGetLikes from '@/hook/queries/like/useGetLikes';
import useGetPosts from '@/hook/queries/posts/useGetPosts';
import useRegistration from '@/hook/queries/auth/useRegister';
import useCreatePost from '@/hook/queries/posts/useCreatePost';
import useDeletePost from '@/hook/queries/posts/useDeletePost';
import usePutProfile from '@/hook/queries/profile/usePutProfile';
import useAllGetUsers from '@/hook/queries/users/useGetAllUsers';
import useGetAllPosts from '@/hook/queries/users/useGetAllPosts';
import useGetProfile from '@/hook/queries/profile/useGetProfile';
import useSearchPosts from '@/hook/queries/posts/useSearchPosts';
import useGetSavesUser from '@/hook/queries/save/useGetSavesUser';
import useGetLikesUser from '@/hook/queries/like/useGetLikesUser';
import useGetComments from '@/hook/queries/comments/useGetComments';
import useDeleteComment from '@/hook/queries/comments/useDeleteComment';
import useCreateComment from '@/hook/queries/comments/useCreateComment';
import usePutComment from '@/hook/queries/comments/usePutComment';
import useGetComment from '@/hook/queries/comments/useGetComment';

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