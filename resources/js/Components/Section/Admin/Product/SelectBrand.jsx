import React, { Fragment, useContext, useState } from "react";
import { CreateProductFormContext } from "./CreateForm";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import { Combobox, Transition } from "@headlessui/react";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";

const SelectBrand = () => {
    const { data, setData, errors, option, brands } = useContext(
        CreateProductFormContext
    );
    const [query, setQuery] = useState("");
    const filteredBrands =
        query === ""
            ? brands
            : brands.filter((brand) =>
                  brand.name
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    return (
        <div>
            <InputLabel value="Sélectionnez une Brand" className="mb-2" />

            <Combobox value={data.brand} onChange={(e) => setData("brand", e)}>
                <div className="relative ">
                    <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-black text-left ">
                        <Combobox.Input
                            className="w-full p-2.5 text-sm leading-5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            displayValue={(brand) => brand?.name}
                            onChange={(event) => setQuery(event.target.value)}
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
                            {filteredBrands.length === 0 && query !== "" ? (
                                <div className="relative cursor-default select-none px-4 py-2 text-gray-700 dark:text-gray-50">
                                    Non trouvé.
                                </div>
                            ) : (
                                filteredBrands.map((brand) => (
                                    <Combobox.Option
                                        key={brand.id}
                                        className={({ active }) =>
                                            `relative cursor-default select-none flex items-center gap-4 py-2 pl-4 pr-10 ${
                                                active
                                                    ? "bg-primary-600 text-white"
                                                    : "text-gray-900 dark:text-gray-50"
                                            }`
                                        }
                                        value={brand}
                                    >
                                        {({ selected, active }) => (
                                            <>
                                                <img
                                                    src={`/media/${brand.file_path}`}
                                                    loading="lazy"
                                                    className="h-10 w-10 object-contain"
                                                />
                                                <span
                                                    className={`block truncate ${
                                                        selected
                                                            ? "font-medium"
                                                            : "font-normal"
                                                    }`}
                                                >
                                                    {brand.name}
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
        </div>
    );
};

export default SelectBrand;
