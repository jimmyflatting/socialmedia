import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutComponent = () => {
	const handleOpen = () => console.log('Logging out...');
	return (
		<>
			<button
				href='#'
				className='nav-link'>
				<LogoutIcon onClick={handleOpen} />
			</button>
		</>
	);
};

export default LogoutComponent;
