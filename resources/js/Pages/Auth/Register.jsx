import { useEffect, useState } from "react";
import InputError from "@/Components/InputError";
import { Head, Link, useForm } from "@inertiajs/react";
import Label from "@/Components/Label";
import { Input } from "@/Components/TextInput";
import AppLayout from "@/Layouts/AppLayout";
import Container from "@/Components/Container";
import { IndigoButton } from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import { GoogleBtn } from "./Login";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
	const {
		data,
		setData,
		post,
		processing,
		errors,
		reset,
		setError,
		clearErrors,
	} = useForm({
		name: "",
		email: "",
		phone: "",
		password: "",
		condition: false,
	});

	const [seePassword, setSeePassword] = useState(false);

	useEffect(() => {
		return () => {
			reset("password");
		};
	}, []);

	useEffect(() => {
		if (errors.condition) {
			setTimeout(() => {
				clearErrors("condition");
			}, 25000);
		}
	}, [errors.condition]);

	const submit = (e) => {
		e.preventDefault();

		if (!data.condition) {
			setError(
				"condition",
				"Vous devez acceptez les terms et condition pour continuez"
			);
			return;
		}
		post(route("register"));
	};

	return (
		<AppLayout mainClass={false}>
			<Head title="Créer un compte" />

			<div className="bg-gray-50">
				<Container>
					<div className="mx-auto w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
						<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
							<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
								Rejoignez-nous
							</h1>
							<form
								onSubmit={submit}
								className="space-y-4 md:space-y-6"
							>
								<div>
									<Label htmlFor="name" className="mb-2">
										Nom complet
									</Label>
									<Input
										id="name"
										name="name"
										value={data.name}
										autoComplete="name"
										isFocused={true}
										onChange={(e) =>
											setData("name", e.target.value)
										}
										required
									/>

									<InputError
										message={errors.name}
										className="mt-1"
									/>
                                </div>
                                
								<div>
									<Label htmlFor="phone" className="mb-2">
										N° téléphone
									</Label>

									<Input
										id="phone"
										type="text"
										name="phone"
										value={data.phone}
										autoComplete="phone"
										onChange={(e) =>
											setData("phone", e.target.value)
										}
										required
									/>

									<InputError
										message={errors.phone}
										className="mt-1"
									/>
								</div>

								<div>
									<Label htmlFor="email" className="mb-2">
										Email
									</Label>

									<Input
										id="email"
										type="email"
										name="email"
										value={data.email}
										autoComplete="username"
										onChange={(e) =>
											setData("email", e.target.value)
										}
										required
									/>

									<InputError
										message={errors.email}
										className="mt-1"
									/>
								</div>

								<div>
									<Label htmlFor="password" className="mb-2">
										Password
									</Label>

									<div className="relative">
										<Input
											id="password"
											type={`${
												seePassword
													? "text"
													: "password"
											}`}
											name="password"
											value={data.password}
											autoComplete="password"
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

								<div className="block">
									<label className="flex items-center">
										<Checkbox
											name="remember"
											checked={data.condition}
											onChange={(e) =>
												setData(
													"condition",
													e.target.checked
												)
											}
										/>
										<span className="ms-2 text-sm text-gray-600">
											J'accepte les{" "}
											<Link
												href="/terms-and-conditions"
												className="text-indigo-600 font-medium"
											>
												termes et conditions
											</Link>
										</span>
									</label>
									<InputError
										className="mt-2"
										message={errors.condition}
									/>
								</div>

								<IndigoButton type="submit">
									Créer un compte
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
								Déjà enregistré?{" "}
								<Link
									href="/login"
									className="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
								>
									Se connecté
								</Link>
							</p>
						</div>
					</div>
				</Container>
			</div>
		</AppLayout>
	);
}
