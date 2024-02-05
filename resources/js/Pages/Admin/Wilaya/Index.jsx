import React, { useState } from "react";
import { Head } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Toggle from "@/Components/Toggle";
import Table from "@/Components/Table";

const Index = ({ wilayas }) => {
    const [data, setData] = useState(wilayas);

    const findWilaya = (id) => {
        return data.find((wilaya, idx) => {
            return idx;
        });
    };

    const changeHandler = (e, id) => {
        const idx = findWilaya(id);
        console.log(idx);
        // const newData = [...data];
        // newData[idx].status = e.target.checked;
        // setData(newData);
    };

    return (
        <AdminLayout>
            <Head title="Wilaya" />

            <div className="overflow-y-hidden rounded-lg">
                <Table>
                    <Table.Head>
                        <Table.Row>
                            <Table.Title className="px-6 py-3">
                                Code
                            </Table.Title>
                            <Table.Title className="px-2 py-3">nom</Table.Title>
                            <Table.Title className="px-2 py-3">
                                staus
                            </Table.Title>
                            <Table.Title className="px-6 py-3 text-right">
                                nom ar
                            </Table.Title>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {data.map((wilaya) => (
                            <Table.Row
                                key={wilaya.id}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                            >
                                <Table.Column className="px-6 py-3">
                                    {wilaya.code}
                                </Table.Column>
                                <Table.Column className="px-2 py-3">
                                    {wilaya.name}
                                </Table.Column>
                                <Table.Column className="px-2 py-3">
                                    <Toggle
                                        checked={wilaya.status}
                                        onChange={(e) =>
                                            changeHandler(e, wilaya.id)
                                        }
                                    />
                                </Table.Column>
                                <Table.Column className="px-6 py-3 text-right">
                                    {wilaya.ar_name}
                                </Table.Column>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table>
            </div>
        </AdminLayout>
    );
};

export default Index;
