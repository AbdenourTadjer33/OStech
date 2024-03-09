import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import CreateForm from "@/Components/Section/Admin/User/CreateForm";

const Create = ({ roles }) => {
	return (
		<AdminLayout>
			<Head title="Créer admin" />

			<div className="p-4 mx-auto max-w-7xl min-w-[25rem] dark:bg-gray-900 rounded-lg shadow-xl border dark:border-gray-700">
				<CreateForm roles={roles} />
			</div>
		</AdminLayout>
	);
};

export default Create;
