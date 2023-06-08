import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Card, Stack, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import AttachFileIcon from '@mui/icons-material/AttachFile';

const NewPost = () => {
	const [message, setMessage] = useState('');
	const [file, setFile] = useState(null);
	const [fileName, setFileName] = useState('');

	const handleInputChange = (e) => {
		setMessage(e.target.value);
	};

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
		setFileName(selectedFile ? selectedFile.name : '');
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const fetchData = async () => {
			try {
				const response = await fetch('http://localhost:3001/posts/', {
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
			author: 'John Doe',
			body: message,
			postPicture: file,
		};

		console.log('Sending data:', postData);

		fetchData(); // Call the fetchData function to make the POST request

		// Reset the form
		setMessage('');
		setFile(null);
		setFileName('');
	};

	return (
		<form onSubmit={handleSubmit}>
			<Card
				elevation={4}
				className='mb-3'>
				<Box sx={{ p: 2 }}>
					<TextField
						id='outlined-multiline-static'
						label="What's on your mind?"
						multiline
						rows={6}
						value={message}
						onChange={handleInputChange}
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
								/>
							</Button>
							{fileName && <span>{fileName}</span>}
						</Stack>
						<Button
							variant='outlined'
							type='submit'>
							Create post <SendIcon sx={{ ml: 1 }} />
						</Button>
					</Stack>
				</Box>
			</Card>
		</form>
	);
};

export default NewPost;
