import React from 'react';
import FeedComponent from '../components/FeedComponent';
import ProfileComponent from '../components/ProfileComponent';
import FriendList from '../components/FriendList';

const Feed = () => {
	return (
		<>
			<div className='container'>
				<div className='row'>
					<div className='col-3'>
						<ProfileComponent />
					</div>
					<div className='col-6'>
						<FeedComponent />
					</div>
					<div className='col-3'>
						<FriendList />
					</div>
				</div>
			</div>
		</>
	);
};

export default Feed;
