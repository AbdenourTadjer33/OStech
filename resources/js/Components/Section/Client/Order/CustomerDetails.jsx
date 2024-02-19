import React, { useContext, Fragment, useState } from "react";
import { CreateOrderContext } from "./CreateOrder";
import { Combobox, Transition } from "@headlessui/react";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";

import wilaya from '@/data/wilaya.json'


const CustomerDetails = () => {
    const { data, setData, errors } = useContext(CreateOrderContext);
    const [query, setQuery] = useState("");

    const filteredWilaya =
        query === ""
            ? wilaya
            : wilaya.filter((wilaya) =>
                  wilaya.name
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    return (
        <div className="grid gap-4 sm:grid-cols-3">
            <div>
                <InputLabel htmlFor="name" required className="mb-2">
                    Nom Prénom
                </InputLabel>
                <TextInput
                    id="name"
                    name="name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                />
                <InputError message={errors.name} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="phone" required className="mb-2">
                    N° tél
                </InputLabel>

                <TextInput
                    id="phone"
                    name="phone"
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                />
                <InputError message={errors.phone} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="email" required className="mb-2">
                    Email
                </InputLabel>
                <TextInput
                    id="email"
                    name="email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                />
                <InputError message={errors.email} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="address" required className="mb-2">
                    Adresse
                </InputLabel>
                <TextInput
                    id="address"
                    name="address"
                    value={data.address}
                    onChange={(e) => setData("address", e.target.value)}
                />
                <InputError message={errors.address} className="mt-2" />
            </div>

            <div>
                <InputLabel htmlFor="city" required className="mb-2">
                    Ville
                </InputLabel>
                <TextInput
                    id="city"
                    name="city"
                    value={data.city}
                    onChange={(e) => setData("city", e.target.value)}
                />
                <InputError message={errors.city} className="mt-2" />
            </div>

            <div>
                <InputLabel required className="mb-2">
                    Wilaya
                </InputLabel>

                <Combobox
                    value={data.wilaya}
                    onChange={(e) => setData("wilaya", e)}
                >
                    <div className="relative">
                        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-black text-left">
                            <Combobox.Input
                                spellCheck={false}
                                className="w-full p-2.5 text-sm leading-5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                onChange={(event) =>
                                    setQuery(event.target.value)
                                }
                                displayValue={(obj) =>
                                    wilaya.find(
                                        (wilaya) => wilaya.code === data.wilaya
                                    )?.name
                                }
                            />
                            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <HiMiniChevronUpDown
                                    className="h-5 w-5 text-gray-800 dark:text-gray-400"
                                    aria-hidden="true"
                                />
                            </Combobox.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            afterLeave={() => setQuery("")}
                        >
                            <Combobox.Options className="absolute mt-1.5 max-h-60 w-full overflow-auto rounded-md bg-gray-50 dark:bg-gray-700 py-1 text-base sm:text-lg shadow-lg ring-1 ring-black/5 focus:outline-none z-50">
                                {filteredWilaya.length === 0 && query !== "" ? (
                                    <>
                                        <div className="relative cursor-default text-sm select-none px-2.5 py-2 text-gray-700 dark:text-gray-50">
                                            Wilaya recherché non trouvé
                                        </div>
                                    </>
                                ) : (
                                    filteredWilaya.map((wilaya) => (
                                        <Combobox.Option
                                            key={wilaya.code}
                                            value={wilaya.code}
                                            className={({ active }) =>
                                                `relative cursor-default select-none flex items-center gap-4 py-2 pl-4 pr-10 ${
                                                    active
                                                        ? "bg-primary-600 text-white"
                                                        : "text-gray-900 dark:text-gray-50"
                                                }`
                                            }
                                        >
                                            {({ selected, active }) => (
                                                <>
                                                    <span
                                                        className={`block truncate ${
                                                            selected
                                                                ? "font-medium"
                                                                : "font-normal"
                                                        }`}
                                                    >
                                                        {wilaya.code +
                                                            " - " +
                                                            wilaya.name}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className={`absolute inset-y-0 right-0 flex items-center pr-3 ${
                                                                active
                                                                    ? "text-gray-50"
                                                                    : "text-primary-600"
                                                            }`}
                                                        >
                                                            <FaCheck
                                                                className="h-5 w-5"
                                                                aria-hidden="true"
                                                            />
                                                        </span>
                                                    ) : null}
                                                </>
                                            )}
                                        </Combobox.Option>
                                    ))
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>

                <InputError message={errors.wilaya} className="mt-2" />
            </div> 
        </div>
    );
};

export default CustomerDetails;
