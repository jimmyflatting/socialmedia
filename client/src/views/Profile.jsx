import React, { useEffect, useState } from 'react';
import UserFeedComponent from '../components/UserFeedComponent';
import ProfileComponent from '../components/ProfileComponent';
import FriendList from '../components/FriendList';
import Header from '../components/Header';

const Profile = () => {
	const [userData, setUserData] = useState(null);
	const [token, setToken] = useState(null);

	const getToken = () => {
		const token = localStorage.getItem('token');
		// console.log(token);
		return token;
	};

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch(`http://localhost:3001/users/`, {
					headers: {
						Authorization: `Bearer ${getToken()}`,
					},
				});
				const data = await response.json();
				// console.log(data);
				setUserData(data);
			} catch (error) {
				console.log(error);
			}
		};
		setToken(getToken());
		fetchUserData();
	}, []);

	if (!userData) {
		return <div>Loading...</div>;
	}
	return (
		<>
			<Header
				user={userData}
				token={token}
			/>
			<div className='container'>
				<div className='row'>
					<div className='col-12 col-xl-3'>
						<ProfileComponent
							user={userData}
							token={token}
						/>
					</div>
					<div className='col-12 col-xl-6'>
						<UserFeedComponent
							user={userData}
							token={token}
						/>
					</div>
					<div className='col-3 d-none d-xl-block'>
						<FriendList
							user={userData}
							token={token}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
