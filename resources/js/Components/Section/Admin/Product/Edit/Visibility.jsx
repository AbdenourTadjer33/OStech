import React, { useContext } from "react";
import Toggle from "@/Components/Toggle";
import { EditProductFormContext } from "../EditForm";

const Visibility = () => {
	const { data, setData, forgetError } = useContext(EditProductFormContext);
	return (
		<div className="flex gap-4 flex-col justify-center lg:flex-row">
			<label htmlFor="status">
				<div className="inline-flex items-center justify-between gap-4 w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
					<div className="block">
						<h4 className="text-2xl font-semibold">Status</h4>
						<p className="text-base">
							S'il le status est activé, le produit sera affiché
							dans la section des produits
						</p>
					</div>
					<Toggle
						id="status"
						name="status"
						defaultChecked={data.status}
						onChange={(e) => {
							setData("status", e.target.checked);
							forgetError("status");
						}}
					/>
				</div>
			</label>

			<label htmlFor="catalog">
				<div className="inline-flex items-center justify-between gap-4 w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
					<div className="block">
						<h4 className="text-2xl font-semibold">Catalogue</h4>
						<p className="text-base">
							S'il le catalogue est activé, ce produit sera
							affiché dans la section catalogue
						</p>
					</div>
					<Toggle
						id="catalog"
						name="catalog"
						defaultChecked={data.catalog}
						label=""
						onChange={(e) => {
							setData("catalog", e.target.checked);
							forgetError("catalog");
						}}
					/>
				</div>
			</label>
		</div>
	);
};

export default Visibility;
