import React, { useEffect } from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import CreateForm from "@/Components/Section/Admin/Product/CreateForm";

const Create = ({ mainCategories, subCategories, brands }) => {
	return (
		<AdminLayout>
			<Head title="Créer un produit" />

			<div className="p-4 mx-auto max-w-7xl min-w-[25rem] dark:bg-gray-900 rounded-lg shadow-xl border dark:border-gray-700">
				<CreateForm
					mainCategories={mainCategories}
					subCategories={subCategories}
					brands={brands}
				/>
			</div>
		</AdminLayout>
	);
};

export default Create;
