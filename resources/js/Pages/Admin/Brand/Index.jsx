import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";
import Table from "@/Components/Table";
import Pagination from "@/Components/Pagination";
import { MdKeyboardArrowDown } from "react-icons/md";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { Dropdown } from "flowbite-react";
import Accordion from "@/Components/Accordion";
import { FaFilter, FaSearch } from "react-icons/fa";
import Modal from "@/Components/Modal";
import { IoMdInformationCircleOutline } from "react-icons/io";
import InlineButton from "@/Components/InlineButton";
import { FaSpinner } from "react-icons/fa";
import { useEffect } from "react";

const Index = ({ brands }) => {
    const { delete: destroy, processing } = useForm();

    const {
        data,
        current_page,
        next_page_url,
        prev_page_url,
        links,
        total,
        last_page,
        per_page,
    } = brands;

    const [deleteModal, setDeleteModal] = useState({ status: false });
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredData, setFilteredData] = useState(data);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = data.filter((record) =>
            record.name.toLowerCase().includes(query)
        );

        setFilteredData(filtered);
    };

    const openDeleteModal = (brand) => {
        setDeleteModal({ status: true, brand });
    };

    const deleteBrand = () => {
        destroy(route("admin.brands.destroy", { id: deleteModal.brand.id }), {
            onSuccess: () => setDeleteModal({ status: false }),
        });
    };

    useEffect(() => {
        setFilteredData(data);
    }, [data]);

    return (
        <AdminLayout>
            <Head title="Brand" />
            <h1 className="text-4xl font-bold mb-3">Brand</h1>  

            <div className="w-full">
                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <FaSearch className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                                </div>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-auto flex flex-col md:flex-row space-y-2 md:space-y-0 items-stretch md:items-center justify-end md:space-x-3 flex-shrink-0">
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
                                    <div className="w-80">
                                        <Dropdown.Header>
                                            <span className="text-base font-medium text-gray-900 dark:text-white">
                                                Filter
                                            </span>
                                        </Dropdown.Header>

                                        <Accordion title="Categorie">
                                            <Accordion.Body>
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
                                            </Accordion.Body>
                                        </Accordion>

                                        <Dropdown.Divider />

                                        <Accordion title="Categorie">
                                            <Accordion.Body>
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
                                            </Accordion.Body>
                                        </Accordion>

                                        <Dropdown.Divider />

                                        <Accordion title="Categorie">
                                            <Accordion.Body>
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
                                            </Accordion.Body>
                                        </Accordion>

                                        <Dropdown.Divider />

                                        <div className="flex justify-center py-2">
                                            <Button type="button">
                                                Filtré les résultat
                                            </Button>
                                        </div>
                                    </div>
                                </Dropdown>
                            </div>

                            <Link href={route("admin.brands.create")}>
                                <Button btn="primary" type="button">
                                    Créer un Brand
                                </Button>
                            </Link>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <Table className="table-auto">
                            <Table.Head>
                                <Table.Row>
                                    <Table.Title className="px-2 py-3"></Table.Title>
                                    <Table.Title className="px-2 py-3">
                                        Brand
                                    </Table.Title>
                                    <Table.Title className="px-2 py-3">
                                        N° produit
                                    </Table.Title>
                                    <Table.Title className="px-2 py-3">
                                        Créer à
                                    </Table.Title>
                                    <Table.Title className="px-2 py-3">
                                        modifier à
                                    </Table.Title>
                                    <Table.Title className="px-2 py-3"></Table.Title>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                {filteredData.map((record) => {
                                    return (
                                        <Table.Row
                                            key={record.id}
                                            className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                        >
                                            <Table.Title className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                                <img
                                                    className="w-16 max-w-full max-h-full"
                                                    src={`/media/${record.logo}`}
                                                />
                                            </Table.Title>
                                            <Table.Column className="px-2 py-4 capitalize ">
                                                {record.name}
                                            </Table.Column>
                                            <Table.Column className="px-2 py-4 capitalize ">
                                                {record.products_count}
                                            </Table.Column>
                                            <Table.Column className="px-2 py-4 ">
                                                {record.created_at}
                                            </Table.Column>
                                            <Table.Column className="px-2 py-4 ">
                                                {record.updated_at}
                                            </Table.Column>
                                            <Table.Column className="px-2 py-4 ">
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
                                                                <Link
                                                                    href={route(
                                                                        "admin.brands.edit",
                                                                        {
                                                                            id: record.id,
                                                                        }
                                                                    )}
                                                                    className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                                                >
                                                                    Éditer
                                                                </Link>
                                                            </li>
                                                        </ul>
                                                        <div className="py-1">
                                                            <span
                                                                className="block py-2 cursor-pointer px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                                                                onClick={(e) =>
                                                                    openDeleteModal(record)
                                                                }
                                                            >
                                                                Supprimé
                                                            </span>
                                                        </div>
                                                    </div>
                                                </Dropdown>
                                            </Table.Column>
                                        </Table.Row>
                                    );
                                })}
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

            <Modal show={deleteModal.status} maxWidth="lg">
                <div className="py-6 px-4">
                    <div className="mb-3 text-gray-400 dark:text-gray-200">
                        {processing ? (
                            <FaSpinner className="animate-spin w-12 h-12 mx-auto" />
                        ) : (
                            <IoMdInformationCircleOutline className="w-12 h-12 mx-auto" />
                        )}
                    </div>
                    {deleteModal.brand && (
                        <>
                            <h3 className="text-center mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Vous étes sur de vouloir supprimé le brand{" "}
                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                    {deleteModal.brand.name}
                                </span>
                            </h3>
                            <div className="flex items-center gap-4 justify-center">
                                <Button
                                    disabled={processing}
                                    onClick={deleteBrand}
                                    btn="danger"
                                >
                                    Supprimé
                                </Button>

                                <InlineButton
                                    disabled={processing}
                                    onClick={() => setDeleteModal({ status: false })}
                                >
                                    Annuler
                                </InlineButton>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </AdminLayout>
    );
};

export default Index;
