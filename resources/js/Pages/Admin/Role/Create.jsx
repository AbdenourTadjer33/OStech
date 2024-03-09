import React from "react";
import { Head } from "@inertiajs/react";
import CreateForm from "@/Components/Section/Admin/Role/CreateForm";
import AdminLayout from "@/Layouts/AdminLayout";

const Create = () => {
	return (
		<AdminLayout>
			<Head title="Créer un role" />
			<div className="p-4 mx-auto max-w-7xl min-w-[25rem] dark:bg-gray-900 rounded-lg shadow-xl border dark:border-gray-700">
				<CreateForm />
			</div>
		</AdminLayout>
	);
};

export default Create;
