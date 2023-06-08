import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Box, Avatar, Stack, Typography, Divider } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import { grey } from '@mui/material/colors';

const ProfileComponent = () => {
	return (
		<>
			<Card elevation={4}>
				<Box sx={{ p: 2, display: 'flex' }}>
					<Link to='/'>
						<Avatar
							variant='rounded'
							width='64px'
							sx={{ width: 64, height: 64 }}
							src='avatar1.jpg'
						/>
					</Link>
					<Stack spacing={0.5}>
						<Typography
							sx={{ px: 1 }}
							fontWeight={700}>
							Michael Scott
						</Typography>
						<Typography
							className='profileHandle'
							sx={{ px: 1, color: grey[500] }}
							fontSize={14}
							fontWeight={200}>
							@michaelscott
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
						<LocationOnIcon sx={{ color: grey[500] }} /> Göteborg,
						Swe
					</Typography>
					<Typography
						variant='body2'
						color='text.secondary'>
						<WorkIcon sx={{ color: grey[500] }} /> Facebook
					</Typography>
				</Stack>
			</Card>
		</>
	);
};

export default ProfileComponent;
