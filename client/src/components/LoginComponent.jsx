import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Card, Stack, Button, Divider, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { grey } from '@mui/material/colors';

const LoginComponent = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleInputChangeEmail = (e) => {
		setEmail(e.target.value);
	};
	const handleInputChangePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:3001/login/', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(postData),
				});
				const data = await response.json();
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		};

		const postData = {
			email: email,
			password: password,
		};

		console.log('Loggin in:', postData);

		fetchData();
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
							<div class='form-row'>
								<div class='col mb-2'>
									<input
										type='text'
										class='form-control'
										placeholder='Email'
										value={email}
										onChange={handleInputChangeEmail}
									/>
								</div>
								<div class='col'>
									<input
										type='password'
										class='form-control'
										placeholder='Password'
										value={password}
										onChange={handleInputChangePassword}
									/>
								</div>
							</div>
							<Button
								variant='contained'
								type='submit'
								sx={{ mt: 2, cursor: 'pointer' }}>
								Login
							</Button>
							<Typography sx={{ color: grey[500], mt: 2 }}>
								Don't have an account?{' '}
								<Link to='/signup'>Sign up</Link>
							</Typography>
						</Stack>
					</Box>
				</Card>
			</form>
		</>
	);
};

export default LoginComponent;
