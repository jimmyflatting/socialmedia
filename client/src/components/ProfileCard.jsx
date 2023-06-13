import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Avatar, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';

const ProfileCard = ({ user }) => {
	const [isFriend, setIsFriend] = useState(null);

	const [userData, setUserData] = useState(null);

	const getToken = () => {
		const token = localStorage.getItem('token');
		return token;
	};

	const getEmail = () => {
		const email = localStorage.getItem('email');
		return email;
	};

	const handleRemoveFriend = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`http://localhost:3001/users/profile/update/${userData.userHandle}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${getToken()}`,
					},
					body: JSON.stringify({
						action: 'remove',
						userId: user.userHandle,
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

	const handleAddFriend = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`http://localhost:3001/users/profile/update/${userData.userHandle}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${getToken()}`,
					},
					body: JSON.stringify({
						action: 'add',
						userId: user.userHandle,
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
				console.log(data);
				setUserData(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchUserData();
	}, []);

	useEffect(() => {
		const friendChecker = async () => {
			if (userData && userData.following.includes(user.userHandle)) {
				setIsFriend(true);
			} else {
				setIsFriend(false);
			}
		};

		friendChecker();
	}, [userData, user.userHandle]);

	return (
		<>
			{user !== '' && user.userHandle ? (
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
								onClick={handleAddFriend}
								sx={{ my: 'auto', width: 48, height: 48 }}
							/>
						) : (
							<PersonRemoveAlt1Icon
								onClick={handleRemoveFriend}
								sx={{ my: 'auto', width: 48, height: 48 }}
							/>
						)}
					</Stack>
				</Box>
			) : (
				''
			)}
		</>
	);
};

export default ProfileCard;
