import React, { createRef, useContext, useEffect } from "react";
import { CreateProductFormContext } from "./CreateForm";
import Accordion from "@/Components/Accordion";
import TextInput from "@/Components/TextInput";
import Button from "@/Components/Button";
import { MdDelete } from "react-icons/md";

const DetailsSection = () => {
    const { data, setData } = useContext(CreateProductFormContext);

    const handleAdd = (e) => {
        setData("features", [...data.features, { title: "", description: "" }]);
    };

    const handleChange = (e, idx) => {
        const { name, value } = e.target;
        const features = [...data.features];
        features[idx][name] = value;
        setData("features", features);
    };

    const handleDelete = (idx) => {
        const features = [...data.features];
        features.splice(idx, 1);
        setData("features", features);
    };

    return (
        <>
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-3xl">Caractéristique</h2>
                <Button type="button" btn="info" onClick={handleAdd}>
                    Ajouter une caractéristique
                </Button>
            </div>

            {data.features.map((feature, idx) => {
                return (
                    <div key={idx} className="flex items-center gap-4 mb-4">
                        <TextInput
                            name="title"
                            value={feature.title}
                            onChange={(e) => handleChange(e, idx)}
                            placeholder="Titre"
                            className="basis-1/3"
                        />
                        <TextInput
                            name="description"
                            value={feature.description}
                            onChange={(e) => handleChange(e, idx)}
                            placeholder="Description"
                            className="basis-2/3"
                        />
                        <button
                            type="button"
                            onClick={(e) => handleDelete(e, idx)}
                            className="p-2.5 bg-red-700 hover:bg-red-800 rounded-lg"
                        >
                            <MdDelete className="w-5 h-5" />
                        </button>
                    </div>
                );
            })}

            {/* <div className="mb-5">
                <ul className="mt-5 rounded-lg overflow-hidden w-full  mx-auto divide-y divide-gray-200">
                    <li className="p-5 bg-white hover:bg-gray-50  grid gap-4 sm:grid-cols-3">
                        <h2 className="uppercase text-3xl text-gray-900 font-meduim">
                            Caractéristique
                        </h2>
                    </li>
                    {data.features.map((feature, idx) => {
                        return (
                            <li
                                key={idx}
                                className="p-5 bg-white hover:bg-gray-50  grid gap-4 sm:grid-cols-3"
                            >
                                <h3 className="text-2xl text-gray-800 font-semibold capitalize my-auto">
                                    {feature?.title}
                                </h3>
                                <span className="block text-base text-gray-700 sm:col-span-2 my-auto">
                                    {feature?.description}
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div> */}
        </>
    );
};

export default DetailsSection;
