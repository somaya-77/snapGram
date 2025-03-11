// import Loader from "./Loader";
// import GridPostList from "./GridPostList";
// import { useGetPosts } from "@/hook/queries";


const RelatedPosts = () => {
  // const { data, isLoading } = useGetPosts();
  return (
    <div className="w-full max-w-5xl">
      <hr className="border w-full border-dark-4/80" />

      <h3 className="body-bold md:h3-bold w-full my-10">
        More Related Posts
      </h3>
      {/* {isLoading ? <Loader /> : data.map(el => (
        <GridPostList key={el.id} posts={data} />
      ))} */}


    </div>
  )
}

export default RelatedPosts
