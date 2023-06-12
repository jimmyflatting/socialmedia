import React from 'react';
import UserFeedComponent from '../components/UserFeedComponent';
import ProfileComponent from '../components/ProfileComponent';
import FriendList from '../components/FriendList';
import Header from '../components/Header';

const Profile = () => {
	return (
		<>
			<Header />
			<div className='container'>
				<div className='row'>
					<div className='col-12 col-xl-3'>
						<ProfileComponent />
					</div>
					<div className='col-12 col-xl-6'>
						<UserFeedComponent />
					</div>
					<div className='col-3 d-none d-xl-block'>
						<FriendList />
					</div>
				</div>
			</div>
		</>
	);
};

export default Profile;
