import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Box, Typography, Avatar, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';

const FriendList = () => {
	const [users, setUsers] = useState([]);

	const getToken = () => {
		const token = localStorage.getItem('token');
		return token;
	};

	const handleRemoveFriend = async (userId) => {
		try {
			await fetch(`http://localhost:3001/users/${userId}/followers`, {
				method: 'PUT',
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
				const response = await fetch('http://localhost:3001/users/');
				const data = await response.json();
				console.log(data);

				setUsers(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<Card elevation={4}>
				<Box sx={{ p: 2, display: 'flex' }}>
					<Typography fontWeight={700}>Following</Typography>
				</Box>
				{/* FRIENDS */}
				{users.map((user, index) => (
					<Box
						sx={{ p: 2, display: 'flex' }}
						justifyContent={'space-between'}
						key={index}>
						<Stack
							spacing={0.5}
							direction={'row'}>
							<Avatar
								variant='rounded'
								width='64px'
								sx={{ width: 64, height: 64 }}
								src={user.profileImg}
							/>
							<Stack spacing={0.5}>
								<Typography
									sx={{ px: 1 }}
									fontWeight={700}>
									<Link to={`/profile/${user.userHandle}`}>
										{user.firstName} {user.lastName}
									</Link>
								</Typography>
								<Typography
									className='profileHandle'
									sx={{ px: 1, color: grey[500] }}
									fontSize={14}
									fontWeight={200}>
									@{user.userHandle}
								</Typography>
							</Stack>
						</Stack>
						<Stack
							direction={'row'}
							spacing={0.5}
							justifyContent={'flex-end'}>
							<GroupRemoveIcon
								onClick={() => handleRemoveFriend(user._id)}
							/>
						</Stack>
					</Box>
				))}
			</Card>
		</>
	);
};

export default FriendList;
