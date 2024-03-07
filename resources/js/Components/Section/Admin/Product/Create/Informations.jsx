import React, { useContext } from "react";
import { CreateProductFormContext } from "../CreateForm";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import RichEditor from "@/Components/RichEditor";
import CategoryBrand from "./CategoryBrand";

const Informations = () => {
	const { data, setData, errors, forgetError, validate } = useContext(
		CreateProductFormContext
	);

	const changeHandler = (e) => {
		const { name, value } = e.target;
		setData(name, value);
		forgetError(name);
	};

	const blurHandler = (e) => {
		validate(e.target.name);
	};

	return (
		<div className="grid gap-4 md:grid-cols-3">
			<div>
				<InputLabel htmlFor="name" required className="mb-2">
					Nom de produit
				</InputLabel>

				<TextInput
					id="name"
					name="name"
					value={data.name}
					onChange={changeHandler}
					onBlur={blurHandler}
				/>

				<InputError message={errors.name} className="mt-2" />
			</div>

			<div>
				<InputLabel htmlFor="sku" value="SKU" className="mb-2" />

				<TextInput
					id="sku"
					name="sku"
					value={data.sku}
					onChange={changeHandler}
					onBlur={blurHandler}
				/>
				<InputError message={errors.sku} className="mt-2" />
			</div>

			<div>
				<InputLabel htmlFor="qte" className="mb-2">
					Quantité de produit desponibe
				</InputLabel>
				<div className="relative">
					<div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
						<span className="text-gray-500 dark:text-gray-200">
							pc
						</span>
					</div>
					<TextInput
						id="qte"
						name="qte"
						value={data.qte}
						onChange={changeHandler}
						onBlur={blurHandler}
					/>
				</div>

				<InputError message={errors.qte} className="mt-2" />
			</div>

			<div className="sm:col-span-3">
				<InputLabel className="mb-2">Description de produit</InputLabel>

				<RichEditor
					name="description"
					value={data.description}
					onChange={(e) => setData("description", e)}
					onBlur={() => validate('description')}
				/>
				<InputError message={errors.description} className="mt-2" />
			</div>

			<div className="sm:col-span-3">
				<CategoryBrand />
			</div>

			<div>
				<InputLabel htmlFor="price" required className="mb-2">
					Prix de produit
				</InputLabel>

				<div className="relative">
					<div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
						<span className="text-gray-500 dark:text-gray-200">
							DA
						</span>
					</div>
					<TextInput
						id="price"
						name="price"
						value={data.price}
						onChange={changeHandler}
						onBlur={blurHandler}
					/>
				</div>
				<InputError message={errors.price} className="mt-2" />
			</div>

			<div>
				<InputLabel htmlFor="promo" className="mb-2">
					Promotion produit
				</InputLabel>

				<div className="relative">
					<div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
						<span className="text-gray-500 dark:text-gray-200">
							%
						</span>
					</div>

					<TextInput
						id="promo"
						name="promo"
						value={data.promo}
						onChange={changeHandler}
						onBlur={blurHandler}
					/>
				</div>

				<InputError message={errors.promo} className="mt-2" />
			</div>
		</div>
	);
};

export default Informations;
