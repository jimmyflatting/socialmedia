import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Avatar, Stack, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import GroupAddIcon from '@mui/icons-material/GroupAdd';

const ProfileCard = ({ user }) => {
	return (
		<>
			{user != '' && user.userHandle ? (
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
						<GroupAddIcon />
					</Stack>
				</Box>
			) : (
				''
			)}
		</>
	);
};

export default ProfileCard;
