import React from "react";
import { useForm } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Button from "@/Components/Button";
import Heading from "@/Components/Heading";
import LogoUpload from "./LogoUpload";

const EditForm = ({ brand }) => {
	const { data, setData, post, errors, processing, reset, clearErrors } =
		useForm({
			name: brand.name,
			image: brand.logo,
		});

	const submitHandler = (e) => {
		e.preventDefault();

		post(`/brand/edit/${brand.id}`, {
			onSuccess: () => reset(),
		});
	};

	return (
		<form onSubmit={submitHandler} encType="multipart/form-data">
			<Heading level={3} className="mb-5">
				Edit brand
			</Heading>

			<div className="mb-5">
				<InputLabel className="mb-2">brand</InputLabel>

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
					Edit
				</Button>
			</div>
		</form>
	);
};

export default EditForm;
