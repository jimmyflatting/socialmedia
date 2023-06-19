import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/auth/loginForm';
import Signup from '../components/auth/signupForm';
import Header from '../widgets/Header';

const Home = () => {
	const [formSelect, setForm] = useState(true);

	const handleClick = () => {
		setForm(!formSelect);
	};

	return (
		<>
			<Header />
			<div className='container mx-auto '>
				<div className='flex-none md:flex-row'>
					<div className='flex-1 h-screen'>
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
