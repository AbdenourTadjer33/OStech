import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import EditForm from "@/Components/Section/Admin/Brand/EditForm";

const Edit = ({ brand }) => {
	return (
		<AdminLayout>
			<Head title={`Edit brand - ${brand.name}`} />

			<div className="mx-auto mt-5 p-4 max-w-4xl dark:bg-gray-900 rounded-lg shadow-xl border dark:border-gray-700">
				<EditForm brand={brand} />
			</div>
		</AdminLayout>
	);
};

export default Edit;
