import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import SettingsIcon from '@mui/icons-material/Settings';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
	return (
		<header className=''>
			<Navbar expand='lg'>
				<Container>
					<Link
						to='/'
						className='navbar-brand d-flex'>
						<Navbar.Brand className=''>
							<h4 className='m-0'>SocialMedia</h4>
						</Navbar.Brand>
					</Link>
					<Navbar
						id='basic-navbar-nav'
						className='justify-content-end'>
						<Nav className=''>
							<Link
								href='#'
								className='nav-link'>
								<SettingsIcon />
							</Link>
							<Link
								href='#'
								className='nav-link'>
								<LogoutIcon />
							</Link>
						</Nav>
					</Navbar>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
