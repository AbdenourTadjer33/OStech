import React, { createContext } from "react";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Button from "@/Components/Button";
import PermissionTree from "./PermissionTree";
import Heading from "@/Components/Heading";
import SelectInput from "@/Components/SelectInput";

const CreateForm = () => {
	const { data, setData, post, processing, errors, reset } = useForm({
		name: "",
		description: "",
		permission: "custom",
		permissions: [],
	});

	const submitHandler = (e) => {
		e.preventDefault();

		post("/role/create", {
			onSuccess: reset(),
		});
	};

	return (
		<form onSubmit={submitHandler} encType="multipart/form-data">
			<Heading level={3} className="mb-6">
				Créer un role
			</Heading>

			<div className="grid sm:grid-cols-2 gap-4 mb-5">
				<div>
					<InputLabel htmlFor="name" className="mb-2">
						Nom
					</InputLabel>

					<TextInput
						id="name"
						value={data.name}
						onChange={(e) => setData("name", e.target.value)}
					/>

					<InputError message={errors.name} className="mt-2" />
				</div>

				<div>
					<InputLabel className="mb-2">Type de permission</InputLabel>

					<SelectInput
						value={data.permission}
						onChange={(e) => setData("permission", e.target.value)}
					>
						<SelectInput.Option value="all">
							Tous les permissions
						</SelectInput.Option>
						<SelectInput.Option value="custom">
							Permission personnalisé
						</SelectInput.Option>
					</SelectInput>

					<InputError message={errors.permission} className="mt-2" />
				</div>

				<div className="col-span-2">
					<InputLabel htmlFor="description" className="mb-2">
						Description
					</InputLabel>

					<TextInput
						name="description"
						id="description"
						value={data.description}
						onChange={(e) => setData("description", e.target.value)}
					/>

					<InputError message={errors.description} className="mt-2" />
				</div>

				{data.permission == "custom" && (
					<div className="col-span-2">
						<PermissionTree data={data} setData={setData} />
						<InputError
							message={errors.permissions}
							className="mt-2"
						/>
					</div>
				)}
			</div>

			<div className="flex items-center gap-4">
				<Button
					btn="danger"
					onClick={() => reset()}
					className="w-full justify-center"
					disabled={processing}
				>
					Annuler
				</Button>
				<Button
					btn="primary"
					className="w-full justify-center"
					disabled={processing}
				>
					Créer
				</Button>
			</div>
		</form>
	);
};

export default CreateForm;
