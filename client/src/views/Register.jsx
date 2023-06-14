import React from 'react';
import RegisterComponent from '../components/auth/RegisterComponent';

const Register = () => {
	return (
		<>
			<div
				className='container vh-100 d-flex align-items-center justify-content-center'
				style={{ minHeight: '100vh' }}>
				<div className='col-12'>
					<div className='row justify-content-center'>
						<div className='col-12 col-md-6 col-lg-6'>
							<RegisterComponent />
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Register;
