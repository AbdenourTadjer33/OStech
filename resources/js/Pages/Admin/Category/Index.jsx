import React, { createContext, useContext, useState } from "react";
import { Head, Link, useForm } from "@inertiajs/react";

import AdminLayout from "@/Layouts/AdminLayout";
import CreateCategoryForm from "@/Components/Section/Admin/Category/CreateCategoryForm";
import CreateSubCategoryForm from "@/Components/Section/Admin/Category/CreateSubCategoryForm";

import Table from "@/Components/Table";
import Tab from "@/Components/Tab";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import InlineButton from "@/Components/InlineButton";
import {
    MdModeEdit,
    MdOutlineModeEditOutline,
    MdDelete,
    MdOpenInNew,
    MdAdd,
    MdOutlineCancelPresentation,
} from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";
import CategoryItem from "@/Components/Section/Admin/Category/Show/CategoryItem";
// import CategoryTree from "@/Components/Section/Admin/Category/Show/CategoryTree";

export const CategoiesContext = createContext();

const Index = ({ hierarchicalCategories }) => {
    const [categoryModal, setCategoryModal] = useState(false);
    const [subCategoryModal, setSubCategoryModal] = useState(false);

    const [isEdit, setIsEdit] = useState(false);

    const editCategory = () => {
        setIsEdit(true);
    };

    const cancelEdit = () => {
        setIsEdit(false);
    };

    return (
        <CategoiesContext.Provider value={{}}>
            <AdminLayout>
                <Head title="Categories & sous-categories" />
                <h1 className="text-3xl font-bold mb-3">
                    Categories & sous-categories
                </h1>

                <div className="flex gap-6 py-4 w-full overflow-y-auto">
                    {hierarchicalCategories.map((parentCategory) => (
                        <div
                            key={parentCategory.id}
                            className="w-full max-w-xs"
                        >
                            {/* <div className="w-full flex items-center justify-between px-4 py-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                                <h2
                                    contentEditable={isEdit}
                                    className="[&[contenteditable]]:focus:border-none [&[contenteditable]]:focus:outline-none text-xl font-bold tracking-tight text-gray-900 dark:text-white"
                                >
                                    {parentCategory.name}
                                </h2>

                                <div className="flex items-center gap-1">
                                    {isEdit ? (
                                        <>
                                            <div className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer">
                                                <MdOutlineModeEditOutline className="w-6 h-6" />
                                            </div>
                                            <div
                                                onClick={cancelEdit}
                                                className="text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
                                            >
                                                <MdOutlineCancelPresentation className="w-6 h-6" />
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <div className="text-gray-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 cursor-pointer">
                                                <MdAdd className="w-6 h-6" />
                                            </div>
                                            <div
                                                onClick={editCategory}
                                                className="text-gray-900 dark:text-white hover:text-info-600 dark:hover:text-info-400 cursor-pointer"
                                            >
                                                <MdModeEdit className="w-5 h-5" />
                                            </div>
                                            <div className="text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 cursor-pointer">
                                                <MdDelete className="w-5 h-5" />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div> */}

                            <CategoryItem category={parentCategory} />

                            <ul className="flex flex-col space-y-4 mt-4">
                                {Object.values(
                                    parentCategory?.subCategories
                                ).map((subCategory) => (
                                    <li
                                        key={subCategory.id}
                                        className="w-full flex items-center justify-between p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800/80 dark:border-gray-700/70 dark:hover:bg-gray-700"
                                    >
                                        <h4 className="text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                            {subCategory.name}
                                        </h4>

                                        <div className="flex items-center gap-2">
                                            <div className="text-gray-900 dark:text-white hover:text-info-600 dark:hover:text-info-400 cursor-pointer">
                                                <MdModeEdit className="w-4 h-4" />
                                            </div>
                                            <div className="text-gray-900 dark:text-white hover:text-red-600 dark:hover:text-red-400 cursor-pointer">
                                                <MdDelete className="w-4 h-4" />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* <div className="">
                    <div className="flex items-center justify-between">
                        {hierarchicalCategories.map((parentCategory) => (
                            <div key={parentCategory.id}>
                                {parentCategory.name}
                            </div>
                        ))}
                    </div>
                </div> */}

                {/* <div className="mb-4 flex items-center gap-4">
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
                </Modal> */}
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
                                        deleteCategory(
                                            deleteModal.subCategory?.id
                                        )
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
