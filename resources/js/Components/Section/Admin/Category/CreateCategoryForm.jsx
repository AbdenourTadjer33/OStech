import React, { useContext } from "react";
import { useForm } from "laravel-precognition-react-inertia";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Button from "@/Components/Button";
import InputError from "@/Components/InputError";
import Spinner from "@/Components/Icons/Spinner";
import { CategoiesContext } from "@/Pages/Admin/Category/Index";

const CreateCategoryForm = () => {

    const { setCategoryModal } = useContext(CategoiesContext);

    const {
        data,
        setData,
        post,
        processing,
        errors,
        validate,
        forgetError,
        reset,
    } = useForm("post", route("admin.categories.storeCategory"), {
        name: "",
        description: "",
    });

    const cleanError = (name) => {
        forgetError(name);
        errors.name = "";
    };

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.categories.storeCategory"), {
            onSuccess: () => {
                reset();
                setCategoryModal(false);
            },
        });
    };

    return (
        <div className="p-4">
            <h1 className="text-4xl font-bold mb-7 text-gray-900 dark:text-white">
                Créer une Catégorie
            </h1>

            <form onSubmit={submitHandler} encType="multipart/form-data">
                <div className="mb-5">
                    <InputLabel
                        htmlFor="name"
                        value={`Nom de la catégorie`}
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
                    <InputLabel
                        htmlFor="description"
                        value={`description de la catégorie`}
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
                        {processing && <Spinner />}
                        Ajouté
                    </Button>

                    <Button
                        type="button"
                        btn="danger"
                        onClick={(e) => setCategoryModal(false)}
                        disabled={processing}
                    >
                        Annuler
                    </Button>
                </div>
            </form>
        </div>
    );
};

export default CreateCategoryForm;
