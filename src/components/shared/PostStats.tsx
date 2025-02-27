import SavePost from "./SavePost";
import LikePost from "./LikePost";

const PostStats = ({ postId, userId }: any) => {
  const containerStyles = location.pathname.startsWith("/profile")
    ? "w-full"
    : "";

  return (
    <div
      className={`flex justify-between items-center z-20 ${containerStyles}`}>
      <LikePost postId={postId} userId={userId} />
      <SavePost postId={postId} userId={userId} />
    </div>
  );
}

export default PostStats;

