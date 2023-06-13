import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import NewPost from './NewPost';
import { Card, Box, Avatar, Stack, Typography, Divider } from '@mui/material';
import { grey } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';

const FeedComponent = () => {
	const [posts, setPosts] = useState([]);

	const getToken = () => {
		const token = localStorage.getItem('token');
		return token;
	};

	const handleDelete = async (postId) => {
		try {
			await fetch(`http://localhost:3001/posts/${postId}`, {
				method: 'DELETE',
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
			});
			// console.log('Response status:', response.status);
			// const data = await response.text();
			// console.log('Response data:', data);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:3001/posts/');
				const postsData = await response.json();
				//console.log(postsData);

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
					<Box
						sx={{ p: 2, display: 'flex' }}
						justifyContent={'space-between'}>
						<Stack
							spacing={0.5}
							direction={'row'}>
							<Avatar
								variant='rounded'
								width='64px'
								sx={{ width: 64, height: 64 }}
								src={post.author.profileImg}
							/>
							<Stack spacing={0.5}>
								<Typography
									sx={{ px: 1 }}
									fontWeight={700}>
									<Link
										to={`/profile/${post.author.userHandle}`}>
										{post.author && post.author.firstName
											? `${post.author.firstName} ${post.author.lastName}`
											: ''}
									</Link>
								</Typography>
								<Typography
									className='profileHandle'
									sx={{ px: 1, color: grey[500] }}
									fontSize={14}
									fontWeight={200}>
									{post.author && post.author.firstName
										? `@${post.author.userHandle}`
										: ''}
								</Typography>
							</Stack>
						</Stack>
						<Stack
							direction={'row'}
							spacing={0.5}
							justifyContent={'flex-end'}>
							<DeleteIcon
								onClick={() => handleDelete(post._id)}
							/>
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
						{post.imgSrc && post.imgSrc !== 'null' ? (
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

export default FeedComponent;
