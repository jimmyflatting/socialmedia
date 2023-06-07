import React, { useEffect, useState } from 'react';

const TestComp = () => {
	const [data, setData] = useState('');

	let url = 'http://localhost:3001/';

	useEffect(() => {
		fetch(url)
			.then((res) => res.json())
			.then((res) => {
				setData(res);
				console.log(res);
			})
			.catch((error) => {
				console.log(error);
			});
	}, []);

	return (
		<>
			<p>{data.message}</p>
		</>
	);
};

export default TestComp;
