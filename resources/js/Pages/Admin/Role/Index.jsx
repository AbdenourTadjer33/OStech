import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";

import { MdOpenInNew, MdModeEdit, MdDelete } from "react-icons/md";
import { IoMdSearch, IoMdInformationCircleOutline } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";

import AdminLayout from "@/Layouts/AdminLayout";
import Table from "@/Components/Table";
import Pagination from "@/Components/Pagination";
import Button from "@/Components/Button";
import InlineButton from "@/Components/InlineButton";
import Modal from "@/Components/Modal";

const Index = ({ roles }) => {
    const { delete: destroy, processing } = useForm();
    const [open, setOpen] = useState({ status: false });
    const { data, current_page, next_page_url, prev_page_url, links, total, last_page } =
        roles;
    

    const findRole = (id) => {
        return data.find((role) => role.id == id);
    };

    const openDeleteModal = (id) => {
        setOpen({ status: true, role: findRole(id) });
    };

    const closeModal = () => {
        setOpen({ status: false });
    };

    const deleteRole = (e) => {
        destroy(
            route("admin.settings.roles.destroy", {
                id: open.role.id,
            }),
            {
                onSuccess: () => closeModal(),
            }
        );
    };

    return (
        <AdminLayout>
            <Head title="Roles" />
            <h1 className="text-4xl font-bold mb-3">Roles</h1>

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
                <Link href={route("admin.settings.roles.create")}>
                    <Button>Créer un role</Button>
                </Link>
            </div>

            <div className="relative w-full overflow-x-auto shadow-md rounded-lg mb-4">
                <Table className="table-auto">
                    <Table.Head>
                        <Table.Row>
                            <Table.Title className="px-6 py-3">id</Table.Title>
                            <Table.Title className="px-2 py-3">
                                name
                            </Table.Title>
                            <Table.Title className="px-2 py-3">
                                description
                            </Table.Title>
                            <Table.Title className="px-2 py-3">
                                type
                            </Table.Title>
                            <Table.Title className="px-2 py-3">
                                créer à
                            </Table.Title>
                            <Table.Title className="px-2 py-3 ">
                                modifiér à
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
                                    key={record.id}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <Table.Title className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        {record.id}
                                    </Table.Title>
                                    <Table.Column className="px-2 py-4 capitalize ">
                                        {record.name}
                                    </Table.Column>
                                    <Table.Column className="px-2 py-4">
                                        {record.description}
                                    </Table.Column>
                                    <Table.Column className="px-2 py-4">
                                        {record.permission == "all" ? (
                                            <span>Tous les permissions</span>
                                        ) : (
                                            <span>
                                                Permissions personnalisé
                                            </span>
                                        )}
                                    </Table.Column>
                                    <Table.Column className="px-2 py-4 capitalize">
                                        {record.created_at}
                                    </Table.Column>
                                    <Table.Column className="px-2 py-4 ">
                                        {record.updated_at == record.created_at
                                            ? ""
                                            : record.updated_at}
                                    </Table.Column>
                                    <Table.Column className="px-2 py-4 space-x-3">
                                        <span className="inline-block font-medium text-secondary-600 dark:text-secondary-400 cursor-pointer">
                                            <MdOpenInNew className="w-5 h-5" />
                                        </span>
                                        <Link
                                            href={route(
                                                "admin.settings.roles.edit",
                                                { id: record.id }
                                            )}
                                            className="inline-block font-medium text-primary-600 dark:text-primary-500"
                                        >
                                            <MdModeEdit className="w-5 h-5" />
                                        </Link>
                                        <span
                                            onClick={(e) =>
                                                openDeleteModal(record.id)
                                            }
                                            className="inline-block font-medium text-danger-600 dark:text-danger-500 cursor-pointer"
                                        >
                                            <MdDelete className="w-5 h-5" />
                                        </span>
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
                last_page={last_page}
                className={"text-right"}
            />

            <Modal show={open.status} maxWidth="lg">
                <div className="py-6 px-4">
                    <div className="mb-3 text-gray-400 dark:text-gray-200">
                        {processing ? (
                            <FaSpinner className="animate-spin w-12 h-12 mx-auto" />
                        ) : (
                            <IoMdInformationCircleOutline className="w-12 h-12 mx-auto" />
                        )}
                    </div>
                    {open.role && (
                        <>
                            <h3 className="text-center mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Vous étes sur de vouloir supprimé le role{" "}
                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                    {open.role.name}
                                </span>
                            </h3>
                            <div className="flex items-center gap-4 justify-center">
                                <Button
                                    onClick={deleteRole}
                                    btn="danger"
                                    disabled={processing}
                                >
                                    Supprimé
                                </Button>

                                <InlineButton
                                    onClick={closeModal}
                                    disabled={processing}
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
