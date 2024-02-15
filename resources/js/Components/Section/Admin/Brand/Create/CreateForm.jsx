import React, { createContext, useEffect } from "react";
import { useForm } from "laravel-precognition-react-inertia";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Button from "@/Components/Button";
import LogoUpload from "./LogoUpload";
import ProgressBar from "@/Components/ProgressBar";
import Spinner from "@/Components/Icons/Spinner";

export const CreateBrandFormContext = createContext();

const CreateForm = ({}) => {
    const {
        data,
        setData,
        post,
        processing,
        progress,
        errors,
        validate,
        forgetError,
        reset,
    } = useForm("post", route("admin.brands.store"), {
        name: "",
        image: null,
    });

    const cleanError = (name) => {
        forgetError(name);
        errors.name = "";
    };

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.brands.store"));

    };
    return (
        <CreateBrandFormContext.Provider
            value={{ progress, data, setData, errors, cleanError }}
        >
            <div className="mx-auto mt-5 p-4 max-w-4xl dark:bg-gray-900 rounded-lg shadow-xl border dark:border-gray-700">

                <h1 className="text-4xl font-bold mb-7">Créer un Brand</h1>
                <form onSubmit={submitHandler} encType="multipart/form-data">
                    <div className="mb-5">
                        <div>
                            <InputLabel
                                htmlFor="name"
                                value={`name`}
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
                            <InputError
                                message={errors.name}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="mb-5">
                        <LogoUpload />
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Button btn="primary" disabled={processing}>
                            {processing && <Spinner />}
                            Ajouté
                        </Button>
                    </div>
                </form>
            </div>
        </CreateBrandFormContext.Provider>
    );
};

export default CreateForm;
