import React from "react";
import { Link } from "react-router-dom";

const SinglePost = ({ ...post }) => {
  if (!post || !post.author) {
    return null;
  }

  return (
    <>
      <div className="card mb-4">
        <div className="container mb-3">
          <div className="row d-flex mt-3">
            <div className="col-12 d-flex align-items-center">
              <Link to={`/${post.author.userHandle}`}>
                <img
                  alt=""
                  className="img-fluid rounded-circle me-3"
                  width="60"
                  src={post.author.profileImg}
                />
              </Link>
              <div className="d-flex flex-column justify-content-center">
                <Link to={`/${post.author.userHandle}`}>
                  <p className="mb-0 pb-0">
                    {post.author.firstName} {post.author.lastName}
                  </p>
                </Link>
                <Link to={`/${post.author.userHandle}`}>
                  <p className="small">@{post.author.userHandle}</p>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="container mb-3">
          <p className={!post.imgSrc ? `content mb-0` : `content`}>
            {post.content}
          </p>
          {post.imgSrc ? (
            <img
              className="rounded-3 img-fluid w-100"
              alt="post"
              src={post.imgSrc}
            />
          ) : null}
        </div>
      </div>
    </>
  );
};

export default SinglePost;
