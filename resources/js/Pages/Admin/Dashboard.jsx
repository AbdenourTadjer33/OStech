import React from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";

const Dashboard = () => {
    return (
        <AdminLayout>
            <Head title="Dashboard" />
            <h1 className="text-2xl">Dashboard</h1>
        </AdminLayout>
    );
};

export default Dashboard;