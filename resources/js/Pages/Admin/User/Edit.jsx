import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import EditForm from "@/Components/Section/Admin/User/EditForm";

const Edit = ({ user, roles }) => {
	return (
		<AdminLayout>
			<Head title={`Edite admin`} />
			<div className="p-4 mx-auto max-w-7xl min-w-[25rem] dark:bg-gray-900 rounded-lg shadow-xl border dark:border-gray-700">
				<EditForm user={user} roles={roles} />
			</div>
		</AdminLayout>
	);
};

export default Edit;
