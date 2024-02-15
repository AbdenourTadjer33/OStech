import React, { createRef, useContext, useEffect } from "react";
import { CreateProductFormContext } from "../CreateForm";
import TextInput from "@/Components/TextInput";
import Button from "@/Components/Button";
import { MdClose, MdDelete } from "react-icons/md";
import { useState } from "react";
import { MdKeyboardArrowDown as AD } from "react-icons/md";
import InputError from "@/Components/InputError";

const Features = () => {
    const { data, setData } = useContext(CreateProductFormContext);

    const [error, setError] = useState();

    const handleAdd = (e) => {
        setData("features", [
            ...data.features,
            { title: "", features: [{ label: "", description: "" }] },
        ]);
    };

    const handleTitleChange = (e, idx) => {
        const features = [...data.features];

        features[idx].title = e.target.value;
        setData("features", features);
    };

    useEffect(() => {
        console.log(data.features);
    }, [data.features]);


    const handleDelete = (idx) => {
        const features = [...data.features];
        features.splice(idx, 1);
        setData("features", features);
    };
    return (
        <>
            <div className="space-y-4">
                {data.features.map((section, idx) => {
                    return (
                        <div
                            key={idx}
                            className="relative w-full rounded bg-white border border-gray-200 dark:bg-gray-800 dark:border-gray-700 p-4"
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <TextInput
                                    name="title"
                                    placeholder={"Titre de la section (*)"}
                                    value={section.title}
                                    onChange={(e) => handleTitleChange(e, idx)}
                                />
                                <button
                                    type="button"
                                    title="Supprimé la section"
                                    className="text-gray-900 dark:text-white p-1 rounded-full transition-colors duration-100 hover:bg-red-200 dark:hover:bg-red-500"
                                    onClick={() => handleDelete(idx)}
                                >
                                    <MdClose className="w-6 h-6" />
                                </button>
                            </div>

                            <Feature features={section.features} sectionID={idx} />
                        </div>
                    );
                })}
                <div className="flex justify-center">
                    <Button type="button" btn="info" onClick={handleAdd}>
                        Ajouter une section
                    </Button>
                </div>
            </div>

            {/* <div className="space-y-4">
                {data.features.map((feature, idx) => {
                    return (
                        <div key={idx} className="flex items-center gap-4">
                            <TextInput
                                name="title"
                                value={feature.title}
                                onChange={(e) => handleChange(e.idx)}
                                placeholder={"Titre de la section (*)"}
                                className="basis-full"
                            />
                            <TextInput
                                name="title"
                                value={feature.title}
                                onChange={(e) => handleChange(e, idx)}
                                placeholder={`titre ${idx}`}
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
                                onClick={() => handleDelete(idx)}
                                className="p-2.5 bg-red-700 hover:bg-red-800 rounded-lg"
                            >
                                <MdDelete className="w-5 h-5" />
                            </button>
                        </div>
                    );
                })}
                <div className="flex justify-center">
                    <Button type="button" btn="info" onClick={handleAdd}>
                        Ajouter une caractéristique
                    </Button>
                </div>
            </div> */}
        </>
    );
};

const Feature = ({ features, sectionID }) => {
    const { data, setData } = useContext(CreateProductFormContext);

    const changeHandler = (e, idx) => {
        const { name, value } = e.target;
        const features = [...data.features];
        features[sectionID].features[idx][name] = value;
        setData("features", features);
    };

    const addFeature = () => {
        const features = [...data.features];
        features[sectionID].features.push({ label: "", description: "" });
        setData("features", features);
    }

    const deleteFeature = (idx) => {
        const features = [...data.features];
        features[sectionID].features.splice(idx, 1);
        setData("features", features);
    }

    return (
        <div className="space-y-4">
            {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-4">
                    <TextInput
                        name="label"
                        placeholder={`Label de caracteristique`}
                        className="basis-1/3"
                        value={feature.label}
                        onChange={(e) => changeHandler(e, idx)}
                    />
                    <TextInput
                        name="description"
                        placeholder="Description de catacteristique"
                        className="basis-2/3"
                        value={feature.description}
                        onChange={(e) => changeHandler(e, idx)}
                    />
                    <button
                        type="button"
                        className="p-2.5 bg-red-700 hover:bg-red-800 rounded-lg"
                        onClick={() => deleteFeature(idx)}
                    >
                        <MdDelete className="w-5 h-5" />
                    </button>
                </div>
            ))}

            <Button type="button" btn="primary" onClick={addFeature}>
                Ajouter une catacteristique
            </Button>
        </div>
    );
};

export default Features;
