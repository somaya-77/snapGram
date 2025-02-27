import React from 'react'

const RelatedPosts = () => {
  return (
    <div className="w-full max-w-5xl">
    <hr className="border w-full border-dark-4/80" />

    <h3 className="body-bold md:h3-bold w-full my-10">
      More Related Posts
    </h3>
    {/* {isUserPostLoading || !relatedPosts ? (
    <Loader />
  ) : (
    <GridPostList posts={relatedPosts} />
  )} */}
  </div>
  )
}

export default RelatedPosts
