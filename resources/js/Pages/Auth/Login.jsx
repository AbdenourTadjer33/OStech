import { useEffect, useState } from "react";
import Checkbox from "@/Components/Checkbox";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import { Input } from "@/Components/TextInput";
import Button from "@/Components/Button";
import AppLayout from "@/Layouts/AppLayout";
import Container from "@/Components/Container";
import Label from "@/Components/Label";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Login({ status, canResetPassword }) {
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
		<AppLayout>
			<Head title="Log in" />

			<Container>
				<div className="mr-auto w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Welcome back
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
											seePassword ? "text" : "password"
										}`}
										className="select-none"
										name="password"
										value={data.password}
										autoComplete="current-password"
										onChange={(e) =>
											setData("password", e.target.value)
										}
                                        required
									/>
									<span
										className="absolute top-1/2 right-2 -translate-y-1/2 cursor-pointer p-1.5 transition duration-100 hover:bg-gray-300 rounded-full"
										onClick={() =>
											setSeePassword(!seePassword)
										}
									>
										{seePassword ? (
											<FaEyeSlash className="w-5 h-5" />
										) : (
											<FaEye className="w-5 h-5" />
										)}
									</span>
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
								<a
									href="#"
									className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-500"
								>
									Forgot password?
								</a>
							</div>

							<button
								type="submit"
								className="w-full text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800"
							>
								Se connecté
                            </button>
                            
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								Don't have an account yet?{" "}
								<a
									href="#"
									className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
								>
									Sign up
								</a>
							</p>
						</form>
					</div>
				</div>
			</Container>
		</AppLayout>
	);
}
