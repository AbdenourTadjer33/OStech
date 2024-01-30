import React, { createContext } from "react";
import { useForm } from "laravel-precognition-react-inertia";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import FileUpload from "@/Components/FileUpload";
import Button from "@/Components/Button";
import LogoUpload from "./LogoUpload";

const CreateBrandFormContext = createContext();

const CreateForm = ({}) => {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        validate,
        forgetError,
        reset,
    } = useForm("post", route("admin.settings.roles.store"), {
        name: "",
        logo: "",
    });

    const submitHandler = (e) => {
        e.preventDefault();
        const triggers = ["submitAndRedirect", "submitAndDontRedirect"];
        const submitTrigger = e.nativeEvent.submitter;
        if (triggers.includes(submitTrigger.id)) {
            post(
                route("admin.brands.store", {
                    redirect: submitTrigger.id == "submitAndRedirect" ? 1 : 0,
                }),
                {
                    onSuccess: () => reset(),
                }
            );
        }
    };
    return (
        <CreateBrandFormContext.Provider value={null}>
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
                                    forgetError("name");
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
                        <InputLabel value="logo" className="mb-2" />
                        {/* <FileUpload /> */}
                        <LogoUpload />
                    </div>

                    <div className="flex items-center justify-end gap-4">
                        <Button
                            id="submitAndDontRedirect"
                            disabled={processing}
                        >
                            Ajouté
                        </Button>

                        <Button id="submitAndRedirect" disabled={processing}>
                            Ajouté et revenir à la page précedents
                        </Button>
                    </div>
                </form>
            </div>
        </CreateBrandFormContext.Provider>
    );
};

export default CreateForm;
