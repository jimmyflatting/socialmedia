import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import LogoutComponent from './LogoutComponent';
import SettingsComponent from './SettingsComponent';

const Header = ({ userHandle }) => {
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
							<SettingsComponent userHandleData={userHandle} />
							<LogoutComponent />
						</Nav>
					</Navbar>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
