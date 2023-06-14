import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Box, Avatar, Stack, Typography, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { grey } from '@mui/material/colors';

const UserProfileComponent = () => {
	const [userData, setProfile] = useState([]);

	useEffect(() => {
		const fetchData = async () => {
			const userHandle = window.location.pathname.split('/').pop();

			try {
				const url = `http://localhost:3001/users/profile/${userHandle}`;
				const response = await fetch(url);
				const userData = await response.json();
				setProfile(userData);
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	}, []);

	if (!userData) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Card
				elevation={4}
				className='mb-3 bg-catGrey'>
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
						<Typography
							sx={{ px: 1 }}
							fontWeight={700}>
							<Link to={`/profile/${userData.userHandle}`}>
								{userData.firstName} {userData.lastName}
							</Link>
						</Typography>
						<Typography
							className='profileHandle'
							sx={{ px: 1, color: grey[500] }}
							fontSize={14}
							fontWeight={200}>
							@{userData.userHandle}
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
					<Typography
						variant='body2'
						color='text.secondary'>
						<LocationOnIcon sx={{ color: grey[500] }} />{' '}
						{userData.userLocation}
					</Typography>
					<Typography
						variant='body2'
						color='text.secondary'>
						<WorkIcon sx={{ color: grey[500] }} />{' '}
						{userData.userCompany}
					</Typography>
				</Stack>
			</Card>
		</>
	);
};

export default UserProfileComponent;
