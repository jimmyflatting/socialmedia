import React from "react";
import { Link } from "react-router-dom";

const SinglePost = ({ ...post }) => {
	if (!post || !post.author) {
		return null;
	}

	return (
		<>
			<div className="flex flex-row">
				<div className="w-50">
					<div className="flex">
						<img
							className="object-scale-down h-48 w-48"
							src={
								post
									.author
									.profileImg
							}
						></img>
						<p>
							{
								post
									.author
									.firstName
							}{" "}
							{
								post
									.author
									.lastName
							}
						</p>
					</div>
					<div className="content">
						<div>
							{
								post.content
							}
						</div>
						<div>
							<img
								src={
									post.imgSrc
								}
							></img>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default SinglePost;
