import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import EditForm from "@/Components/Section/Admin/Brand/Edit/EditForm";

const Edit = ({ brand }) => {
    return (
        <AdminLayout>
            <Head title={`Edit brand - ${brand.name}`} />

            <EditForm brand={brand} />
        </AdminLayout>
    );
};

export default Edit;
