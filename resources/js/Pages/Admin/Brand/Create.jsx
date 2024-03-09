import React from "react";
import { Head } from "@inertiajs/react";

import AdminLayout from "@/Layouts/AdminLayout";
import CreateForm from "@/Components/Section/Admin/Brand/CreateForm";

const Create = () => {
	return (
		<AdminLayout>
			<Head title="créer brand" />

			<div className="mx-auto mt-5 p-4 max-w-4xl dark:bg-gray-900 rounded-lg shadow-xl border dark:border-gray-700">
				<CreateForm />
			</div>
		</AdminLayout>
	);
};

export default Create;
