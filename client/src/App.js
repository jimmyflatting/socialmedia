import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Feed from './views/Feed';
import Register from './views/Register';
import Profile from './views/Profile';
import { config } from './utils/config';
const apiUrl = config.API_BASE_URL;

function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	console.log(document.cookie);

	return (
		<>
			<div className='root'>
				<Routes>
					<Route
						path='/'
						element={isLoggedIn ? <Feed /> : <Login />}
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
