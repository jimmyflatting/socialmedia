import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Box, Avatar, Stack, Typography, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { grey } from '@mui/material/colors';

const ProfileComponent = ({ user }) => {
	return (
		<>
			<Card
				elevation={4}
				className='mb-3'>
				<Box sx={{ p: 2, display: 'flex' }}>
					<Link to={`/profile/${user.userHandle}`}>
						<Avatar
							variant='rounded'
							width='64px'
							sx={{ width: 64, height: 64 }}
							src={user.profileImg}
						/>
					</Link>
					<Stack spacing={0.5}>
						<Link to={`/profile/${user.userHandle}`}>
							<Typography
								sx={{ px: 1 }}
								fontWeight={700}>
								{user.firstName} {user.lastName}
							</Typography>
						</Link>
						<Typography
							className='profileHandle'
							sx={{ px: 1, color: grey[500] }}
							fontSize={14}
							fontWeight={200}>
							@{user.userHandle}
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
						{user.location}
					</Typography>
					<Typography
						variant='body2'
						color='text.secondary'>
						<WorkIcon sx={{ color: grey[500] }} /> {user.workplace}
					</Typography>
				</Stack>
			</Card>
		</>
	);
};

export default ProfileComponent;
