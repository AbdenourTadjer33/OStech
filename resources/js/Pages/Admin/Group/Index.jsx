import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const Index = () => {
	return (
		<AdminLayout>
			<Head title="Group et pack" />
			<h1 className="text-4xl font-bold mb-3">Pack & Group</h1>
		</AdminLayout>
	);
};

export default Index;
