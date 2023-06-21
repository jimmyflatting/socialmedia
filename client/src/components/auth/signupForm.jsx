import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { config } from "../../utils/config";
const apiUrl = config.API_BASE_URL;

const SignupForm = () => {
	const navigate = useNavigate();
	const errorSpan =
		document.getElementById(
			"errorSpan"
		);
	const [profileImg, setProfileImg] =
		useState("");
	const [firstName, setFirstName] =
		useState("");
	const [lastName, setLastName] =
		useState("");
	const [userHandle, setUserHandle] =
		useState("");
	const [email, setEmail] =
		useState("");
	const [password, setPassword] =
		useState("");
	const [
		passwordCheck,
		setPasswordCheck,
	] = useState("");

	const handleInputChangeProfileImg =
		(e) => {
			setProfileImg(
				e.target.value
			);
		};

	const handleInputChangeFirstName = (
		e
	) => {
		setFirstName(e.target.value);
	};
	const handleInputChangeLastName = (
		e
	) => {
		setLastName(e.target.value);
	};

	const handleInputChangeUserHandle =
		(e) => {
			setUserHandle(
				e.target.value
			);
		};

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
	const handleInputChangePasswordCheck =
		(e) => {
			setPasswordCheck(
				e.target.value
			);
		};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (
			passwordCheck !== password
		) {
			return (errorSpan.innerHTML =
				"Passwords does not match");
		}

		const fetchData = async () => {
			try {
				const response =
					await fetch(
						`${apiUrl}auth/register/`,
						{
							method: "POST",
							headers: {
								"Content-Type":
									"application/json",
							},
							body: JSON.stringify(
								{
									profileImg:
										profileImg,
									firstName:
										firstName,
									lastName:
										lastName,
									userHandle:
										userHandle,
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
							"Username/email already registered");
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
						htmlFor="profileImg"
					>
						Avatar
					</label>
					<input
						class="block w-full text-sm text-gray-800 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
						id="profileImg"
						type="file"
						onChange={
							handleInputChangeProfileImg
						}
					/>
				</div>
				<div className="md:flex">
					<div className="mb-4">
						<label
							className="block text-gray-800 dark:text-gray-50 text-sm font-bold mb-2"
							htmlFor="firstName"
						>
							Firstname
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="firstName"
							type="text"
							placeholder="First name"
							onChange={
								handleInputChangeFirstName
							}
							required
						/>
					</div>

					<div className="mb-4">
						<label
							className="block text-gray-800 dark:text-gray-50 text-sm font-bold mb-2"
							htmlFor="lastName"
						>
							Lastname
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="lastName"
							type="text"
							placeholder="Lastname"
							onChange={
								handleInputChangeLastName
							}
							required
						/>
					</div>
				</div>
				<div className="md:flex">
					<div className="mb-4">
						<label
							className="block text-gray-800 dark:text-gray-50 text-sm font-bold mb-2"
							htmlFor="displayname"
						>
							Username
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="userHandle"
							type="text"
							placeholder="@johndoe"
							onChange={
								handleInputChangeUserHandle
							}
							required
						/>
					</div>

					<div className="mb-4">
						<label
							className="block text-gray-800 dark:text-gray-50 text-sm font-bold mb-2"
							htmlFor="email"
						>
							Email
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="email"
							placeholder="hello@example.com"
							onChange={
								handleInputChangeEmail
							}
							required
						/>
					</div>
				</div>
				<div className="md:flex">
					<div className="mb-4">
						<label
							className="block text-gray-800 dark:text-gray-50 text-sm font-bold mb-2"
							htmlFor="Password"
						>
							Password
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="password"
							type="password"
							placeholder="********"
							onChange={
								handleInputChangePassword
							}
							required
						/>
					</div>

					<div className="mb-4">
						<label
							className="block text-gray-800 dark:text-gray-50 text-sm font-bold mb-2"
							htmlFor="passwordCheck"
						>
							Confirm
							password
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="passwordCheck"
							type="password"
							placeholder="********"
							onChange={
								handleInputChangePasswordCheck
							}
							required
						/>
					</div>
				</div>
				<div className="flex items-center justify-center">
					<button
						className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
						type="submit"
					>
						Sign up
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

export default SignupForm;
