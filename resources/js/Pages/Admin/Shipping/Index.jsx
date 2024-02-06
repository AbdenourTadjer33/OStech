import React from "react";
import { Head, Link } from "@inertiajs/react";
import { Dropdown } from "flowbite-react";

import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";
import { FaFilter, FaSearch } from "react-icons/fa";
import { MdKeyboardArrowDown } from "react-icons/md";
import Table from "@/Components/Table";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import Pagination from "@/Components/Pagination";

const Index = ({ shippings, pricings }) => {
    const {
        data,
        current_page,
        next_page_url,
        prev_page_url,
        links,
        total,
        last_page,
        per_page,
    } = shippings;

    return (
        <AdminLayout>
            <Head title="Livraison" />
            <h1 className="text-4xl font-bold mb-3">Produits</h1>

            <div className="w-full">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2">
                            <form className="flex items-center">
                                <div className="relative w-full">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        <FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                    </div>
                                    <input
                                        type="text"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Search"
                                    />
                                </div>
                            </form>
                        </div>
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
                            <Link href={route("admin.shippings.create")}>
                                <Button btn="primary" type="button">
                                    Créer une livraison
                                </Button>
                            </Link>
                            <div className="flex items-center space-x-3 w-full md:w-auto">
                                <Dropdown
                                    label=""
                                    dismissOnClick={false}
                                    renderTrigger={() => (
                                        <button
                                            id="actionsDropdownButton"
                                            data-dropdown-toggle="actionsDropdown"
                                            className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                            type="button"
                                        >
                                            <MdKeyboardArrowDown className="-ml-1 mr-1.5 w-5 h-5" />
                                            Actions
                                        </button>
                                    )}
                                >
                                    <Dropdown.Item>Mass Edit</Dropdown.Item>
                                    <Dropdown.Item>Delete all</Dropdown.Item>
                                </Dropdown>

                                <Dropdown
                                    label=""
                                    dismissOnClick={false}
                                    renderTrigger={() => (
                                        <button
                                            className="w-full md:w-auto flex items-center justify-center py-2 px-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                                            type="button"
                                        >
                                            <FaFilter className="h-4 w-4 mr-2 text-gray-400" />
                                            Filter
                                            <MdKeyboardArrowDown className="-mr-1 ml-1.5 w-5 h-5" />
                                        </button>
                                    )}
                                >
                                    <Dropdown.Header>
                                        <h6 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                                            Choose brand
                                        </h6>
                                    </Dropdown.Header>

                                    <Dropdown.Item>
                                        <input
                                            id="apple"
                                            type="checkbox"
                                            value=""
                                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        <label
                                            htmlFor="apple"
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                        >
                                            Apple (56)
                                        </label>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <input
                                            id="apple"
                                            type="checkbox"
                                            value=""
                                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        <label
                                            htmlFor="apple"
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                        >
                                            Apple (56)
                                        </label>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <input
                                            id="apple"
                                            type="checkbox"
                                            value=""
                                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        <label
                                            htmlFor="apple"
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                        >
                                            Apple (56)
                                        </label>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <input
                                            id="apple"
                                            type="checkbox"
                                            value=""
                                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        <label
                                            htmlFor="apple"
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                        >
                                            Apple (56)
                                        </label>
                                    </Dropdown.Item>
                                    <Dropdown.Item>
                                        <input
                                            id="apple"
                                            type="checkbox"
                                            value=""
                                            className="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                                        />
                                        <label
                                            htmlFor="apple"
                                            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-100"
                                        >
                                            Apple (56)
                                        </label>
                                    </Dropdown.Item>
                                </Dropdown>
                            </div>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <Table>
                            <Table.Head>
                                <Table.Row>
                                    <Table.Title className="px-4 py-3">
                                        Nom
                                    </Table.Title>
                                    <Table.Title className="px-2 py-3">
                                        Status
                                    </Table.Title>
                                    <Table.Title className="px-2 py-3">
                                        Créer à
                                    </Table.Title>
                                    <Table.Title className="px-2 py-3"></Table.Title>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                {data.map((record) => (
                                    <Table.Row
                                        key={record.id}
                                        className="border-b dark:border-gray-600 "
                                    >
                                        <Table.Title className="px-4 py-2 capitalize">
                                            {record.name}
                                        </Table.Title>
                                        <Table.Title className="px-2 py-2">
                                            {record.status ? (
                                                <svg
                                                    className="w-5 h-5 text-green-500"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 16 12"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="M1 5.917 5.724 10.5 15 1.5"
                                                    />
                                                </svg>
                                            ) : (
                                                <svg
                                                    className="w-5 h-5 text-red-500"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 14 14"
                                                >
                                                    <path
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                        d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                                    />
                                                </svg>
                                            )}
                                        </Table.Title>
                                        <Table.Title className="px-2 py-2">
                                            {record.created_at}
                                        </Table.Title>
                                        <Table.Title className="px-2 py-2">
                                            <Dropdown
                                                label=""
                                                dismissOnClick
                                                renderTrigger={() => (
                                                    <button
                                                        className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                                        type="button"
                                                    >
                                                        <PiDotsThreeOutlineVerticalFill className="w-5 h-5" />
                                                    </button>
                                                )}
                                            >
                                                <div className="w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                                                    <ul
                                                        className="py-1 text-sm text-gray-700 dark:text-gray-200"
                                                        aria-labelledby="apple-imac-27-dropdown-button"
                                                    >
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                            >
                                                                Show
                                                            </a>
                                                        </li>
                                                        <li>
                                                            <a
                                                                href="#"
                                                                className=""
                                                            >
                                                                Edit
                                                            </a>
                                                           
                                                        </li>
                                                    </ul>
                                                    <div className="py-1">
                                                        <a
                                                            href="#"
                                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                        >
                                                            Delete
                                                        </a>
                                                    </div>
                                                </div>
                                            </Dropdown>
                                        </Table.Title>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </div>

                    <nav className="flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4">
                        <Pagination
                            currentPage={current_page}
                            next={next_page_url}
                            prev={prev_page_url}
                            links={links}
                            perPage={per_page}
                            total={total}
                            last_page={last_page}
                        />
                    </nav>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Index;
