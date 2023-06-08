import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Card, Stack, Button, Divider, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { grey, red } from '@mui/material/colors';

const RegisterComponent = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [userHandle, setUserHandle] = useState('');
	const [password, setPassword] = useState('');
	const [passwordCheck, setPasswordCheck] = useState('');

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

	const handleSubmit = async (e) => {
		e.preventDefault();

		const fetchData = async () => {
			if (passwordCheck === password) {
				try {
					const response = await fetch(
						'http://localhost:3001/users/',
						{
							method: 'POST',
							headers: {
								'Content-Type': 'application/json',
							},
							body: JSON.stringify(postData),
						}
					);

					if (!response.ok) {
						throw new Error('Failed to create user');
					}

					const data = await response.json();
					console.log(data);
				} catch (error) {
					console.log(error);
				}
			} else {
				document
					.getElementById('pwerrorspan')
					.classList.remove('d-none');
				console.log('Passwords do not match');
			}
		};

		const postData = {
			firstName: firstName,
			lastName: lastName,
			email: email,
			userHandle: userHandle,
			password: password,
			posts: [],
		};

		try {
			await fetchData(); // Call the fetchData function to make the POST request
		} catch (error) {
			console.log(error);
			// Handle the error here, e.g., display an error message to the user
		}
	};

	return (
		<>
			<form onSubmit={handleSubmit}>
				<Card
					elevation={4}
					className='mb-3'>
					<Box sx={{ p: 2 }}>
						<Stack
							direction='column'
							alignItems='center'
							justifyContent='space-between'
							sx={{
								bgcolor: 'background.',
								display: 'flex',
							}}>
							<Stack
								direction='row'
								alignItems='center'
								justifyContent='space-between'
								sx={{
									bgcolor: 'background.',
									display: 'flex',
								}}>
								<div className='col my-1 mx-1'>
									<input
										className='form-control'
										value={firstName}
										onChange={handleInputChangeFirstName}
										placeholder='First name'
										required
										type='text'
									/>
								</div>
								<div className='col my-1 mx-1'>
									<input
										className='form-control'
										value={lastName}
										onChange={handleInputChangeLastName}
										placeholder='Last name'
										required
										type='text'
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
								<div className='col my-1 mx-1'>
									<input
										className='form-control'
										value={userHandle}
										onChange={handleInputChangeUserHandle}
										placeholder='Display name'
										required
										type='text'
									/>
								</div>
								<div className='col my-1 mx-1'>
									<input
										className='form-control'
										value={email}
										onChange={handleInputChangeEmail}
										placeholder='Email'
										required
										type='Email'
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
								<div className='col my-1 mx-1'>
									<input
										className='form-control'
										value={password}
										onChange={handleInputChangePassword}
										placeholder='Password'
										required
										type='password'
									/>
								</div>
								<div className='col my-1 mx-1'>
									<input
										className='form-control'
										value={passwordCheck}
										onChange={
											handleInputChangePasswordCheck
										}
										placeholder='Password (again)'
										required
										type='password'
									/>
								</div>
							</Stack>

							<Typography
								id='pwerrorspan'
								className='d-none'
								sx={{ color: red[700] }}>
								Passwords does not match
							</Typography>

							<Button
								variant='contained'
								type='submit'
								sx={{ mt: 2, cursor: 'pointer' }}>
								Signup
							</Button>

							<Typography sx={{ color: grey[500], mt: 2 }}>
								Already have an account?{' '}
								<Link to='/login'>Log in</Link>
							</Typography>
						</Stack>
					</Box>
				</Card>
			</form>
		</>
	);
};

export default RegisterComponent;
