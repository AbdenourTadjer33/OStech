import React, { useState, Fragment, useContext } from "react";
import { EditProductFormContext } from "../EditForm";
import "axios";
import { Combobox, Transition } from "@headlessui/react";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import { useEffect } from "react";

const EditCategory = () => {
    const { data, setData, errors } = useContext(EditProductFormContext);

    const [categories, setCategories] = useState([]);
    const [parentCategories, setParentCategories] = useState([]);
    const [subCategories, setSubCategories] = useState([]);

    useEffect(() => {
        axios
            .get(route("api.getCategories"))
            .then((response) => {
                setCategories(response.data);
            })
            .catch((error) => {
                console.error("Error fetching categories", error);
            });
    }, []);

    useEffect(() => {
        categories.forEach((category) => {
            if (!category.parent_id) {
                setParentCategories((prevData) => [...prevData, category]);
            }

            if (category.parent_id == data.parentCategory?.id) {
                setSubCategories((prevData) => [...prevData, category]);
            }
        });
    }, [categories]);

    // useEffect(() => {
    //     console.log(data.parentCategory);
    //     console.log(categories);
    //     categories.forEach((category) => {
    //         if (category.parent_id == data.parentCategory?.id) {
    //             console.log(category)
    //             // setSubCategories((prevData) => [...prevData, category]);
    //         }
    //     });
    //     console.log(subCategories)
    // }, [data.parentCategory]);

    const [query, setQuery] = useState("");

    const filteredParentCategories =
        query === ""
            ? parentCategories
            : parentCategories.filter((category) =>
                  category.name
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLocaleLowerCase().replace(/\s+/g, ""))
              );

    const filteredSubCategories =
        query === ""
            ? subCategories
            : subCategories.filter((category) =>
                  category.name
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLocaleLowerCase().replace(/\s+/g, ""))
              );

    return (
        <div className="grid gap-4 mb-5 md:grid-cols-3">
            <div>
                <InputLabel required className="mb-2">
                    catégorie
                </InputLabel>

                <Combobox
                    value={data.parentCategory || ""}
                    onChange={(e) => setData("parentCategory", e)}
                >
                    <div className="relative">
                        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-black text-left">
                            <Combobox.Input
                                className="w-full p-2.5 text-sm leading-5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                displayValue={(category) => category?.name}
                                onChange={(event) =>
                                    setQuery(event.target.value)
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
                                {filteredParentCategories.length === 0 &&
                                query !== "" ? (
                                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700 dark:text-gray-50">
                                        Non trouvé.
                                    </div>
                                ) : (
                                    filteredParentCategories.map(
                                        (parentCategory) => (
                                            <Combobox.Option
                                                key={parentCategory.id}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                        active
                                                            ? "bg-primary-600 text-white"
                                                            : "text-gray-900 dark:text-gray-50"
                                                    }`
                                                }
                                                value={parentCategory}
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
                                                            {
                                                                parentCategory.name
                                                            }
                                                        </span>
                                                        {selected ? (
                                                            <span
                                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
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
                                        )
                                    )
                                )}
                            </Combobox.Options>
                        </Transition>
                    </div>
                </Combobox>
            </div>

            <div>
                <InputLabel required className="mb-2">
                    sous-catégorie
                </InputLabel>

                <Combobox
                    value={data.category || ""}
                    onChange={(e) => setData("category", e)}
                >
                    <div className="relative">
                        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-black text-left">
                            <Combobox.Input
                                className="w-full p-2.5 text-sm leading-5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                displayValue={(category) => category?.name}
                                onChange={(event) =>
                                    setQuery(event.target.value)
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
                                {filteredSubCategories.length === 0 &&
                                query !== "" ? (
                                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700 dark:text-gray-50">
                                        Non trouvé.
                                    </div>
                                ) : (
                                    filteredSubCategories.map((subCategory) => (
                                        <Combobox.Option
                                            key={subCategory.id}
                                            className={({ active }) =>
                                                `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                    active
                                                        ? "bg-primary-600 text-white"
                                                        : "text-gray-900 dark:text-gray-50"
                                                }`
                                            }
                                            value={subCategory}
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
                                                        {subCategory.name}
                                                    </span>
                                                    {selected ? (
                                                        <span
                                                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
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
        </div>
    );
};

export default EditCategory;
