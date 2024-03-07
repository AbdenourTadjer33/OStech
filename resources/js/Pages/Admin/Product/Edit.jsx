import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import EditForm from "@/Components/Section/Admin/Product/EditForm";

const Edit = ({ product, mainCategories, subCategories, brands }) => {
    return (
        <AdminLayout>
            <Head title={"Edit " + product?.name} />

            <div className="p-4 mx-auto max-w-7xl min-w-[25rem] dark:bg-gray-900 rounded-lg shadow-xl border dark:border-gray-700">
                <EditForm product={product} mainCategories={mainCategories} subCategories={subCategories} brands={brands} />
            </div>
        </AdminLayout>
    );
};

export default Edit;
