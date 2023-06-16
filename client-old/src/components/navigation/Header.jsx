import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Box, Avatar, Stack, Badge } from '@mui/material';
import Logo from '../../assets/img/logo.png';
import AvatarMenu from './AvatarMenu';
import LogoutComponent from './LogoutComponent';
import SettingsComponent from './SettingsComponent';
import SearchComponent from './SearchComponent';

const Header = ({ user, token }) => {
	return (
		<Card
			className='my-3 bg-catGrey'
			elevation={4}>
			<Box
				sx={{ p: 2, display: 'flex' }}
				justifyContent={'space-between'}>
				<Stack
					spacing={0.5}
					direction={'row'}>
					<Avatar
						variant='square'
						sx={{ width: '100%', height: 64 }}
						src={Logo}
					/>
				</Stack>
				<Stack
					className='my-auto'
					direction={'row'}
					spacing={0.5}
					justifyContent={'flex-end'}>
					<Badge
						color='secondary'
						badgeContent='↓'
						anchorOrigin={{
							vertical: 'bottom',
							horizontal: 'right',
						}}>
						<AvatarMenu user={user} />
					</Badge>
				</Stack>
			</Box>
		</Card>
	);
};

export default Header;
