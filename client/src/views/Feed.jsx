import React, { useEffect, useState } from 'react';
import FeedComponent from '../components/FeedComponent';
import ProfileComponent from '../components/ProfileComponent';
import FriendList from '../components/FriendList';
import Header from '../components/Header';

const Feed = () => {
	const [userData, setUserData] = useState(null);

	const getToken = () => {
		const token = localStorage.getItem('token');
		// console.log(token);
		return token;
	};
	const getEmail = () => {
		const email = localStorage.getItem('email');
		// console.log(email);
		return email;
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch(
					'http://localhost:3001/users/profile/',
					{
						headers: {
							Authorization: `Bearer ${getToken()}`,
							Profile: `${getEmail()}`,
						},
					}
				);
				const data = await response.json();
				//console.log(data);
				setUserData(data);
			} catch (error) {
				console.log(error);
			}
		};

		fetchUserData();
	}, []);

	if (!userData) {
		return <div>Loading...</div>;
	}
	return (
		<>
			<Header userHandle={userData.userHandle} />
			<div className='container'>
				<div className='row'>
					<div className='col-12 col-xl-3'>
						<ProfileComponent />
					</div>
					<div className='col-12 col-xl-6'>
						{/* <FeedComponent /> */}
					</div>
					<div className='col-3 d-none d-xl-block'>
						<FriendList />
					</div>
				</div>
			</div>
		</>
	);
};

export default Feed;
