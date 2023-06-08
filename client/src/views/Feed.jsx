import React from 'react';
import FeedComponent from '../components/FeedComponent';
import ProfileComponent from '../components/ProfileComponent';
import FriendList from '../components/FriendList';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Feed = () => {
	return (
		<>
			<Header />
			<div className='container'>
				<div className='row'>
					<div className='col-12 col-xl-3'>
						<ProfileComponent />
					</div>
					<div className='col-12 col-xl-6'>
						<FeedComponent />
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
