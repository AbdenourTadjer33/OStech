import React, { useContext, useEffect } from "react";
import { CreateProductFormContext } from "../CreateForm";
import Button from "@/Components/Button";
import TextInput from "@/Components/TextInput";
import { MdDelete, MdClose } from "react-icons/md";
import InputError from "@/Components/InputError";

const Options = () => {
	const { data, setData, errors } = useContext(CreateProductFormContext);

	const handleAdd = () => {
		setData("options", [
			...data.options,
			{
				title: "",
				options: [
					{
						label: "",
						amount: "",
					},
				],
			},
		]);
	};

	const handleDelete = (idx) => {
		const options = [...data.options];
		options.splice(idx, 1);
		setData("options", options);
	};

	const handleTitleChange = (e, idx) => {
		const options = [...data.options];
		options[idx].title = e.target.value;
		setData("options", options);
	};

	return (
		<div className="space-y-4">
			{data.options.map(({ title, options }, idx) => {
				return (
					<div
						key={idx}
						className="relative w-full rounded bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-4"
					>
						<div className="flex items-center gap-4 mb-6">
							<div className="w-full">
								<TextInput
									name="title"
									placeholder={"Titre de la section d'option"}
									value={title}
									onChange={(e) => handleTitleChange(e, idx)}
								/>
								<InputError
									className="mt-2"
									message={errors?.[`options.${idx}.title`]}
								/>
							</div>
							<button
								type="button"
								title="Supprimé la section"
								className="text-gray-900 dark:text-white p-1 rounded-full transition-colors duration-100 hover:bg-red-200 dark:hover:bg-red-500"
								onClick={() => handleDelete(idx)}
							>
								<MdClose className="w-6 h-6" />
							</button>
						</div>

						<Option options={options} sectionID={idx} />
					</div>
				);
			})}
			<div className="flex justify-center items-center">
				<Button type="button" btn="info" onClick={handleAdd}>
					Ajouté une option
				</Button>
			</div>
		</div>
	);
};

const Option = ({ options, sectionID }) => {
	const { data, setData, errors } = useContext(CreateProductFormContext);

	const changeHandler = (e, idx) => {
		const { name, value } = e.target;
		const options = [...data.options];
		options[sectionID].options[idx][name] = value;
		setData("options", options);
	};

	const addOption = () => {
		const options = [...data.options];
		options[sectionID].options.push({ label: "", amount: "" });
		setData("options", options);
	};

	const deleteOption = (e, idx) => {
		const options = [...data.options];
		options[sectionID].options.splice(idx, 1);
		setData("options", options);
	};

	return (
		<div className="space-y-4">
			{options.map((option, idx) => (
				<div key={idx} className="flex items-center gap-4">
					<div className="basis-1/3">
						<TextInput
							name="label"
							placeholder="label de l'option"
							value={option.label}
							onChange={(e) => changeHandler(e, idx)}
						/>
						<InputError
							className="mt-2"
							message={
								errors?.[
									`options.${sectionID}.options.${idx}.label`
								]
							}
						/>
					</div>

					<div className="basis-2/3">
						<div className="relative">
							<div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
								<span className="text-gray-500 dark:text-gray-200">
									DA
								</span>
							</div>
							<TextInput
								name="amount"
								placeholder="amount"
								value={option.amount}
								onChange={(e) => changeHandler(e, idx)}
							/>
						</div>
						<InputError
							className="mt-2"
							message={
								errors?.[
									`options.${sectionID}.options.${idx}.amount`
								]
							}
						/>
					</div>

					<button
						type="button"
						className="p-2.5 bg-red-700 hover:bg-red-800 rounded-lg"
						onClick={() => deleteOption(idx)}
					>
						<MdDelete className="w-5 h-5" />
					</button>
				</div>
			))}
			<Button type="button" btn="primary" onClick={addOption}>
				Ajouter une option
			</Button>
		</div>
	);
};

export default Options;
