import React, { createContext } from "react";
import { useForm } from "laravel-precognition-react-inertia";

import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import RadioInput from "@/Components/RadioInput";
import Button from "@/Components/Button";
import Dropdown from "@/Components/Dropdown";
import PermissionTree from "./PermissionTree";

export const CreateRoleFormContext = createContext();

const CreateForm = () => {
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
        description: "",
        permission: null,
        permissions: [],
    });

    const submitHandler = (e) => {
        e.preventDefault();
        const triggers = ["submitAndRedirect", "submitAndDontRedirect"];
        const submitTrigger = e.nativeEvent.submitter;
        if (triggers.includes(submitTrigger.id)) {
            post(route("admin.settings.roles.store", {redirect: submitTrigger.id == "submitAndRedirect" ? 1 : 0}),{
                onSuccess: () => reset(),
            });
        }
    };
    return (
        <CreateRoleFormContext.Provider value={{ data, setData, processing }}>
            <div className="mx-auto mt-5 p-4 max-w-4xl dark:bg-gray-900 rounded-lg shadow-xl border dark:border-gray-700">
                <h1 className="text-4xl font-bold mb-7">Créer un Role</h1>

                <form onSubmit={submitHandler} encType="multipart/form-data">
                    <div className="grid gap-4 mb-5 lg:grid-cols-2">
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

                        <div>
                            <InputLabel value="Role" className="mb-2" />
                            <Dropdown dismissOnClick={false}>
                                <Dropdown.Trigger>
                                    <button
                                        className="capitalize bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 text-start"
                                        type="button"
                                    >
                                        Sélectionnez le type de permission
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content
                                    align="left"
                                    width="w-full"
                                    className=""
                                >
                                    <ul className="text-sm font-medium overflow-hidden text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                        <li className="w-full border-b border-gray-200 dark:border-gray-600 hover:dark:bg-gray-600 hover:bg-gray-200 transition duration-150">
                                            <div className="flex items-center ps-3">
                                                <RadioInput
                                                    id="all"
                                                    name="permission"
                                                    value="all"
                                                    checked={
                                                        data.permission == "all"
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "permission",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <InputLabel
                                                    htmlFor="all"
                                                    value="Tous les permissions"
                                                    className="flex-1 ms-2 py-3"
                                                />
                                            </div>
                                        </li>
                                        <li className="w-full border-b border-gray-200 dark:border-gray-600 hover:dark:bg-gray-600 hover:bg-gray-200 transition duration-150">
                                            <div className="flex items-center ps-3">
                                                <RadioInput
                                                    id={"custom"}
                                                    name="permission"
                                                    value="custom"
                                                    checked={
                                                        data.permission ==
                                                        "custom"
                                                    }
                                                    onChange={(e) =>
                                                        setData(
                                                            "permission",
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                                <InputLabel
                                                    htmlFor="custom"
                                                    value="Permissions personnalisé"
                                                    className="flex-1 ms-2 py-3"
                                                />
                                            </div>
                                        </li>
                                    </ul>
                                </Dropdown.Content>
                            </Dropdown>
                            <InputError
                                message={errors.permission}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="mb-5">
                        <InputLabel
                            htmlFor="description"
                            value="description"
                            className="mb-2"
                        />
                        <TextInput
                            name="description"
                            id="description"
                            value={data.description}
                            onChange={(e) => {
                                setData("description", e.target.value);
                                forgetError("description");
                            }}
                            onBlur={(e) => validate("description")}
                        />
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>

                    <div
                        className={`mb-5 ${
                            data.permission != "all" ? "" : "hidden"
                        }`}
                    >
                        <PermissionTree />
                        <InputError
                            message={errors.permissions}
                            className="mt-2"
                        />
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
        </CreateRoleFormContext.Provider>
    );
};

export default CreateForm;
