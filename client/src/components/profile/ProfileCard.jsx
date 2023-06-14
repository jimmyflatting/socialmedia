import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Box, Avatar, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import PersonRemoveAlt1Icon from '@mui/icons-material/PersonRemoveAlt1';
import { config } from '../../utils/config';
const apiUrl = config.API_BASE_URL;

const ProfileCard = ({ user, token, results }) => {
	const [isFriend, setIsFriend] = useState(null);

	const handleRemoveFriend = async (e) => {
		e.preventDefault();
		try {
			const response = await fetch(
				`${apiUrl}profile/friends/${user.userHandle}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						action: 'remove',
						userId: results.userHandle,
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
				`${apiUrl}profile/friends/${user.userHandle}`,
				{
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({
						action: 'add',
						userId: results.userHandle,
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
			if (user && user.following.includes(results.userHandle)) {
				setIsFriend(true);
			} else {
				setIsFriend(false);
			}
		};

		friendChecker();
	}, [user, results.userHandle]);

	return (
		<>
			{user !== '' && results.userHandle ? (
				<Box
					className='bg-catGrey'
					sx={{ p: 2, display: 'flex' }}
					justifyContent={'space-between'}>
					<Stack
						spacing={0.5}
						direction={'row'}>
						<Avatar
							variant='rounded'
							width='64px'
							sx={{ width: 64, height: 64 }}
							src={results.profileImg}
						/>
						<Stack spacing={0.5}>
							<Typography
								sx={{ px: 1 }}
								fontWeight={700}>
								<Link to={`/profile/${results.userHandle}`}>
									{results.firstName} {results.lastName}
								</Link>
							</Typography>
							<Typography
								className='profileHandle'
								sx={{ px: 1, color: grey[500] }}
								fontSize={14}
								fontWeight={200}>
								@{results.userHandle}
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
