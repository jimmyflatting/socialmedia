import { Route, Routes } from 'react-router-dom';
import Login from './views/Login';
import Feed from './views/Feed';
import Register from './views/Register';
import Profile from './views/Profile';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
	return (
		<>
			<div className='root'>
				<Header />
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
				<Footer />
			</div>
		</>
	);
}

export default App;
