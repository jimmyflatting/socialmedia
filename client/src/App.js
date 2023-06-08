import { Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Feed from './views/Feed';
import Register from './views/Register';
import Profile from './views/Profile';

function App() {
	return (
		<>
			<div className='root'>
				<Routes>
					<Route
						path='/'
						element={<Feed />}></Route>
					<Route
						path='/signup'
						element={<Register />}></Route>
					<Route
						path='/login'
						element={<Login />}></Route>
					<Route
						path='/profile/:id'
						element={<Profile />}></Route>
				</Routes>
			</div>
		</>
	);
}

export default App;
