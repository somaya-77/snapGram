import SavePost from "./SavePost";
import LikePost from "./LikePost";

const PostStats = ({ postId, userId, save, like }: any) => {
  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div
      className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <LikePost like={like} postId={postId} userId={userId} />
      <SavePost save={save} postId={postId} userId={userId} />
    </div>
  );
}

export default PostStats;

