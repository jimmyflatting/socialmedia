import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Box, Avatar, Stack, Typography, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { grey } from '@mui/material/colors';

const ProfileComponent = () => {
	const [userData, setUserData] = useState(null);
	const getToken = () => {
		const token = localStorage.getItem('token');
		return token;
	  };

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch('http://localhost:3001/users/profile', {
					headers: {
						Authorization: `Bearer ${getToken()}`,
					},
				});
				const data = await response.json();
				console.log(data);
				setUserData(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchUserData();
	}, []);

	if (!userData) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Card elevation={4} className='mb-3'>
				<Box sx={{ p: 2, display: 'flex' }}>
					<Link to='/'>
						<Avatar
							variant='rounded'
							width='64px'
							sx={{ width: 64, height: 64 }}
							src={userData.avatar}
						/>
					</Link>
					<Stack spacing={0.5}>
						<Typography sx={{ px: 1 }} fontWeight={700}>
							{userData.name}
						</Typography>
						<Typography
							className='profileHandle'
							sx={{ px: 1, color: grey[500] }}
							fontSize={14}
							fontWeight={200}>
							@{userData.username}
						</Typography>
					</Stack>
				</Box>
				<Divider />
				<Stack
					direction='row'
					alignItems='center'
					justifyContent='space-around'
					sx={{
						px: 2,
						py: 1,
						bgcolor: 'background.default',
					}}>
					<Typography variant='body2' color='text.secondary'>
						<LocationOnIcon sx={{ color: grey[500] }} /> {userData.location}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						<WorkIcon sx={{ color: grey[500] }} /> {userData.company}
					</Typography>
				</Stack>
			</Card>
		</>
	);
};

export default ProfileComponent;
