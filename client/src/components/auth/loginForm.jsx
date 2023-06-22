import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../utils/config";
const apiUrl = config.API_BASE_URL;

const LoginForm = () => {
	const navigate = useNavigate();
	const errorSpan =
		document.getElementById(
			"errorSpan"
		);
	const [email, setEmail] =
		useState("");
	const [password, setPassword] =
		useState("");

	const handleInputChangeEmail = (
		e
	) => {
		setEmail(e.target.value);
	};
	const handleInputChangePassword = (
		e
	) => {
		setPassword(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		const fetchData = async () => {
			try {
				const response =
					await fetch(
						`${apiUrl}auth/login/`,
						{
							method: "POST",
							headers: {
								"Content-Type":
									"application/json",
							},
							body: JSON.stringify(
								{
									email: email,
									password:
										password,
								}
							),
							credentials:
								"include",
						}
					);
				const data =
					await response.status;
				console.log(data);
				data === 202
					? navigate("/feed")
					: (errorSpan.innerHTML =
							"Wrong username/password");
			} catch (error) {
				console.log(error);
			}
		};

		fetchData();
	};

	return (
		<div className="w-full max-w-xs mx-auto ">
			<form
				className="bg-gray-50 dark:bg-gray-800 shadow-lg rounded px-8 pt-6 pb-8 mb-4"
				onSubmit={handleSubmit}
			>
				<div className="mb-4">
					<label
						className="block text-gray-800 dark:text-gray-50 text-sm font-bold mb-2"
						htmlFor="username"
					>
						Email
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
						id="username"
						type="text"
						placeholder="hello@example.com"
						onChange={
							handleInputChangeEmail
						}
					/>
				</div>
				<div className="mb-6">
					<label
						className="block text-gray-800 dark:text-gray-50 text-sm font-bold mb-2"
						htmlFor="password"
					>
						Password
					</label>
					<input
						className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
						id="password"
						type="password"
						placeholder="********"
						onChange={
							handleInputChangePassword
						}
					/>
				</div>
				<div className="flex items-center justify-center">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Sign In
					</button>
				</div>
				<p
					id="errorSpan"
					className="text-center text-rose-500 text-xs mt-5"
				></p>
			</form>
		</div>
	);
};

export default LoginForm;
