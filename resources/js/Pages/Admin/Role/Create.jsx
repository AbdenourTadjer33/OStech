import React from "react";
import { Head } from "@inertiajs/react";
import CreateForm from "@/Components/Section/Admin/Role/CreateForm";
import AdminLayout from "@/Layouts/AdminLayout";

const Create = () => {
    return (
        <AdminLayout>
            <Head title="Créer un role" />
            <CreateForm />
        </AdminLayout>
    );
};

export default Create;
