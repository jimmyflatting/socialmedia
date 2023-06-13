import React, { useEffect, useState } from 'react';
import FeedComponent from '../components/FeedComponent';
import ProfileComponent from '../components/ProfileComponent';
import FriendList from '../components/FriendList';
import Header from '../components/Header';

const Feed = () => {
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
						<ProfileComponent user={userData} />
					</div>
					<div className='col-12 col-xl-6'>
						<FeedComponent user={userData} />
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

export default Feed;
