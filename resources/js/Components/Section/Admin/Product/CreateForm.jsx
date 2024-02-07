import React, { createContext, useState } from "react";
import { useForm } from "laravel-precognition-react-inertia";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Button from "@/Components/Button";
import Toggle from "@/Components/Toggle";
import ImageUpload from "./Create/ImageUpload";
import RichEditor from "@/Components/RichEditor";
import CategoryBrand from "./Create/CategoryBrand";
import Features from "./Create/Features";

export const CreateProductFormContext = createContext();

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
    } = useForm("post", route("admin.products.store"), {
        parentCategory: [],
        category: [],
        brand: [],
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

    const submitHandler = (e) => {
        e.preventDefault();
        console.log(data);
        // post(route("admin.products.store"), {
        //     onSuccess: () => reset(),
        // });
    };

    return (
        <CreateProductFormContext.Provider
            value={{ data, setData, errors, progress }}
        >
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl sm:text-4xl font-bold">
                    Créer un produit
                </h1>
            </div>

            <form onSubmit={submitHandler} encType="multipart/form-data">
                {/* <div className="grid gap-4 mb-5 md:grid-cols-3">
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
                                onChange={(e) => setData("qte", e.target.value)}
                            />
                        </div>

                        <InputError message={errors.qte} className="mt-2" />
                    </div>

                    <div className="sm:col-span-3">
                        <InputLabel className="mb-2">
                            Description de produit
                        </InputLabel>

                        <RichEditor
                            name="description"
                            value={data.description}
                            onChange={(e) => setData("description", e)}
                        />
                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>

                    <div className="sm:col-span-3">
                        <CategoryBrand />
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

                    <div>
                        <InputLabel htmlFor="promo" className="mb-2">
                            Promotion produit
                        </InputLabel>

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

                        <InputError message={errors.promo} className="mt-2" />
                    </div>
                </div>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

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
                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" />

                <div className="mb-5">
                    <Features />
                </div>

                <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700" /> */}

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
