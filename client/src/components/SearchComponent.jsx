import React, { useState, useEffect } from 'react';
import { Card, Box, Stack, Button, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import Modal from '@mui/material/Modal';
import ProfileCard from './ProfileCard';

const SettingsComponent = () => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [userHandle, setUserHandle] = useState('');
	const [users, setUser] = useState([]);

	const handleInputChangeUserHandle = (e) => {
		setUserHandle(e.target.value);
	};

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (userHandle !== '') {
					const response = await fetch(
						`http://localhost:3001/users/profile/${userHandle}`
					);
					const userData = await response.json();
					console.log(userData);
					setUser(userData);
				} else {
					setUser([]);
				}
			} catch (error) {
				console.log(error);
			}
		};

		const delayDebounceFn = setTimeout(() => {
			fetchData();
		}, 500);

		return () => clearTimeout(delayDebounceFn);
	}, [userHandle]);

	return (
		<>
			<button
				href='#'
				className='nav-link'>
				<SearchIcon onClick={handleOpen} />
			</button>

			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby='modal-modal-title'
				aria-describedby='modal-modal-description'>
				<Card
					className='col-12 col-md-8 col-lg-6'
					elevation={4}
					sx={{
						zIndex: 10,
						height: 'auto',
						mx: 'auto',
					}}>
					<Box sx={{ p: 2, my: 'auto' }}>
						{/* TITLE & X-BUTTON */}
						<Stack
							direction='row'
							alignItems='center'
							justifyContent='space-between'
							sx={{
								bgcolor: 'background.',
								display: 'flex',
							}}>
							<Typography
								fontWeight={700}
								sx={{ mb: 2 }}>
								Find user
							</Typography>
							<ClearIcon
								sx={{ mb: 2, cursor: 'pointer' }}
								onClick={handleClose}
							/>
						</Stack>

						{/* FORM FIELDS */}
						<Stack
							direction='row'
							alignItems='center'
							justifyContent='space-between'
							sx={{
								bgcolor: 'background.',
								display: 'flex',
							}}>
							<div className='w-100'>
								<input
									type='text'
									className='form-control'
									placeholder='@Userhandle'
									value={userHandle}
									onChange={handleInputChangeUserHandle}
								/>
							</div>
						</Stack>
					</Box>
					<ProfileCard user={users} />
				</Card>
			</Modal>
		</>
	);
};

export default SettingsComponent;
