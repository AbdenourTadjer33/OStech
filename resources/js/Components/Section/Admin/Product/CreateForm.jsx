import React, { createContext, useState } from "react";
import { useForm } from "laravel-precognition-react-inertia";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Dropdown from "@/Components/Dropdown";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import Toggle from "@/Components/Toggle";
import ImageUpload from "./ImageUpload";
import DetailsSection from "./DetailsSection";
import { MdKeyboardArrowDown } from "react-icons/md";
import SelectCategory from "./SelectCategory";
import SelectBrand from "./SelectBrand";
import DescriptionInput from "./DescriptionInput";

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
        features: [],
        status: true,
        catalogue: true,
        images: [],
    });

    const [option, setOption] = useState({
        qte: false,
        promo: false,
        brand: false,
        sku: false,
    });

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.products.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <CreateProductFormContext.Provider
            value={{ data, setData, errors, progress, subCategories, brands }}
        >
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl sm:text-4xl font-bold">
                    Créer un produit
                </h1>

                <Dropdown dismissOnClick={false}>
                    <Dropdown.Trigger>
                        <Button type="button" btn="info">
                            Plus d'option
                            <MdKeyboardArrowDown className="h-5 w-5 ms-2" />
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
                                        id="sku"
                                        value={option?.sku}
                                        checked={option?.sku}
                                        onChange={(e) =>
                                            setOption({
                                                ...option,
                                                sku: e.target.checked,
                                            })
                                        }
                                    />
                                    <InputLabel
                                        htmlFor="sku"
                                        value="Ajouté un sku"
                                    />
                                </li>
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
                <div className="grid gap-4 mb-5 md:grid-cols-3">
                    <div>
                        <InputLabel htmlFor="name" required className="mb-2">
                            Nom de produit
                        </InputLabel>

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            onBlur={(e) => validate("name")}
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <SelectCategory />
                    {option?.brand && <SelectBrand />}

                    {option?.sku && (
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
                            <InputError message={errors.sku} className="mt-2" />
                        </div>
                    )}

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

                            <InputError message={errors.qte} className="mt-2" />
                        </div>
                    )}

                    <div className="sm:col-span-3">
                        <DescriptionInput />
                    </div>

                    <div>
                        <InputLabel htmlFor="price" required className="mb-2">
                            Prix de produit
                        </InputLabel>

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
                        <InputError message={errors.price} className="mt-2" />
                    </div>

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

                <div className="flex gap-4 flex-col justify-center lg:flex-row mb-5">
                    <label htmlFor="status">
                        <div className="inline-flex items-center justify-between gap-4 w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="block">
                                <h4 className="text-2xl font-semibold">
                                    Status
                                </h4>
                                <p className="text-base">
                                    S'il le status est activé, le produit sera
                                    affiché dans la section des produits
                                </p>
                            </div>
                            <Toggle
                                id="status"
                                name="status"
                                defaultChecked={data.status}
                                onChange={(e) => {
                                    setData("status", e.target.checked);
                                    forgetError("status");
                                }}
                            />
                        </div>
                    </label>

                    <label htmlFor="catalogue">
                        <div className="inline-flex items-center justify-between gap-4 w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <div className="block">
                                <h4 className="text-2xl font-semibold">
                                    Catalogue
                                </h4>
                                <p className="text-base">
                                    S'il le catalogue est activé, ce produit
                                    sera affiché dans la section catalogue
                                </p>
                            </div>
                            <Toggle
                                id="catalogue"
                                name="catalogue"
                                defaultChecked={data.catalogue}
                                label=""
                                onChange={(e) => {
                                    setData("catalogue", e.target.checked);
                                    forgetError("catalogue");
                                }}
                            />
                        </div>
                    </label>
                </div>

                <DetailsSection />

                <div className="mb-5">
                    <ImageUpload />
                </div>

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
