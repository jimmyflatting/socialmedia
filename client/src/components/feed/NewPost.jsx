import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Card, Stack, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const NewPost = () => {
	const getToken = () => {
		const token = localStorage.getItem('token');
		return token;
	};

	const [message, setMessage] = useState('');
	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState('');
	const [rows, setRows] = useState(1);
	const textArea = document.getElementById('outlined-multiline-static');

	const handleTextFieldFocus = () => {
		setRows(6);
		textArea.classList.remove(`transition-rows-1`);
		textArea.classList.add(`transition-rows-6`);
	};

	const handleTextFieldBlur = () => {
		setRows(1);
		textArea.classList.remove(`transition-rows-6`);
		textArea.classList.add(`transition-rows-1`);
	};

	const handleInputChange = (e) => {
		setMessage(e.target.value);
	};

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
		setFileName(selectedFile ? selectedFile.name : '');
	};

	const getEmail = () => {
		const email = localStorage.getItem('email');
		// console.log(email);
		return email;
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('content', message);
		formData.append('authorId', getEmail());
		formData.append('imgSrc', file);

		try {
			const response = await fetch('http://localhost:3001/posts/create', {
				method: 'POST',
				headers: {
					Authorization: `Bearer ${getToken()}`,
				},
				body: formData,
			});
			console.log('Response status:', response.status);
			const data = await response.text();
			console.log('Response data:', data);
		} catch (error) {
			console.log(error);
		}

		// Reset the form
		setMessage('');
		setFile(null);
		setFileName('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<Card
				elevation={4}
				className='mb-3 bg-catGrey'>
				<Box sx={{ p: 2 }}>
					<TextField
						id='outlined-multiline-static'
						label="What's on your mind?"
						multiline
						rows={rows}
						value={message}
						onChange={handleInputChange}
						onFocus={handleTextFieldFocus}
						onBlur={handleTextFieldBlur}
						variant='standard'
						fullWidth
					/>
					<Stack
						direction='row'
						alignItems='center'
						justifyContent='space-between'
						sx={{ mt: 2, bgcolor: 'background.', display: 'flex' }}>
						<Stack
							direction='row'
							alignItems='center'
							justifyContent='space-between'>
							<Button
								variant='contained'
								component='label'
								sx={{ mr: 2 }}>
								<AttachFileIcon />
								<input
									type='file'
									hidden
									onChange={handleFileChange}
									accept='image/*'
								/>
							</Button>
							{fileName && <span>{fileName}</span>}
						</Stack>
						<Button
							className='color-catRed'
							variant='outlined'
							type='submit'>
							Create post{' '}
							<SendIcon
								className='color-catRed'
								sx={{ ml: 1 }}
							/>
						</Button>
					</Stack>
				</Box>
			</Card>
		</form>
	);
};

export default NewPost;
