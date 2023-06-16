import React from 'react';
import LogoutIcon from '@mui/icons-material/Logout';

const LogoutComponent = () => {
	const handleLogout = () => {
		// clear cookie
		document.cookie =
			'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

		// redirect to login
		window.location.href = '/';
	};
	return (
		<>
			<button
				href='#'
				className='nav-link'>
				<LogoutIcon onClick={handleLogout} />
			</button>
		</>
	);
};

export default LogoutComponent;
