import React from "react";
import { Head, Link } from "@inertiajs/react";

import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";
import Table from "@/Components/Table";
import Pagination from "@/Components/Pagination";

import { IoMdSearch } from "react-icons/io";

const Index = ({ brands }) => {
    const { data, current_page, next_page_url, prev_page_url, links, total } =
        brands;
    console.log(brands);
    return (
        <AdminLayout>
            <Head title="Brand" />

            <h1 className="text-4xl font-bold mb-3">Brand</h1>

            <div className="flex sm:flex-row flex-col sm:items-center sm:justify-between mb-4">
                <div className="bg-white dark:bg-gray-900 sm:mb-0 mb-2 w-auto">
                    <div className="relative mt-1">
                        <div className="absolute inset-y-0 rtl:inset-r-0 start-0 flex items-center ps-3 pointer-events-none text-gray-500 dark:text-gray-400">
                            <IoMdSearch />
                        </div>
                        <input
                            type="text"
                            id="table-search"
                            className="block pt-2 ps-10 text-sm text-gray-900 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="Search here ..."
                        />
                    </div>
                </div>
                <Link href={route("admin.brands.create")}>
                    <Button>Créer un brand</Button>
                </Link>
            </div>

            <div className="relative w-full overflow-x-auto shadow-md rounded-lg mb-4">
                <Table className="table-auto">
                    <Table.Head>
                        <Table.Row>
                            <Table.Title className="px-2 py-3">
                                Brand logo's
                            </Table.Title>
                            <Table.Title className="px-2 py-3">
                                Brand
                            </Table.Title>
                            <Table.Title className="px-2 py-3">
                                state
                            </Table.Title>
                            <Table.Title className="px-2 py-3">
                                Action
                            </Table.Title>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {data.map((record) => {
                            return (
                                <Table.Row
                                    key={record.slug}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <Table.Title className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        <img
                                            className="w-16 max-w-full max-h-full"
                                            src={`/media/${record.logo.file_path}`}
                                        />
                                    </Table.Title>
                                    <Table.Column className="px-2 py-4 capitalize ">
                                        {record.name}
                                    </Table.Column>
                                    <Table.Column className="px-2 py-4">
                                        {record.slug}
                                    </Table.Column>
                                    <Table.Column className="px-2 py-4 ">
                                        {record.created_at}
                                    </Table.Column>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            </div>

            <Pagination
                currentPage={current_page}
                next={next_page_url}
                prev={prev_page_url}
                links={links}
                total={total}
                className={"text-right"}
            />
        </AdminLayout>
    );
};

export default Index;
