import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import EditForm from "@/Components/Section/Admin/Role/EditForm";

const Edit = ({role}) => {
	return (
		<AdminLayout>
			<Head title="Edit role" />

			<div className="p-4 mx-auto max-w-7xl min-w-[25rem] dark:bg-gray-900 rounded-lg shadow-xl border dark:border-gray-700">
				<EditForm role={role} />
			</div>
		</AdminLayout>
	);
};

export default Edit;
