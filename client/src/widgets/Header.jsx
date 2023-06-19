import React, { useEffect, useState } from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { MdDarkMode, MdLightMode } from 'react-icons/md';

import logo from '../img/logo.png';

const Header = () => {
	const [theme, setTheme] = useState('light');

	useEffect(() => {
		if (theme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}, [theme]);

	const handleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark');
	};
	return (
		<>
			<div id='header '>
				<div
					className='container w-80 sm:w-full flex mx-auto py-5'
					style={{ alignItems: 'center' }}>
					<div className='flex-1'>
						<h1 className='text-4xl text-gray-800 dark:text-gray-50'>
							Social<i>Media</i>
						</h1>
					</div>
					<div className='flex'>
						{theme === 'dark' ? (
							<MdLightMode
								className='text-white text-2xl cursor-pointer'
								onClick={handleTheme}
							/>
						) : (
							<MdDarkMode
								className='text-2xl cursor-pointer'
								onClick={handleTheme}
							/>
						)}
						<GiHamburgerMenu className='dark:text-white text-2xl ml-5 cursor-pointer' />
					</div>
				</div>
			</div>
		</>
	);
};

export default Header;
