import React, { createContext, useContext, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";

import AdminLayout from "@/Layouts/AdminLayout";
import CreateCategoryForm from "@/Components/Section/Admin/Category/CreateCategoryForm";
import CreateSubCategoryForm from "@/Components/Section/Admin/Category/CreateSubCategoryForm";

import IndexHeader from "@/Components/Section/Admin/IndexHeader";
import Table from "@/Components/Table";
import Tab from "@/Components/Tab";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import InlineButton from "@/Components/InlineButton";
import { MdModeEdit, MdDelete, MdOpenInNew } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

export const CategoiesContext = createContext();

const Index = ({ categories, parentCategories, subCategories }) => {
    const [categoryModal, setCategoryModal] = useState(false);
    const [subCategoryModal, setSubCategoryModal] = useState(false);

    return (
        <CategoiesContext.Provider
            value={{
                setCategoryModal,
                setSubCategoryModal,
                parentCategories,
                subCategories,
            }}
        >
            <AdminLayout>
                <Head title="Sections & Categoies" />

                {/* <IndexHeader
                title="Section et catégorie"
                routeName="admin.categories.create"
                action="Créer une catégorie"
            /> */}

                <div className="mb-4 flex items-center gap-4">
                    <Button onClick={(e) => setCategoryModal(true)}>
                        Create Category
                    </Button>
                    <Button
                        onClick={(e) => {
                            setSubCategoryModal(true);
                        }}
                    >
                        Create sub Category
                    </Button>
                </div>

                <Tab>
                    <Tab.TitleList>
                        <Tab.Title>catégorie</Tab.Title>
                        <Tab.Title>Sous catégorie</Tab.Title>
                    </Tab.TitleList>
                    <Tab.ContentList>
                        <Tab.Content>
                            <CategoryData />
                        </Tab.Content>
                        <Tab.Content>
                            <SubCategoryData />
                        </Tab.Content>
                    </Tab.ContentList>
                </Tab>

                <Modal show={categoryModal} closeable={false} maxWidth="4xl">
                    <CreateCategoryForm />
                </Modal>

                <Modal show={subCategoryModal} closeable={false} maxWidth="4xl">
                    <CreateSubCategoryForm />
                </Modal>
            </AdminLayout>
        </CategoiesContext.Provider>
    );
};

const CategoryData = () => {
    const { parentCategories } = useContext(CategoiesContext);
    const { delete: destroy, processing } = useForm();
    const [deleteModal, setDeleteModal] = useState({ status: false });

    const findCategory = (id) => {
        return parentCategories.find((category) => category.id == id);
    };

    const openDeleteModal = (id) => {
        setDeleteModal({
            status: true,
            category: findCategory(id),
        });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ status: false });
    };

    const deleteCategory = (id) => {
        destroy(route("admin.categories.destroyCategory", { id: id }), {
            onSuccess: () => closeDeleteModal(),
        });
    };
    return (
        <>
            <div className="relative w-full overflow-x-auto shadow-md rounded-lg mb-4">
                <Table className="table-auto">
                    <Table.Head>
                        <Table.Row>
                            <Table.Title className="px-2 py-3">
                                Catégorie
                            </Table.Title>
                            <Table.Title className="px-2 py-3">
                                Créer à
                            </Table.Title>
                            <Table.Title className="px-2 py-3">
                                Action
                            </Table.Title>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {parentCategories.map((record) => {
                            return (
                                <Table.Row
                                    key={record.slug}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <Table.Title className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        {record.name}
                                    </Table.Title>
                                    <Table.Column className="px-2 py-4 capitalize ">
                                        {record.created_at}
                                    </Table.Column>
                                    <Table.Column className="px-2 py-4 space-x-3">
                                        <Link
                                            href={route(
                                                "admin.settings.users.edit",
                                                { uuid: record.id }
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

            <Modal show={deleteModal.status} maxWidth="lg" closeable={false}>
                <div className="py-6 px-4">
                    <div className="mb-3 text-gray-400 dark:text-gray-200">
                        {processing ? (
                            <FaSpinner className="animate-spin w-12 h-12 mx-auto" />
                        ) : (
                            <IoMdInformationCircleOutline className="w-12 h-12 mx-auto" />
                        )}
                    </div>
                    {deleteModal.category && (
                        <>
                            <h3 className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Vous étes sur de vouloir supprimé la catégory{" "}
                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                    {deleteModal.category?.name}
                                </span>
                            </h3>

                            <div className="flex items-center gap-4 justify-end">
                                <Button
                                    onClick={(e) =>
                                        deleteCategory(deleteModal.category?.id)
                                    }
                                    btn="danger"
                                    disabled={processing}
                                >
                                    Supprimé
                                </Button>

                                <InlineButton
                                    onClick={closeDeleteModal}
                                    disabled={processing}
                                >
                                    Annuler
                                </InlineButton>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
};

const SubCategoryData = () => {
    const { subCategories, parentCategories } = useContext(CategoiesContext);
    const { delete: destroy, processing } = useForm();
    const [deleteModal, setDeleteModal] = useState({ status: false });

    const findSubCategory = (id) => {
        return subCategories.find((category) => category.id == id);
    };

    const openDeleteModal = (id) => {
        setDeleteModal({
            status: true,
            subCategory: findSubCategory(id),
        });
    };

    const closeDeleteModal = () => {
        setDeleteModal({ status: false });
    };

    const deleteCategory = (id) => {
        destroy(route("admin.categories.destroySubCategory", { id: id }), {
            onSuccess: () => closeDeleteModal(),
        });
    };

    return (
        <>
            <div className="relative w-full overflow-x-auto shadow-md rounded-lg mb-4">
                <Table className="table-auto">
                    <Table.Head>
                        <Table.Row>
                            <Table.Title className="px-2 py-3">
                                Sous-Catégorie
                            </Table.Title>
                            <Table.Title className="px-2 py-3">
                                Catégorie
                            </Table.Title>
                            <Table.Title className="px-2 py-3">
                                Créer à
                            </Table.Title>
                            <Table.Title className="px-2 py-3">
                                Action
                            </Table.Title>
                        </Table.Row>
                    </Table.Head>
                    <Table.Body>
                        {subCategories.map((record) => {
                            return (
                                <Table.Row
                                    key={record.slug}
                                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                                >
                                    <Table.Title className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        {record.name}
                                    </Table.Title>
                                    <Table.Title className="px-6 py-4 font-medium text-gray-900  dark:text-white">
                                        {record.parent?.name}
                                    </Table.Title>
                                    <Table.Column className="px-2 py-4 capitalize ">
                                        {record.created_at}
                                    </Table.Column>
                                    <Table.Column className="px-2 py-4 space-x-3">
                                        <Link
                                            href={route(
                                                "admin.settings.users.edit",
                                                { uuid: record.id }
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

            <Modal show={deleteModal.status} maxWidth="lg" closeable={false}>
                <div className="py-6 px-4">
                    <div className="mb-3 text-gray-400 dark:text-gray-200">
                        {processing ? (
                            <FaSpinner className="animate-spin w-12 h-12 mx-auto" />
                        ) : (
                            <IoMdInformationCircleOutline className="w-12 h-12 mx-auto" />
                        )}
                    </div>
                    {deleteModal.subCategory && (
                        <>
                            <h3 className="mb-2 text-lg font-normal text-gray-500 dark:text-gray-400">
                                Vous étes sur de vouloir supprimé la catégory{" "}
                                <span className="font-medium text-gray-700 dark:text-gray-200">
                                    {deleteModal.subCategory?.name}
                                </span>
                            </h3>

                            <div className="flex items-center gap-4 justify-end">
                                <Button
                                    onClick={(e) =>
                                        deleteCategory(deleteModal.subCategory?.id)
                                    }
                                    btn="danger"
                                    disabled={processing}
                                >
                                    Supprimé
                                </Button>

                                <InlineButton
                                    onClick={closeDeleteModal}
                                    disabled={processing}
                                >
                                    Annuler
                                </InlineButton>
                            </div>
                        </>
                    )}
                </div>
            </Modal>
        </>
    );
};

export default Index;
