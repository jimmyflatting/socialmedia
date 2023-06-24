import React, { useEffect, useState } from "react";
import Header from "../widgets/Header";
import CreatePost from "../components/feed/CreatePost";
import SinglePost from "../components/feed/SinglePost";
import { config } from "../utils/config";
const apiUrl = config.API_BASE_URL;

const Feed = () => {
  const [posts, setPosts] = useState([null]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`${apiUrl}post/`, {
          credentials: "include",
        });
        const res = await response.json();
        console.log(res);
        setPosts(res);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPosts();
  }, [setPosts]);
  return (
    <>
      <Header />
      <div className="container mx-auto">
        <CreatePost />
        <div className="flex-none md:flex-row">
          <div className="flex-1">
            {[...posts].reverse().map((post, index) => (
              <SinglePost key={index} {...post} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Feed;
