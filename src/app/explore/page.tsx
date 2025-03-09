'use client'
import AuthLayout from '@/components/AuthLayout';
import { Loader, GridPostList, Search } from '@/components/shared';
import React, { useState } from 'react'

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <AuthLayout>
      <div className="explore-container">
        <div className="explore-inner_container">
          <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
          <Search setSearchQuery={setSearchQuery} />
        </div>

        <div className="w-full max-w-5xl mt-16 mb-7">
          <h3 className="body-bold md:h3-bold">Popular Today</h3>
        </div>

        <div className="flex flex-wrap gap-9 w-full max-w-5xl">
          <GridPostList searchQuery={searchQuery} />
          <p className="text-light-4 mt-10 text-center w-full">End of posts</p>
        </div>

        {/* {!searchQuery && (
          <div className="mt-10">
            <Loader />
          </div>
        )} */}
      </div>
    </AuthLayout>
  );
}

export default Explore;
