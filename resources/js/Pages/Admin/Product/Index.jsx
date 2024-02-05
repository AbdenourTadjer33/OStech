import React from "react";
import { Head, Link } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";
import { IoMdSearch } from "react-icons/io";
import Table from "@/Components/Table";
import ReadMore from "@/Components/ReadMore";
import CurrencyFormat from "@/Components/CurrencyFormat";
import Dropdown from "@/Components/Dropdown";

const Index = ({ products }) => {
    const {
        data,
        current_page,
        next_page_url,
        prev_page_url,
        links,
        total,
        last_page,
    } = products;

    return (
        <AdminLayout>
            <Head title="Gestion De Produit" />
            <h1 className="text-4xl font-bold mb-3">Produits</h1>

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
                <Link href={route("admin.products.create")}>
                    <Button>Créer un produit</Button>
                </Link>
            </div>

            <div className="relative w-full shadow-md rounded-lg mb-4">
                <Table className="table-auto">
                    <Table.Head>
                        <Table.Row>
                            <Table.Title className="px-2 py-3"></Table.Title>
                            <Table.Title className="px-2 py-3">
                                Produit
                            </Table.Title>
                            <Table.Title className="px-2 py-3">
                                Prix
                            </Table.Title>
                            <Table.Title className="px-2 py-3">
                                Status
                            </Table.Title>
                            <Table.Title className="px-2 py-3">
                                Catalogue
                            </Table.Title>
                            <Table.Title className="px-2 py-3">
                                Categorie
                            </Table.Title>
                            <Table.Title className="px-2 py-3">
                                Brand
                            </Table.Title>
                            <Table.Title className="px-2 py-3">
                                Créer à
                            </Table.Title>
                            <Table.Title className="px-2 py-3"></Table.Title>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {data.map((record, idx) => {
                            console.log(record);
                            return (
                                <Table.Row
                                    key={record.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    {/* media */}
                                    <Table.Column className="px-2 py-3 w-16 md:w-32">
                                        <img
                                            className="max-w-full max-h-full"
                                            src={
                                                "/media/" +
                                                record.assets?.[0].file_path
                                            }
                                        />
                                    </Table.Column>
                                    {/* product info */}
                                    <Table.Column className="px-2 py-3">
                                        ref: {record.ref}
                                        <br />
                                        nom: <ReadMore content={record.name} />
                                        {record.sku && (
                                            <>
                                                <br />
                                                SKU: {record.sku}
                                            </>
                                        )}
                                        {record.qte && (
                                            <>
                                                <br />
                                                Qte: {record.qte}
                                            </>
                                        )}
                                    </Table.Column>
                                    {/* pricing */}
                                    <Table.Column className="px-2 py-3">
                                        <CurrencyFormat number={record.price} />
                                    </Table.Column>
                                    {/* status */}
                                    <Table.Column className="px-2 py-4">
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
                                    </Table.Column>
                                    {/* catalogue */}
                                    <Table.Column className="px-2 py-4">
                                        {record.catalogue ? (
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
                                    </Table.Column>
                                    <Table.Column className="px-2 py-4">
                                        {record.category.name}
                                    </Table.Column>
                                    <Table.Column className="px-2 py-4">
                                        {record?.brand?.name}
                                    </Table.Column>
                                    <Table.Column className="px-2 py-4">
                                        {record.created_at}
                                    </Table.Column>
                                    <Table.Column className="px-2 py-4">
                                        <Dropdown dismissOnClick={false}>
                                            <Dropdown.Trigger>
                                                <button type="button">
                                                    <svg
                                                        className="w-5 h-5"
                                                        aria-hidden="true"
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        fill="currentColor"
                                                        viewBox="0 0 4 15"
                                                    >
                                                        <path d="M3.5 1.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 6.041a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Zm0 5.959a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z" />
                                                    </svg>
                                                </button>
                                            </Dropdown.Trigger>
                                            <Dropdown.Content>
                                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                                                    <li>
                                                        <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                            Earnings
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                            Earnings
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                            Earnings
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                            Earnings
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                                            Earnings
                                                        </a>
                                                    </li>
                                                </ul>
                                            </Dropdown.Content>
                                        </Dropdown>
                                    </Table.Column>
                                </Table.Row>
                            );
                        })}
                    </Table.Body>
                </Table>
            </div>
        </AdminLayout>
    );
};

export default Index;
