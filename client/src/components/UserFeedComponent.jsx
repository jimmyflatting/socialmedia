import React, { useState, useEffect } from 'react';
import NewPost from './NewPost';
import { Card, Box, Avatar, Stack, Typography, Divider } from '@mui/material';
import { grey } from '@mui/material/colors';

const UserFeedComponent = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const userHandle = window.location.pathname.split('/').pop();

				const url = `http://localhost:3001/posts/${userHandle}`;
				const response = await fetch(url);
				const postsData = await response.json();
				console.log(postsData);

				setPosts(postsData);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

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
							src=''
						/>
						<Stack spacing={0.5}>
							<Typography
								sx={{ px: 1 }}
								fontWeight={700}>
								{post.author && post.author.firstName
									? `${post.author.firstName} ${post.author.lastName}`
									: ''}
							</Typography>
							<Typography
								className='profileHandle'
								sx={{ px: 1, color: grey[500] }}
								fontSize={14}
								fontWeight={200}>
								{post.authorData && post.authorData.userHandle
									? `@${post.authorData.userHandle}`
									: ''}
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
