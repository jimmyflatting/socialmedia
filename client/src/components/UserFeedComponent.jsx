import React, { useState, useEffect } from 'react';
import NewPost from './NewPost';
import { Card, Box, Avatar, Stack, Typography, Divider } from '@mui/material';
import { grey } from '@mui/material/colors';
import { useParams } from 'react-router-dom';

const UserFeedComponent = () => {
	const [posts, setPosts] = useState([]);

	const { userHandle } = useParams();

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userHandle = window.location.pathname.split('/').pop();
				const url = `http://localhost:3001/users/profile/${userHandle}`;
				const response = await fetch(url);
				const userData = await response.json();
				const postsData = userData.posts;
				console.log(postsData);

				const fetchPost = async (postId) => {
					const postUrl = `http://localhost:3001/posts/${postId}`;
					const postResponse = await fetch(postUrl);
					const postData = await postResponse.json();
					console.log(postData);
					return postData;
				};

				const fetchAllPosts = async () => {
					const fetchedPosts = await Promise.all(
						postsData.map((postId) => fetchPost(postId))
					);
					setPosts(fetchedPosts);
				};

				fetchAllPosts();
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, [userHandle]);

	return (
		<>
			{/* NEW POST */}
			<NewPost />
			{/* POSTS LOOP */}
			{[...posts].reverse().map((post, index) => (
				<Card
					className='mb-3'
					elevation={4}
					key={index}>
					<Box sx={{ p: 2, display: 'flex' }}>
						<Avatar
							variant='rounded'
							width='64px'
							sx={{ width: 64, height: 64 }}
							src={post.profileImage}
						/>
						<Stack spacing={0.5}>
							<Typography
								sx={{ px: 1 }}
								fontWeight={700}>
								{`${post.firstName} ${post.lastName}`}
							</Typography>
							<Typography
								className='profileHandle'
								sx={{ px: 1, color: grey[500] }}
								fontSize={14}
								fontWeight={200}>
								{`@${post.userHandle}`}
							</Typography>
						</Stack>
					</Box>
					<Divider />
					<Stack
						direction='column'
						alignItems=''
						justifyContent='space-between'
						sx={{ px: 2, py: 1, bgcolor: 'background.' }}>
						<Typography
							variant='body2'
							color='text.primary'>
							{post.content}
						</Typography>
						{post.imgSrc ? (
							<img
								src={post.imgSrc}
								alt='post'
								className='img-fluid my-4'
							/>
						) : null}
					</Stack>
				</Card>
			))}
		</>
	);
};

export default UserFeedComponent;
