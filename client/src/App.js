import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Feed from './pages/Feed';
import Profile from './pages/Profile';

function App() {
	return (
		<>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/feed'
					element={<Feed />}
				/>
				<Route
					path='/:id'
					element={<Profile />}
				/>
			</Routes>
		</>
	);
}

export default App;
