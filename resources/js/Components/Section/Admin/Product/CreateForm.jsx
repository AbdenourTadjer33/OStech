import React, { createContext, useEffect, useState, Fragment } from "react";
import { useForm } from "laravel-precognition-react-inertia";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Dropdown from "@/Components/Dropdown";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import Toggle from "@/Components/Toggle";
import ImageUpload from "./ImageUpload";
import { Combobox, Transition } from "@headlessui/react";
import { HiMiniChevronUpDown } from "react-icons/hi2";
import { FaCheck } from "react-icons/fa";
import Accordion from "@/Components/Accordion";

export const CreateProductFormContext = createContext();
const CreateForm = ({ brands, subCategories }) => {
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
    } = useForm("post", route("admin.products.store"), {
        category: "",
        brand: "",
        name: "",
        description: "",
        qte: "",
        promo: "",
        price: "",
        details: [],
        status: true,
        catalogue: false,
        images: [],
    });

    const [option, setOption] = useState({
        qte: false,
        promo: false,
        brand: false,
    });

    const [query, setQuery] = useState("");
    const filteredSubCategories =
        query === ""
            ? subCategories
            : subCategories.filter((category) =>
                  category.name
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    const filteredBrands =
        query === ""
            ? brands
            : brands.filter((brand) =>
                  brand.name
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""))
              );

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.products.store"));
    };

    const modules = {
        toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline", "strike", "blockquote"],
            [{ color: [] }],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link", "image"],
            ["clean"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "strike",
        "blockquote",
        "list",
        "bullet",
        "indent",
        "link",
        "image",
        "color",
    ];
    return (
        <CreateProductFormContext.Provider
            value={{ data, setData, errors, progress }}
        >
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-4xl font-bold">Créer un produit</h1>

                <Dropdown dismissOnClick={false}>
                    <Dropdown.Trigger>
                        <Button type="button" btn="info">
                            Plus d'option
                        </Button>
                    </Dropdown.Trigger>
                    <Dropdown.Content align="right" width="w-56">
                        <div className="p-4 text-gray-900 bg-white border border-gray-200 rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white overflow-hidden">
                            <h5 className="mb-3 text-sm font-medium text-gray-900 dark:text-white">
                                Ajouter plus de formulaire
                            </h5>
                            <ul className="space-y-2 text-sm">
                                <li className="flex items-center">
                                    <Checkbox
                                        id="brand"
                                        value={option?.brand}
                                        checked={option?.brand}
                                        onChange={(e) =>
                                            setOption({
                                                ...option,
                                                brand: e.target.checked,
                                            })
                                        }
                                    />
                                    <InputLabel
                                        htmlFor="brand"
                                        value="Attribuer à un brand"
                                    />
                                </li>
                                <li className="flex items-center">
                                    <Checkbox
                                        id="qte"
                                        value={option?.qte}
                                        checked={option?.qte}
                                        onChange={(e) =>
                                            setOption({
                                                ...option,
                                                qte: e.target.checked,
                                            })
                                        }
                                    />
                                    <InputLabel
                                        htmlFor="qte"
                                        value="Quantité"
                                    />
                                </li>
                                <li className="flex items-center">
                                    <Checkbox
                                        id="promo"
                                        value={option?.promo}
                                        checked={option?.promo}
                                        onChange={(e) =>
                                            setOption({
                                                ...option,
                                                promo: e.target.checked,
                                            })
                                        }
                                    />
                                    <InputLabel
                                        htmlFor="promo"
                                        value="Ajouté une promotion"
                                    />
                                </li>
                            </ul>
                        </div>
                    </Dropdown.Content>
                </Dropdown>
            </div>

            <form onSubmit={submitHandler} encType="multipart/form-data">
                
                <Accordion title="Information génerale sur le produit" state>
                    <Accordion.Body>
                        <div className="grid gap-4 mb-5 lg:grid-cols-3">
                            {/* sku */}
                            <div>
                                <InputLabel
                                    htmlFor="sku"
                                    value="SKU"
                                    className="mb-2"
                                />
                                <TextInput
                                    id="sku"
                                    name="sku"
                                    value={data.sku}
                                    onChange={(e) => {
                                        setData("sku", e.target.value);
                                    }}
                                />
                                <InputError
                                    message={errors.sku}
                                    className="mt-2"
                                />
                            </div>

                            {/* name */}
                            <div>
                                <InputLabel
                                    htmlFor="name"
                                    required={true}
                                    className="mb-2"
                                >
                                    Nom de produit
                                </InputLabel>

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    onChange={(e) =>
                                        setData("name", e.target.value)
                                    }
                                    onBlur={(e) => validate("name")}
                                />

                                <InputError
                                    message={errors.name}
                                    className="mt-2"
                                />
                            </div>

                            {/* qte */}
                            {option?.qte && (
                                <div>
                                    <InputLabel htmlFor="qte" className="mb-2">
                                        Quantité de produit desponibe
                                    </InputLabel>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
                                            <span className="text-gray-500 dark:text-gray-200">
                                                pc
                                            </span>
                                        </div>
                                        <TextInput
                                            id="qte"
                                            name="qte"
                                            value={data.qte}
                                            onChange={(e) =>
                                                setData("qte", e.target.value)
                                            }
                                        />
                                    </div>

                                    <InputError
                                        message={errors.qte}
                                        className="mt-2"
                                    />
                                </div>
                            )}

                            {/* category */}
                            <div>
                                <InputLabel
                                    value="Sélectionnez une catégorie"
                                    className="mb-2"
                                />

                                <Combobox
                                    value={data.category}
                                    onChange={(e) => setData("category", e)}
                                >
                                    <div className="relative ">
                                        <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-black text-left ">
                                            <Combobox.Input
                                                className="w-full p-2.5 text-sm leading-5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                displayValue={(category) =>
                                                    category?.name
                                                }
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
                                                {filteredSubCategories.length ===
                                                    0 && query !== "" ? (
                                                    <div className="relative cursor-default select-none px-4 py-2 text-gray-700 dark:text-gray-50">
                                                        Non trouvé.
                                                    </div>
                                                ) : (
                                                    filteredSubCategories.map(
                                                        (category) => (
                                                            <Combobox.Option
                                                                key={
                                                                    category.id
                                                                }
                                                                className={({
                                                                    active,
                                                                }) =>
                                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                                                        active
                                                                            ? "bg-primary-600 text-white"
                                                                            : "text-gray-900 dark:text-gray-50"
                                                                    }`
                                                                }
                                                                value={category}
                                                            >
                                                                {({
                                                                    selected,
                                                                    active,
                                                                }) => (
                                                                    <>
                                                                        <span
                                                                            className={`block truncate ${
                                                                                selected
                                                                                    ? "font-medium"
                                                                                    : "font-normal"
                                                                            }`}
                                                                        >
                                                                            {
                                                                                category.name
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

                            {/* brand */}
                            {option?.brand && (
                                <div>
                                    <InputLabel
                                        value="Sélectionnez une Brand"
                                        className="mb-2"
                                    />

                                    <Combobox
                                        value={data.brand}
                                        onChange={(e) => setData("brand", e)}
                                    >
                                        <div className="relative ">
                                            <div className="relative w-full cursor-default overflow-hidden rounded-lg bg-black text-left ">
                                                <Combobox.Input
                                                    className="w-full p-2.5 text-sm leading-5 text-gray-900 bg-gray-50 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 block  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                    displayValue={(brand) =>
                                                        brand?.name
                                                    }
                                                    onChange={(event) =>
                                                        setQuery(
                                                            event.target.value
                                                        )
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
                                                    {filteredBrands.length ===
                                                        0 && query !== "" ? (
                                                        <div className="relative cursor-default select-none px-4 py-2 text-gray-700 dark:text-gray-50">
                                                            Non trouvé.
                                                        </div>
                                                    ) : (
                                                        filteredBrands.map(
                                                            (brand) => (
                                                                <Combobox.Option
                                                                    key={
                                                                        brand.id
                                                                    }
                                                                    className={({
                                                                        active,
                                                                    }) =>
                                                                        `relative cursor-default select-none flex items-center gap-4 py-2 pl-4 pr-10 ${
                                                                            active
                                                                                ? "bg-primary-600 text-white"
                                                                                : "text-gray-900 dark:text-gray-50"
                                                                        }`
                                                                    }
                                                                    value={
                                                                        brand
                                                                    }
                                                                >
                                                                    {({
                                                                        selected,
                                                                        active,
                                                                    }) => (
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
                                                                                {
                                                                                    brand.name
                                                                                }
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
                                                            )
                                                        )
                                                    )}
                                                </Combobox.Options>
                                            </Transition>
                                        </div>
                                    </Combobox>
                                </div>
                            )}

                            {/* description */}
                            <div className="sm:col-span-3">
                                <InputLabel className="mb-2" required={true}>
                                    Description de produit
                                </InputLabel>
                                <div className="relative flex items-center justify-center bg-gray-100 rounded-md">
                                    <ReactQuill
                                        value={data.description}
                                        name="description"
                                        onChange={(e) =>
                                            setData("description", e)
                                        }
                                        modules={modules}
                                        formats={formats}
                                        className="bg-gray-100 text-gray-900 w-full"
                                        theme="snow"
                                    />
                                </div>

                                <InputError
                                    message={errors.description}
                                    className="mt-2"
                                />
                            </div>
                        </div>
                    </Accordion.Body>
                </Accordion>

                <Accordion title="Tarification de produit" state>
                    <Accordion.Body>
                        <div className="grid gap-4 mb-5 lg:grid-cols-3">
                            {/* price */}
                            <div>
                                <InputLabel
                                    htmlFor="price"
                                    value="Prix de produit"
                                    className="mb-2"
                                />

                                <div className="relative">
                                    <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
                                        <span className="text-gray-500 dark:text-gray-200">
                                            DA
                                        </span>
                                    </div>
                                    <TextInput
                                        id="price"
                                        name="price"
                                        value={data.price}
                                        className=""
                                        onChange={(e) =>
                                            setData("price", e.target.value)
                                        }
                                    />
                                </div>
                                <InputError
                                    message={errors.price}
                                    className="mt-2"
                                />
                            </div>

                            {/* promotion */}
                            {option?.promo && (
                                <div>
                                    <InputLabel
                                        htmlFor="promo"
                                        value="Ajouté une promotion pour le produit"
                                        className="mb-2"
                                    />
                                    <div className="relative">
                                        <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
                                            <span className="text-gray-500 dark:text-gray-200">
                                                %
                                            </span>
                                        </div>
                                        <TextInput
                                            id="promo"
                                            name="promo"
                                            value={data.promo}
                                            onChange={(e) =>
                                                setData("promo", e.target.value)
                                            }
                                        />
                                    </div>
                                    <InputError
                                        message={errors.promo}
                                        className="mt-2"
                                    />
                                </div>
                            )}
                        </div>
                    </Accordion.Body>
                </Accordion>

                <Accordion title="Détail de produit">
                    <Accordion.Body>
                        <div className="grid gap-4 mb-5 lg:grid-cols-3">
                            <TextInput placeholder="Titre" />
                            <TextInput placeholder="Label" />
                            <TextInput placeholder="Description" />
                        </div>

                        <div id="preview">
                            <ul>
                                <li className="flex items-center">

                                </li>
                            </ul>
                        </div>
                    </Accordion.Body>
                </Accordion>

                {/* 
                    <div className="mb-5">
                        <div>
                            <InputLabel
                                htmlFor="status"
                                className="mb-2"
                                value="Status"
                            />
                            <Toggle
                                className=""
                                id="status"
                                name="status"
                                defaultChecked={data.status}
                                onChange={(e) => {
                                    setData("status", e.target.checked);
                                    forgetError("status");
                                }}
                            />
                            <InputError message={errors.status} className="mt-2" />
                        </div>
                        <div className="">
                            <InputLabel
                                htmlFor="catalogue"
                                className="mb-2"
                                value="Catalogue"
                            />
                            <Toggle
                                id="catalogue"
                                name="catalogue"
                                defaultChecked={data.catalogue}
                                onChange={(e) => {
                                    setData("catalogue", e.target.checked);
                                    forgetError("catalogue");
                                }}
                            />
                            <InputError
                                message={errors.catalogue}
                                className="mt-2"
                            />
                        </div>
                    </div>

               

                    <div className="mb-5">
                        <ImageUpload />
                    </div>
                */}

                <div className="text-center">
                    <Button type="submit" btn="primary">
                        Ajouté
                    </Button>
                </div>
            </form>
        </CreateProductFormContext.Provider>
    );
};

export default CreateForm;
