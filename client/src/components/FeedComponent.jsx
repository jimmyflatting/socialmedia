import React, { useState, useEffect } from 'react';
import NewPost from './NewPost';
import {
	Card,
	Box,
	Avatar,
	Stack,
	Typography,
	IconButton,
	Divider,
} from '@mui/material';
import { LocationOn, Edit } from '@mui/icons-material';
import { grey } from '@mui/material/colors';
import placeholder from '../img/feed.png';

const FeedComponent = () => {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:3001/posts/');
				const data = await response.json();
				console.log(data);

				// Perform any necessary data manipulation here before updating the state
				setPosts(data);

				// now for each post find Author
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
			{/* POST 1 */}
			{posts.map((post, index) => (
				<Card
					className='mb-3'
					elevation={4}
					key={index}>
					<Box sx={{ p: 2, display: 'flex' }}>
						<Avatar
							variant='rounded'
							width='64px'
							sx={{ width: 64, height: 64 }}
							src='avatar1.jpg'
						/>
						<Stack spacing={0.5}>
							<Typography
								sx={{ px: 1 }}
								fontWeight={700}>
								Michael Scott
							</Typography>
							<Typography
								className='profileHandle'
								sx={{ px: 1, color: grey[500] }}
								fontSize={14}
								fontWeight={200}>
								@michaelscott
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
							{post.body}
						</Typography>
						{post.postPicture ? (
							<img
								src={placeholder}
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
