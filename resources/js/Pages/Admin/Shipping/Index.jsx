import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";

const Index = ({shippings}) => {

    console.log(shippings);
    return (
        <AdminLayout>
            <Head title="Livraison" />
            <Link href={route("admin.shippings.create")}>
                <Button>Créer une livraison</Button>
            </Link>
        </AdminLayout>
    );
};

export default Index;
