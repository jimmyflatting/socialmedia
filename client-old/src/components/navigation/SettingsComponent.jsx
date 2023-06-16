import React, { useState } from 'react';
import { Card, Box, Stack, Button, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SettingsIcon from '@mui/icons-material/Settings';
import Modal from '@mui/material/Modal';
import { config } from '../../utils/config';
const apiUrl = config.API_BASE_URL;

const SettingsComponent = ({ user, token }) => {
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [userHandle, setUserHandle] = useState('');
	const [password, setPassword] = useState('');
	const [passwordCheck, setPasswordCheck] = useState('');
	const [workplace, setWorkplace] = useState('');
	const [location, setLocation] = useState('');
	const [image, setImage] = useState(null);

	const handleInputChangeWorkplace = (e) => {
		setWorkplace(e.target.value);
	};
	const handleInputChangeLocation = (e) => {
		setLocation(e.target.value);
	};
	const handleInputChangeFirstName = (e) => {
		setFirstName(e.target.value);
	};
	const handleInputChangeLastName = (e) => {
		setLastName(e.target.value);
	};
	const handleInputChangeEmail = (e) => {
		setEmail(e.target.value);
	};
	const handleInputChangeUserHandle = (e) => {
		setUserHandle(e.target.value);
	};
	const handleInputChangePassword = (e) => {
		setPassword(e.target.value);
	};
	const handleInputChangePasswordCheck = (e) => {
		setPasswordCheck(e.target.value);
	};
	const handleFileChange = (e) => {
		const file = e.target.files[0];
		setImage(file);
	};

	const saveSettings = async () => {
		const saveBtn = document.getElementById('saveBtn');

		if (passwordCheck === password) {
			saveBtn.innerHTML = 'Saving...';
			try {
				const formData = new FormData();
				formData.append('firstName', firstName);
				formData.append('lastName', lastName);
				formData.append('email', email);
				formData.append('userHandle', userHandle);
				formData.append('password', password);
				formData.append('workplace', workplace);
				formData.append('location', location);
				formData.append('profileImage', image);

				const response = await fetch(
					`${apiUrl}profile/${user.userHandle}`,
					{
						method: 'PUT',
						headers: {
							Authorization: `Bearer ${token}`,
						},
						body: formData,
					}
				);

				if (!response.ok) {
					throw new Error('Failed to update user profile');
				}

				const data = await response.json();
				console.log(data);
				saveBtn.innerHTML = '✓';
				setOpen(false);
			} catch (error) {
				console.log(error);
				saveBtn.innerHTML = 'Something went wrong...';
			}
		} else {
			saveBtn.innerHTML = 'Passwords do not match...';
			console.log('Passwords do not match');
		}
	};

	return (
		<>
			<button
				href='#'
				className='nav-link'>
				<SettingsIcon onClick={handleOpen} />
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
						{/* SETTINGS & X-BUTTON */}
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
								Settings
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
							<div className='col mb-2'>
								<input
									type='text'
									className='form-control'
									placeholder='First name'
									value={firstName}
									onChange={handleInputChangeFirstName}
								/>
							</div>
							<div className='mx-2'></div>
							<div className='col mb-2'>
								<input
									type='text'
									className='form-control'
									placeholder='Last name'
									value={lastName}
									onChange={handleInputChangeLastName}
								/>
							</div>
						</Stack>
						<Stack
							direction='row'
							alignItems='center'
							justifyContent='space-between'
							sx={{
								bgcolor: 'background.',
								display: 'flex',
							}}>
							<div className='col mb-2'>
								<input
									type='text'
									className='form-control'
									placeholder='Workplace'
									value={workplace}
									onChange={handleInputChangeWorkplace}
								/>
							</div>
							<div className='mx-2'></div>
							<div className='col mb-2'>
								<input
									type='text'
									className='form-control'
									placeholder='Location'
									value={location}
									onChange={handleInputChangeLocation}
								/>
							</div>
						</Stack>
						<Stack
							direction='row'
							alignItems='center'
							justifyContent='space-between'
							sx={{
								bgcolor: 'background.',
								display: 'flex',
							}}>
							<div className='col mb-2'>
								<input
									type='email'
									className='form-control'
									placeholder='Email'
									value={email}
									onChange={handleInputChangeEmail}
								/>
							</div>
							<div className='mx-2'></div>
							<div className='col mb-2'>
								<input
									type='text'
									className='form-control'
									placeholder='Display name'
									value={userHandle}
									onChange={handleInputChangeUserHandle}
								/>
							</div>
						</Stack>
						<Stack
							direction='row'
							alignItems='center'
							justifyContent='space-between'
							sx={{
								bgcolor: 'background.',
								display: 'flex',
							}}>
							<div className='col mb-2'>
								<input
									type='password'
									className='form-control'
									placeholder='Password'
									value={password}
									onChange={handleInputChangePassword}
								/>
							</div>
							<div className='mx-2'></div>
							<div className='col mb-2'>
								<input
									type='password'
									className='form-control'
									placeholder='Password (again)'
									value={passwordCheck}
									onChange={handleInputChangePasswordCheck}
								/>
							</div>
						</Stack>

						{/* IMAGE UPLOADER */}
						<Stack
							direction='row'
							alignItems='center'
							justifyContent='space-between'
							sx={{
								bgcolor: 'background.',
								display: 'flex',
							}}>
							<input
								type='file'
								accept='image/*'
								onChange={handleFileChange}
							/>
						</Stack>

						{/* SAVE BUTTON */}
						<Stack
							direction='row'
							alignItems='center'
							justifyContent='end'
							sx={{
								bgcolor: 'background.',
								display: 'flex',
							}}>
							<Button
								id='saveBtn'
								variant='contained'
								type='submit'
								sx={{ mt: 2, cursor: 'pointer' }}
								onClick={saveSettings}>
								Save
							</Button>
						</Stack>
					</Box>
				</Card>
			</Modal>
		</>
	);
};

export default SettingsComponent;
