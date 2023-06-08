import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';

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
					<Navbar.Toggle aria-controls='basic-navbar-nav' />
					<Navbar.Collapse
						id='basic-navbar-nav'
						className='justify-content-end'>
						<Nav className=''>
							<Link
								href='#'
								className='nav-link'>
								123
							</Link>
							<Link
								href='#'
								className='nav-link'>
								123
							</Link>
							<Link
								href='#'
								className='nav-link'>
								123
							</Link>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
};

export default Header;
