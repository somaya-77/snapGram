import SavePost from "./SavePost";
import LikePost from "./LikePost";

const PostStats = ({ postId, userId, save, like,comment }: any) => {
  console.log(comment)
  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div
      className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <LikePost like={like} postId={postId} userId={userId} />
      <p className='subtle-semibold lg:small-regular text-light-3'>{comment.length > 1 ? `${comment.length > 1 ? `${comment.length} Comments` : "One Comment"}` : "No Comment Yet!" }</p>
      <SavePost save={save} postId={postId} userId={userId} />
    </div>
  );
}

export default PostStats;

