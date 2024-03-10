import React, { useEffect } from "react";
import { useForm } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import SelectInput from "@/Components/SelectInput";
import PermissionTree from "./PermissionTree";
import Button from "@/Components/Button";

const EditForm = ({ role }) => {
	const { data, setData, post, processing, errors, reset } = useForm({
		name: role.name,
		description: role.description || "",
		permission: role.permission,
		permissions: role.permissions || [],
	});

	const submitHandler = (e) => {
		e.preventDefault();

		post(`/role/edit/${role.id}`, {
			onSuccess: () => reset(),
		});
	};

	return (
		<form onSubmit={submitHandler}>
			<div className="grid sm:grid-cols-2 gap-4 mb-5">
				<div>
					<InputLabel className="mb-2">Nom</InputLabel>

					<TextInput
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
					<InputLabel className="mb-2">Description</InputLabel>
					<TextInput
						value={data.description}
						onChange={(e) => setData("description", e.target.value)}
					/>
					<InputError message={errors.description} />
				</div>

				{data.permission === "custom" && (
					<div className="col-span-2">
						<PermissionTree data={data} setData={setData} />
						<InputError message={errors.permissions} />
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
					Editer
				</Button>
			</div>
		</form>
	);
};

export default EditForm;
