import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { Input } from "@/Components/TextInput";
import { IndigoButton } from "@/Components/Button";
import AppLayout from "@/Layouts/AppLayout";
import Container from "@/Components/Container";
import Label from "@/Components/Label";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login() {
	const { data, setData, post, processing, errors, reset } = useForm({
		username: "",
		password: "",
		remember: false,
	});

	const [seePassword, setSeePassword] = useState(false);

	useEffect(() => {
		return () => {
			reset("password");
		};
	}, []);

	const submit = (e) => {
		e.preventDefault();
		post(route("login"));
	};

	return (
		<AppLayout mainClass={false}>
			<Head title="Log in" />

			<div className="bg-gray-100/50">
				<Container>
					<div className="mx-auto w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Déjà membre? Connectez-vous
							</h1>

							<form
								onSubmit={submit}
								className="space-y-4 md:space-y-6"
							>
								<div>
									<Label className="mb-2" htmlFor="username">
										Email ou n° tél
									</Label>

									<Input
										id="username"
										type="text"
										name="username"
										value={data.username}
										autoComplete="username"
										isFocused
										onChange={(e) =>
											setData("username", e.target.value)
										}
										required
									/>

									<InputError
										message={errors.username}
										className="mt-1"
									/>
								</div>

								<div>
									<Label className="mb-2" htmlFor="password">
										Mot de passe
									</Label>

									<div className="relative">
										<Input
											id="password"
											type={`${
												seePassword
													? "text"
													: "password"
											}`}
											className="select-none"
											name="password"
											value={data.password}
											autoComplete="current-password"
											onChange={(e) =>
												setData(
													"password",
													e.target.value
												)
											}
											required
										/>
										<button
											type="button"
											className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer p-1.5 transition duration-100 hover:bg-gray-300 outline-none focus:ring-1 focus:ring-indigo-600 rounded-full"
											onClick={() =>
												setSeePassword(!seePassword)
											}
										>
											{seePassword ? (
												<FaEyeSlash className="w-5 h-5" />
											) : (
												<FaEye className="w-5 h-5" />
											)}
										</button>
									</div>

									<InputError
										message={errors.password}
										className="mt-1"
									/>
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
									<Link
										href="/forgot-password"
										className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-500"
									>
										Mot de passe oublié?
									</Link>
								</div>

								<IndigoButton
									type="submit"
									disabled={processing}
									className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
								>
									Se connecté
								</IndigoButton>
							</form>

							<div className="inline-flex items-center justify-center w-full">
								<hr className="w-full h-px mt-2 bg-gray-200 border-0 dark:bg-gray-700" />
								<span className="absolute px-3 font-medium text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
									or
								</span>
							</div>

							<div className="flex items-center gap-2">
								<a href="/auth/google" className="w-full">
									<GoogleBtn />
								</a>
							</div>

							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Vous n'avez pas encore de compte?{" "}
								<Link
									href="/register"
									className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
								>
									Créer un compte
								</Link>
							</p>
						</div>
					</div>
				</Container>
			</div>
		</AppLayout>
	);
}

export const GoogleBtn = () => {
	return (
		<button
			aria-label="Sign in with Google"
			className="flex items-center justify-center bg-white border border-button-border-light rounded-md p-0.5 pr-3 w-full hover:bg-gray-50"
		>
			<div className="flex items-center justify-center bg-transparent w-9 h-9 rounded-l">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					viewBox="0 0 24 24"
					className="w-5 h-5"
				>
					<title>Login with Google</title>
					<desc>Google G Logo</desc>
					<path
						d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
						className="fill-google-logo-blue"
					></path>
					<path
						d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
						className="fill-google-logo-green"
					></path>
					<path
						d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
						className="fill-google-logo-yellow"
					></path>
					<path
						d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
						className="fill-google-logo-red"
					></path>
				</svg>
			</div>
			<span className="text-sm text-google-text-gray tracking-wider">
				Continue avec Google
			</span>
		</button>
	);
};

export const FacebookBtn = () => {
	return (
		<button
			aria-label="Sign in with Google"
			className="flex items-center bg-white border border-gray-300 rounded-md p-0.5 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
		>
			<svg
				className="h-6 w-6 mr-2"
				xmlns="http://www.w3.org/2000/svg"
				viewBox="0 0 48 48"
				version="1.1"
			>
				<g
					id="Icons"
					stroke="none"
					strokeWidth="1"
					fill="none"
					fillRule="evenodd"
				>
					<g
						id="Color-"
						transform="translate(-200.000000, -160.000000)"
						fill="#4460A0"
					>
						<path
							d="M225.638355,208 L202.649232,208 C201.185673,208 200,206.813592 200,205.350603 L200,162.649211 C200,161.18585 201.185859,160 202.649232,160 L245.350955,160 C246.813955,160 248,161.18585 248,162.649211 L248,205.350603 C248,206.813778 246.813769,208 245.350955,208 L233.119305,208 L233.119305,189.411755 L239.358521,189.411755 L240.292755,182.167586 L233.119305,182.167586 L233.119305,177.542641 C233.119305,175.445287 233.701712,174.01601 236.70929,174.01601 L240.545311,174.014333 L240.545311,167.535091 C239.881886,167.446808 237.604784,167.24957 234.955552,167.24957 C229.424834,167.24957 225.638355,170.625526 225.638355,176.825209 L225.638355,182.167586 L219.383122,182.167586 L219.383122,189.411755 L225.638355,189.411755 L225.638355,208 L225.638355,208 Z"
							id="Facebook"
						></path>
					</g>
				</g>
			</svg>

			<span className="text-sm text-google-text-gray tracking-wider">
				Continue with Facebook
			</span>
		</button>
	);
};
