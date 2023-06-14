import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Card, Box, Typography, Avatar, Stack } from '@mui/material';
import { grey } from '@mui/material/colors';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';

const FriendList = ({ user, token }) => {
	const [followingProfiles, setFollowingProfiles] = useState([]);
	const [isFriend, setIsFriend] = useState(null);

	const fetchUserProfile = async (userHandle) => {
		try {
			const response = await fetch(
				`http://localhost:3001/users/${userHandle}`
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
				if (user && user.following.length > 0) {
					const profiles = await Promise.all(
						user.following.map((userHandle) =>
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

	const handleRemoveFriend = async (e, index) => {
		e.preventDefault();
		const profile = followingProfiles[index];
		try {
			const response = await fetch(
				`http://localhost:3001/profile/friends/${user.userHandle}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						action: 'remove',
						userId: profile.userHandle,
					}),
				}
			);
			if (response.ok) {
				setIsFriend(false);
			} else {
				console.log('Failed to remove friend');
			}
		} catch (error) {
			console.log(error);
		}
	};

	const handleAddFriend = async (e, index) => {
		e.preventDefault();
		const profile = followingProfiles[index];
		try {
			const response = await fetch(
				`http://localhost:3001/profile/friends/${user.userHandle}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						action: 'add',
						userId: profile.userHandle,
					}),
				}
			);
			if (response.ok) {
				setIsFriend(true);
			} else {
				console.log('Failed to add friend');
			}
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		const friendChecker = async () => {
			if (
				user &&
				followingProfiles.some((profile) =>
					user.following.includes(profile.userHandle)
				)
			) {
				setIsFriend(true);
			} else {
				setIsFriend(false);
			}
		};

		friendChecker();
	}, [user, followingProfiles]);

	return (
		<>
			<Card
				elevation={4}
				className='bg-catGrey'>
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
							{isFriend === false ? (
								<PersonAddAlt1Icon
									onClick={(e) => handleAddFriend(e, index)}
									sx={{ my: 'auto', width: 48, height: 48 }}
								/>
							) : (
								<PersonRemoveAlt1Icon
									onClick={(e) =>
										handleRemoveFriend(e, index)
									}
									sx={{ my: 'auto', width: 48, height: 48 }}
								/>
							)}
						</Stack>
					</Box>
				))}
			</Card>
		</>
	);
};

export default FriendList;
