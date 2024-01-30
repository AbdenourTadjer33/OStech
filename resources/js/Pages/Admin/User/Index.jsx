import React, { useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";

import { MdOpenInNew, MdModeEdit, MdDelete } from "react-icons/md";
import { IoMdSearch, IoMdInformationCircleOutline } from "react-icons/io";
import { FaSpinner } from "react-icons/fa";

import AdminLayout from "@/Layouts/AdminLayout";
import Button from "@/Components/Button";
import Table from "@/Components/Table";
import Pagination from "@/Components/Pagination";
import Modal from "@/Components/Modal";
import InlineButton from "@/Components/InlineButton";
import Checkbox from "@/Components/Checkbox";

const Index = ({ users }) => {
    const { delete: destroy, processing } = useForm();
    const [open, setOpen] = useState({ status: false });
    const { data, current_page, next_page_url, prev_page_url, links, total } =
        users;

    const findAdmin = (uuid) => {
        return data.find((admin) => admin.uuid == uuid);
    };

    const openDeleteModal = (uuid) => {
        setOpen({ status: true, admin: findAdmin(uuid) });
    };

    const closeModal = () => {
        setOpen({ status: false });
    };

    const deleteAdmin = (e) => {
        destroy(
            route("admin.settings.users.destroy", {
                uuid: open.admin.uuid,
                trash: open.trash,
            }),
            {
                onSuccess: () => closeModal(),
            }
        );
    };

    return (
        <AdminLayout>
            <Head title="Users" />

            <h1 className="text-4xl font-bold mb-3">Administrateur</h1>

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
                <Link href={route("admin.settings.users.create")}>
                    <Button type="">Créer un Admin</Button>
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
                                email
                            </Table.Title>
                            <Table.Title className="px-2 py-3">
                                status
                            </Table.Title>
                            <Table.Title className="px-2 py-3">
                                role
                            </Table.Title>
                            <Table.Title className="px-2 py-3 ">
                                créer à
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
                                    key={record.uuid}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <Table.Title className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        {record.uuid}
                                    </Table.Title>
                                    <Table.Column className="px-2 py-4 capitalize ">
                                        {record.name}
                                    </Table.Column>
                                    <Table.Column className="px-2 py-4">
                                        {record.email}
                                    </Table.Column>
                                    <Table.Column className="px-2 py-4">
                                        {record.status ? (
                                            <div className="h-2.5 w-2.5 rounded-full bg-green-500 ms-2"></div>
                                        ) : (
                                            <div className="h-2.5 w-2.5 rounded-full bg-red-500 ms-2"></div>
                                        )}
                                    </Table.Column>
                                    <Table.Column className="px-2 py-4 capitalize">
                                        {record.role.name}
                                    </Table.Column>
                                    <Table.Column className="px-2 py-4 ">
                                        {record.created_at}
                                    </Table.Column>
                                    <Table.Column className="px-2 py-4 space-x-3">
                                        <span className="inline-block font-medium text-secondary-600 dark:text-secondary-400">
                                            <MdOpenInNew className="w-5 h-5" />
                                        </span>
                                        <Link
                                            href={route(
                                                "admin.settings.users.edit",
                                                { uuid: record.uuid }
                                            )}
                                            className="inline-block font-medium text-primary-600 dark:text-primary-500"
                                        >
                                            <MdModeEdit className="w-5 h-5" />
                                        </Link>

                                        <span
                                            onClick={(e) =>
                                                openDeleteModal(record.uuid)
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
                    {open.admin && (
                        <>
                            <h3 className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Vous étes sur de vouloir supprimé l'admin{" "}
                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                    {open.admin.name}
                                </span>
                            </h3>
                            <label className="block mb-3 text-gray-800 dark:text-gray-50 select-none">
                                <Checkbox
                                    onChange={(e) =>
                                        setOpen({
                                            ...open,
                                            trash: e.target.checked,
                                        })
                                    }
                                />
                                Supprimé définitivement
                            </label>
                            <div className="flex items-center gap-4 justify-end">
                                <Button
                                    onClick={deleteAdmin}
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
