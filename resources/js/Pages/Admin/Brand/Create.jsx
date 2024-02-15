import React from "react";
import { Head } from "@inertiajs/react";

import AdminLayout from "@/Layouts/AdminLayout";
import CreateForm from "@/Components/Section/Admin/Brand/Create/CreateForm";

const Create = () => {
    return (
        <AdminLayout>
            <Head title="créer brand" />

           <CreateForm />
        </AdminLayout>
    );
};

export default Create;
