import React, { createRef, useContext, useEffect } from "react";
import { EditProductFormContext } from "../EditForm";
import TextInput from "@/Components/TextInput";
import Button from "@/Components/Button";
import { MdDelete } from "react-icons/md";

const EditFeatures = () => {
    const { data, setData, error } = useContext(EditProductFormContext);

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

            <div className="space-y-4">
                {data.features.map((feature, idx) => {
                    return (
                        <div key={idx} className="flex items-center gap-4">
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
            </div>
        </>
    );
};

export default EditFeatures;
