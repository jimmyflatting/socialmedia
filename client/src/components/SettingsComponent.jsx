import React from 'react';
import { Card, Box, Stack, Button, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SettingsIcon from '@mui/icons-material/Settings';
import Modal from '@mui/material/Modal';

const SettingsComponent = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
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
								/>
							</div>
							<div className='mx-2'></div>
							<div className='col mb-2'>
								<input
									type='text'
									className='form-control'
									placeholder='Last name'
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
								/>
							</div>
							<div className='mx-2'></div>
							<div className='col mb-2'>
								<input
									type='text'
									className='form-control'
									placeholder='Username'
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
								/>
							</div>
							<div className='mx-2'></div>
							<div className='col mb-2'>
								<input
									type='password'
									className='form-control'
									placeholder='Password (again)'
								/>
							</div>
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
								variant='contained'
								type='submit'
								sx={{ mt: 2, cursor: 'pointer' }}>
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
