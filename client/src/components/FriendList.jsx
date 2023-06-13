import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Box, Typography, Avatar, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';

const FriendList = () => {
	const [userData, setUserData] = useState(null);
	const [followingProfiles, setFollowingProfiles] = useState([]);

	const getToken = () => {
		const token = localStorage.getItem('token');
		return token;
	};

	const getEmail = () => {
		const email = localStorage.getItem('email');
		return email;
	};

	const fetchUserProfile = async (userHandle) => {
		try {
			const response = await fetch(
				`http://localhost:3001/users/profile/${userHandle}`
			);
			const data = await response.json();
			return data;
		} catch (error) {
			console.log(error);
			return null;
		}
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch(
					'http://localhost:3001/users/profile/',
					{
						headers: {
							Authorization: `Bearer ${getToken()}`,
							Profile: `${getEmail()}`,
						},
					}
				);
				const data = await response.json();
				setUserData(data);

				// Fetch profiles of following users
				if (data && data.following.length > 0) {
					const profiles = await Promise.all(
						data.following.map((userHandle) =>
							fetchUserProfile(userHandle)
						)
					);
					setFollowingProfiles(
						profiles.filter((profile) => profile !== null)
					);
				}
			} catch (error) {
				console.log(error);
			}
		};

		fetchUserData();
	}, []);

	return (
		<>
			<Card elevation={4}>
				<Box sx={{ p: 2, display: 'flex' }}>
					<Typography fontWeight={700}>Following</Typography>
				</Box>
				{/* FRIENDS */}
				{followingProfiles.map((user, index) => (
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
							<GroupRemoveIcon />
						</Stack>
					</Box>
				))}
			</Card>
		</>
	);
};

export default FriendList;
