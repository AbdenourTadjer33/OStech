import React, { useContext, useEffect } from "react";
import { CreateProductFormContext } from "../CreateForm";
import Button from "@/Components/Button";
import TextInput from "@/Components/TextInput";
import { MdDelete } from "react-icons/md";
import InputError from "@/Components/InputError";

const Colors = ({}) => {
	const { data, setData, errors, setErrors } = useContext(
		CreateProductFormContext
	);

	const handleAdd = () => {
		setData("colors", [
			...data.colors,
			{
				label: "",
				code: "",
				amount: "",
			},
		]);
	};

	const deleteColor = (idx) => {
		const colors = [...data.colors];
		colors.splice(idx, 1);
		setData("colors", colors);
	};

	const handleChange = (e, idx) => {
		const { name, value } = e.target;
		const colors = [...data.colors];
		colors[idx][name] = value;
		setData("colors", colors);
	};

	return (
		<div className="space-y-4">
			<div
				className={`w-full rounded bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-4 space-y-4 ${
					data.colors.length === 0 && "hidden"
				}`}
			>
				{data.colors.map(({ label, code, amount }, idx) => (
					<div key={idx} className="relative">
						<div className="flex items-center gap-4">
							<div className="basis-1/3">
								<TextInput
									name="label"
									value={label}
									onChange={(e) => handleChange(e, idx)}
									placeholder="label color"
								/>
								<InputError
									className="mt-2"
									message={errors?.[`colors.${idx}.label`]}
								/>
							</div>
							<div className="basis-1/3">
								<input
									className="w-full h-10 rounded-lg overflow-hidden"
									type="color"
									name="code"
									color={code}
									value={code}
									onChange={(e) => handleChange(e, idx)}
								/>
								<InputError
									className="mt-2"
									message={errors?.[`colors.${idx}.code`]}
								/>
							</div>
							<div className="basis-1/3">
								<div className="relative">
									<div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
										<span className="text-gray-500 dark:text-gray-200">
											DA
										</span>
									</div>
									<TextInput
										name="amount"
										value={amount}
										onChange={(e) => handleChange(e, idx)}
										placeholder="prix extra"
									/>
								</div>
								<InputError
									className="mt-2"
									message={errors?.[`colors.${idx}.amount`]}
								/>
							</div>
							<div>
								<button
									type="button"
									className="p-2.5 bg-red-700 hover:bg-red-800 rounded-lg"
									onClick={() => deleteColor(idx)}
								>
									<MdDelete className="w-5 h-5 text-white " />
								</button>
							</div>
						</div>
					</div>
				))}
			</div>
			<div className="flex justify-center items-center">
				<Button type="button" btn="info" onClick={handleAdd}>
					Ajouté une couleur
				</Button>
			</div>
		</div>
	);
};

export default Colors;
