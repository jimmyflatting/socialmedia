import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/auth/loginForm';
import Signup from '../components/auth/signupForm';

const Home = () => {
	const [formSelect, setForm] = useState(true);

	const handleClick = () => {
		setForm(!formSelect);
	};

	return (
		<>
			<div className='container mx-auto'>
				<div className='flex-none md:flex-row'>
					<div className='flex-1'>
						<img
							src='https://static.xx.fbcdn.net/rsrc.php/y8/r/dF5SId3UHWd.svg'
							alt='logo'
						/>
						<h2 className='text-5xl'>
							Facebook helps you connect and share with the people
							in your life.
						</h2>
					</div>
					<div className='flex-1'>
						{formSelect ? <Login /> : <Signup />}
						{formSelect ? (
							<p className='text-center text-gray-500 text-xs'>
								Not registered?{' '}
								<Link onClick={handleClick}>Sign up</Link>
							</p>
						) : (
							<p className='text-center text-gray-500 text-xs'>
								Already registered?{' '}
								<Link onClick={handleClick}>Login</Link>
							</p>
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Home;
