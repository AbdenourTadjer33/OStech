import React from "react";
import { Head, usePage, useForm } from "@inertiajs/react";
import { Input } from "@/Components/TextInput";
import Label from "@/Components/Label";
import InputError from "@/Components/InputError";
import { IndigoButton } from "@/Components/Button";

export const UpdateAccountInformationForm = ({ user }) => {
	const { data, setData, post, errors, clearErrors } = useForm({
		name: user.name,
		email: user.email,
		phone: user.phone,
	});

	const changeHandler = (e) => {
		const { name, value } = e.target;
		clearErrors(name);
		setData(name, value);
	};

	return (
		<section className="p-4 bg-white shadow rounded sm:rounded-lg">
			<header>
				<h2 className="text-lg font-medium text-gray-900">
					Informations sur le profil
				</h2>

				<p className="mt-1 text-sm text-gray-600">
					Mettez à jour les informations de votre compte.
				</p>
			</header>

			<form className="mt-5 space-y-4 max-w-xl">
				<div>
					<Label htmlFor="name" className="mb-2">
						Nom prénom
					</Label>
					<Input
						id="name"
						name="name"
						value={data.name}
						onChange={changeHandler}
					/>
					<InputError className="mt-2" message={errors.name} />
				</div>

				<div>
					<Label htmlFor="email" className="mb-2">
						Email
					</Label>
					<Input
						id="email"
						name="email"
						type="email"
						value={data.email}
						onChange={changeHandler}
					/>
					<InputError className="mt-2" message={errors.email} />
				</div>

				<div>
					<Label htmlFor="phone" className="mb-2">
						N° téléphone
					</Label>
					<Input
						id="phone"
						name="phone"
						value={data.phone}
						onChange={changeHandler}
					/>
					<InputError className="mt-2" message={errors.phone} />
				</div>

				<IndigoButton>Sauvegarder</IndigoButton>
			</form>
		</section>
	);
};

export const UpdateAddressInformationForm = ({ user }) => {
	const { data, setData, post, errors, clearErrors } = useForm({
		name: user.name,
		email: user.email,
		phone: user.phone,
	});

	const changeHandler = (e) => {
		const { name, value } = e.target;
		clearErrors(name);
		setData(name, value);
	};
	return (
		<section className="p-4 bg-white shadow rounded sm:rounded-lg">
			<header>
				<h2 className="text-lg font-medium text-gray-900">
					Adresse de livraison
				</h2>

				<p className="mt-1 text-sm text-gray-600">
					Ajouté une adresse de livraison.
				</p>
			</header>

			<form className="mt-5 space-y-4 max-w-xl">

				<IndigoButton>Sauvegarder</IndigoButton>
			</form>
		</section>
	);
};
