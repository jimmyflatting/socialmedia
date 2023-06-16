import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Feed from './views/Feed';
import Register from './views/Register';
import Profile from './views/Profile';
import { config } from './utils/config';
const apiUrl = config.API_BASE_URL;

function App() {
	const [login, setLogin] = useState(false);

	useEffect(() => {
		const validateData = async () => {
			try {
				const response = await fetch(`${apiUrl}auth/validate`, {
					credentials: 'include',
				});
				const res = await response.json();
				console.log(res);
				if (res.status === 200) {
					setLogin(true);
				}
			} catch (error) {
				console.log(error);
			}
		};
		validateData();
		console.log(login);
	}, []);

	return (
		<>
			<div className='root'>
				<Routes>
					<Route
						path='/'
						element={<Login />}
					/>
					<Route
						path='/feed'
						element={<Feed />}
					/>
					<Route
						path='/signup'
						element={<Register />}
					/>
					<Route
						path='/login'
						element={<Login />}
					/>
					<Route
						path='/profile/:id'
						element={<Profile />}
					/>
				</Routes>
			</div>
		</>
	);
}

export default App;
