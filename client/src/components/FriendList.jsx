import React, { useEffect, useState } from 'react';
import { Card, Box, Typography, Avatar, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';

const FriendList = () => {
	const [users, setUsers] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:3001/users/');
				const data = await response.json();
				console.log(data);

				// Perform any necessary data manipulation here before updating the state
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
					<Typography fontWeight={700}>Friend list</Typography>
				</Box>
				{/* FRIEND ONE */}
				{users.map((user, index) => (
					<Box
						sx={{ p: 2, display: 'flex' }}
						key={index}>
						<Avatar
							variant='rounded'
							width='64px'
							sx={{ width: 64, height: 64 }}
							src={
								user.userPicture
									? user.userPicture
									: 'avatar1.jpg'
							}
						/>
						<Stack spacing={0.5}>
							<Typography
								sx={{ px: 1 }}
								fontWeight={700}>
								{user.firstName} {user.lastName}
							</Typography>
							<Typography
								className='profileHandle'
								sx={{ px: 1, color: grey[500] }}
								fontSize={14}
								fontWeight={200}>
								@
								{user.userHandle
									? user.userHandle
									: user.firstName}
							</Typography>
						</Stack>
						<GroupAddIcon sx={{ width: 30, height: 30 }} />
					</Box>
				))}
			</Card>
		</>
	);
};

export default FriendList;
