import React, { createContext } from "react";
import { useForm } from "laravel-precognition-react-inertia";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Button from "@/Components/Button";
import LogoEdit from "./LogoEdit";
import Spinner from "@/Components/Icons/Spinner";



export const EditBrandFormContext = createContext();

const EditForm = ({brand}) => {
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
    } = useForm("post", route("admin.brands.update", {id: brand.id}), {
        name: brand.name,
        image: brand.logo,
    });

    const cleanError = (name) => {
        forgetError(name);
        errors.name = "";
    };

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.brands.update", {id: brand.id}));
    };

    return (
        <EditBrandFormContext.Provider value={{data, setData}}>
            <div className="mx-auto mt-5 p-4 max-w-4xl dark:bg-gray-900 rounded-lg shadow-xl border dark:border-gray-700">
                <h1 className="text-4xl font-bold mb-7">Editer un brand</h1>
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
                        <LogoEdit/>
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Button disabled={processing}>
                            {processing && <Spinner />}
                            Edit
                        </Button>
                    </div>
                </form>
            </div>
        </EditBrandFormContext.Provider>
    );
};

export default EditForm;
