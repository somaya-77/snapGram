import AuthLayout from "../components/AuthLayout";
import { PostCard, UserCard } from "../components/shared";

const Home = () => {  
  return (
    <AuthLayout>
      <div className="flex flex-1">

        <div className="home-container">
          <div className="home-posts">
            <h2 className="h3-bold md:h2-bold text-left w-full">
              Home Feed
            </h2>
            <PostCard />
          </div>
        </div>

        <div className="home-creators">
          <h3 className="h3-bold text-light-1">Top Creators</h3>
          <UserCard />
        </div>

      </div>
    </AuthLayout>
  )
}

export default Home;
