import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";

const Index = () => {
    return (
        <AdminLayout>
            <Head title="Gestion De Produit" />

            <Link href={route("admin.products.create")}>
                <Button>Créer un produit</Button>
            </Link>
        </AdminLayout>
    );
};

export default Index;
