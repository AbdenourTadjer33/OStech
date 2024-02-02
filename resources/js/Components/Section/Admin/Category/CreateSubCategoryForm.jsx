import React, { useContext } from "react";
import { useForm } from "laravel-precognition-react-inertia";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import Dropdown from "@/Components/Dropdown";
import RadioInput from "@/Components/RadioInput";
import { CategoiesContext } from "@/Pages/Admin/Category/Index";

const CreateSubCategoryForm = () => {
    const { setSubCategoryModal, parentCategories } =
        useContext(CategoiesContext);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        validate,
        forgetError,
        reset,
    } = useForm("post", route("admin.categories.storeSubCategory"), {
        name: "",
        description: "",
        category_id: "",
    });

    const cleanError = (name) => {
        forgetError(name);
        errors.name = "";
    };

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.categories.storeSubCategory"), {
            onSuccess: () => {
                reset();
                setSubCategoryModal(false)
            }
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold mb-7 text-gray-900 dark:text-white">
                Créer une sous-catégorie
            </h1>

            <form onSubmit={submitHandler} encType="multipart/form-data">
                <div className="mb-5">
                    <InputLabel
                        htmlFor="name"
                        value={`Nom de la sous-catégory`}
                        className="mb-2"
                    />
                    <TextInput
                        name="name"
                        id="name"
                        value={data.name}
                        onChange={(e) => {
                            setData("name", e.target.value);
                            cleanError("name");
                        }}
                        onBlur={(e) => validate("name")}
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div className="mb-5">
                    <InputLabel value="Catégorie" className="mb-2" />
                    <Dropdown dismissOnClick={false}>
                        <Dropdown.Trigger>
                            <button
                                className="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-start"
                                type="button"
                            >
                                Sélectionnez une catégorie
                            </button>
                        </Dropdown.Trigger>
                        <Dropdown.Content
                            align="left"
                            width="w-full"
                            className=""
                        >
                            <ul className="text-sm font-medium overflow-hidden text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                {parentCategories.map((category) => {
                                    return (
                                        <li
                                            key={crypto.randomUUID()}
                                            className="w-full border-b border-gray-200 dark:border-gray-600 hover:dark:bg-gray-600 hover:bg-gray-200 transition duration-150"
                                        >
                                            <div className="flex items-center ps-3">
                                                <RadioInput
                                                    id={category.id}
                                                    name="category_id"
                                                    data-label={category.name}
                                                    value={category.id}
                                                    checked={
                                                        data.category_id ==
                                                        category.id
                                                    }
                                                    onChange={(e) => {
                                                        setData(
                                                            "category_id",
                                                            e.target.value
                                                        );
                                                        forgetError(
                                                            "category_id"
                                                        );
                                                    }}
                                                />
                                                <InputLabel
                                                    htmlFor={category.id}
                                                    value={category.name}
                                                    className="flex-1 ms-2 py-3"
                                                />
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>
                        </Dropdown.Content>
                    </Dropdown>
                    <InputError message={errors.role_id} className="mt-2" />
                </div>

                <div className="mb-5">
                    <InputLabel
                        htmlFor="description"
                        value={`description de la sous-catégorie`}
                        className="mb-2"
                    />
                    <TextInput
                        name="description"
                        id="description"
                        value={data.description}
                        onChange={(e) => {
                            setData("description", e.target.value);
                            cleanError("description");
                        }}
                        onBlur={(e) => validate("description")}
                    />
                    <InputError message={errors.description} className="mt-2" />
                </div>

                <div className="flex items-center justify-end gap-4">
                    <Button btn="primary" disabled={processing}>
                        Ajouté
                    </Button>

                    <Button
                        btn="danger"
                        type="button"
                        disabled={processing}
                        onClick={(e) => setSubCategoryModal(false)}
                    >
                        Annuler
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateSubCategoryForm;
