import React, { useEffect, useState } from 'react';
import FeedComponent from '../components/feed/FeedComponent';
import ProfileComponent from '../components/profile/ProfileComponent';
import FriendList from '../components/profile/FriendList';
import Header from '../components/navigation/Header';
import { config } from '../utils/config';
const apiUrl = config.API_BASE_URL;

const Feed = () => {
	const [userData, setUserData] = useState(null);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const response = await fetch(`${apiUrl}users/`, {
					headers: {
						'Content-Type': 'application/json',
					},
					credentials: 'include',
				});
				const data = await response.json();
				// console.log(data);
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
			<div className='container'>
				<Header user={userData} />
				<div className='row'>
					<div className='col-12 col-xl-3'>
						<ProfileComponent user={userData} />
					</div>
					<div className='col-12 col-xl-6'>
						<FeedComponent user={userData} />
					</div>
					<div className='col-3 d-none d-xl-block'>
						<FriendList user={userData} />
					</div>
				</div>
			</div>
		</>
	);
};

export default Feed;
