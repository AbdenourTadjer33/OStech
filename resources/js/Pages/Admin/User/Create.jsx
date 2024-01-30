import React, { useRef } from "react";
import { Head, router } from "@inertiajs/react";
import { useForm } from "laravel-precognition-react-inertia";
import axios from "axios";

import AdminLayout from "@/Layouts/AdminLayout";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Toggle from "@/Components/Toggle";
import Button from "@/Components/Button";
import Dropdown from "@/Components/Dropdown";
import RadioInput from "@/Components/RadioInput";
import SmallButton from "@/Components/SmallButton";

const Create = ({ roles }) => {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        validate,
        forgetError,
        reset,
    } = useForm("post", route("admin.settings.users.store"), {
        name: "",
        role_id: null,
        status: true,
        email: "",
        password: "",
    });

    const passwordInputRef = useRef();
    const generatePassword = async (e) => {
        const response = await axios.get(route("api.admin.generate.password"));
        setData("password", response.data);
        return;
    };

    const selectHandler = (e) => {
        setData("role_id", e.target.value);
        forgetError("role_id");
    };

    const submitHandler = (e) => {
        e.preventDefault();
        const triggers = ["submitAndRedirect", "submitAndDontRedirect"];
        const submitTrigger = e.nativeEvent.submitter;
        if (triggers.includes(submitTrigger.id)) {
            post(
                route("admin.settings.users.store", {
                    redirect: submitTrigger.id == "submitAndRedirect" ? 1 : 0,
                }),
                {
                    onSuccess: () => reset(),
                }
            );
        }
    };

    return (
        <AdminLayout>
            <Head title="Créer admin" />

            <div className="mx-auto mt-5 p-4 max-w-4xl dark:bg-gray-900 rounded-lg shadow-xl border dark:border-gray-700">
                <h1 className="text-4xl font-bold mb-7">Créer un Admin</h1>
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
                                        Sélectionnez un role
                                    </button>
                                </Dropdown.Trigger>
                                <Dropdown.Content
                                    align="left"
                                    width="w-full"
                                    className=""
                                >
                                    <ul className="text-sm font-medium overflow-hidden text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                                        {roles.map((role) => {
                                            return (
                                                <li
                                                    key={crypto.randomUUID()}
                                                    className="w-full border-b border-gray-200 dark:border-gray-600 hover:dark:bg-gray-600 hover:bg-gray-200 transition duration-150"
                                                >
                                                    <div className="flex items-center ps-3">
                                                        <RadioInput
                                                            id={role.id}
                                                            name="role_id"
                                                            data-label={
                                                                role.name
                                                            }
                                                            value={role.id}
                                                            checked={
                                                                data.role_id ==
                                                                role.id
                                                            }
                                                            onChange={
                                                                selectHandler
                                                            }
                                                        />
                                                        <InputLabel
                                                            htmlFor={role.id}
                                                            value={role.name}
                                                            className="flex-1 ms-2 py-3"
                                                        />
                                                    </div>
                                                </li>
                                            );
                                        })}
                                    </ul>
                                </Dropdown.Content>
                            </Dropdown>
                            <InputError
                                message={errors.role_id}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <AlertInfoStatus />
                    <div className="mb-5">
                        <div className="flex items-center space-x-5">
                            <InputLabel htmlFor="status" value="Status" />
                            <Toggle
                                className=" scale-125"
                                id="status"
                                name="status"
                                defaultChecked={data.status}
                                onChange={(e) => {
                                    setData("status", e.target.checked);
                                    forgetError("status");
                                }}
                            />
                            <InputError
                                message={errors.status}
                                className="mt-2"
                            />
                        </div>
                    </div>

                    <div className="grid gap-4 mb-5 lg:grid-cols-2">
                        <div>
                            <InputLabel
                                htmlFor="email"
                                value="email"
                                className="mb-2"
                            />
                            <TextInput
                                name="email"
                                id="email"
                                value={data.email}
                                onChange={(e) => {
                                    setData("email", e.target.value);
                                    forgetError("email");
                                }}
                                onBlur={(e) => validate("email")}
                            />
                            <InputError
                                message={errors.email}
                                className="mt-2"
                            />
                        </div>
                        <div>
                            <div className="mb-2 flex items-center justify-between gap-3">
                                <InputLabel value="password" />
                                <SmallButton
                                    type="button"
                                    onClick={generatePassword}
                                >
                                    Générer password
                                </SmallButton>
                            </div>
                            <TextInput
                                ref={passwordInputRef}
                                name="password"
                                id="password"
                                value={data.password}
                                type="text"
                                onChange={(e) => {
                                    setData("password", e.target.value);
                                }}
                            />
                            <InputError
                                message={errors.password}
                                className="mt-2"
                            />
                        </div>
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
        </AdminLayout>
    );
};

export default Create;

const AlertInfoStatus = () => (
    <div
        className="p-4 mb-5 text-base text-blue-800 rounded-lg bg-blue-50 dark:bg-gray-800 dark:text-blue-400"
        role="alert"
    >
        <span className="text-xl font-bold">Note :</span> Lorsque le statut est
        vérifié, l'utilisateur créé recevra un mail pour accéder à l'espace
        Admin. Sinon, il sera créé mais il ne peut pas accéder à la plateforme,
        il s'agit d'une startigie pour la gestion des employés.
    </div>
);
