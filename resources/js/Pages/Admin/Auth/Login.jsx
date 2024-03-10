import React, { useEffect } from "react";
import { Head, useForm } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Heading from "@/Components/Heading";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";


const Login = () => {
	const { data, setData, post, processing, reset, errors } = useForm({
		username: "",
        password: "",
        remember: false,
	});

	useEffect(() => {
		window.document.documentElement.classList.remove('dark');
	}, []);

	const submitHandler = (e) => {
        e.preventDefault();
        
        post('/login', {
            onSuccess: () => reset()
        })
	};

	return (
		<>
			<Head title="Login" />
			<div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<ApplicationLogo
						type="indigo"
						className="mx-auto h-12 sm:h-20"
					/>
					<Heading
						level={4}
						className="text-center mt-10 leading-9 tracking-tight"
					>
						Connectez-vous à votre compte
					</Heading>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" onSubmit={submitHandler}>
						<div>
							<label
								htmlFor="username"
								className="block text-sm font-medium leading-6 text-gray-900"
							>
								Email address
							</label>
							<div className="mt-2">
								<input
									id="username"
									name="username"
									type="text"
									autoComplete="username"
									value={data.username}
									onChange={(e) =>
										setData("username", e.target.value)
									}
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
								<InputError className="mt-1 ms-1" message={errors.username} />
							</div>
						</div>

						<div>
							<div className="flex items-center justify-between">
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Password
								</label>
								<div className="text-sm">
									<span
										className="font-medium cursor-pointer hover:underline text-indigo-600 hover:text-indigo-500"
										onClick={() =>
											alert(
												"relax and try to find your password"
											)
										}
									>
										Mot de passe oublié?
									</span>
								</div>
							</div>
							<div className="mt-2">
								<input
									id="password"
									name="password"
									type="password"
									autoComplete="current-password"
									value={data.password}
									onChange={(e) =>
										setData("password", e.target.value)
									}
									required
									className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
								/>
							</div>
						</div>

						<div className="flex items-center justify-between">
							<div className="block">
								<label className="flex items-center">
									<Checkbox
										name="remember"
										checked={data.remember}
										onChange={(e) =>
											setData(
												"remember",
												e.target.checked
											)
										}
									/>
									<span className="ms-2 text-sm text-gray-600">
										Souviens-toi de moi
									</span>
								</label>
							</div>
						</div>

						<div>
							<button
								type="submit"
								disabled={processing}
								className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Se connecter
							</button>
						</div>
					</form>
				</div>
			</div>
		</>
	);
};

export default Login;
