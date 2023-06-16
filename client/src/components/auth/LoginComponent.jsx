import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Box from '@mui/material/Box';
import { Card, Stack, Button, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { config } from '../../utils/config';
const apiUrl = config.API_BASE_URL;

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
				const response = await fetch(`${apiUrl}auth/login/`, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify({
						email: email,
						password: password,
					}),
					credentials: 'include',
				});
				const data = await response.json();
				console.log(data);
			} catch (error) {
				console.log(error);
			}
		};

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
							<div className='form-row'>
								<div className='col mb-2'>
									<input
										type='text'
										className='form-control'
										placeholder='Email'
										value={email}
										onChange={handleInputChangeEmail}
									/>
								</div>
								<div className='col-12'>
									<input
										type='password'
										className='form-control'
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
