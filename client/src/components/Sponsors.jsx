import React from 'react';
import { Card, Box } from '@mui/material';
import sponsorImg from '../img/feed.png';

const Sponsors = () => {
	return (
		<>
			<Card>
				<Box sx={{ p: 2, display: 'flex' }}>
					<img
						src={sponsorImg}
						className='img-fluid'
						alt='sponsor'></img>
				</Box>
			</Card>
		</>
	);
};

export default Sponsors;
