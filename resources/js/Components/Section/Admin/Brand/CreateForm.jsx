import React, { createContext } from "react";
import { useForm } from "@inertiajs/react";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Button from "@/Components/Button";
import LogoUpload from "./LogoUpload";
import Heading from "@/Components/Heading";

const CreateForm = ({}) => {
	const { data, setData, post, processing, errors, reset, clearErrors } =
		useForm({
			name: "",
			image: "",
		});

	const submitHandler = (e) => {
		e.preventDefault();

		post("/admin/brand/create", {
			onSuccess: () => reset(),
		});
	};

	return (
		<form onSubmit={submitHandler} encType="multipart/form-data">
			<Heading level={3} className="mb-5">
				Créer un brand
			</Heading>

			<div className="mb-5">
				<InputLabel className="mb-2">Brand</InputLabel>

				<TextInput
					value={data.name}
					onChange={(e) => setData("name", e.target.value)}
				/>

				<InputError message={errors.name} className="mt-2" />
			</div>

			<div className="mb-5">
				<LogoUpload data={data} setData={setData} />
				<InputError message={errors.image} className="mt-2" />
			</div>

			<div className="flex items-center justify-end gap-4">
				<Button
					btn="danger"
					className="w-full justify-center"
					onClick={() => {
						reset();
						clearErrors();
					}}
					type="button"
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
