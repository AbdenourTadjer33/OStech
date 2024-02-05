import React, { useContext } from "react";
import { CreateProductFormContext } from "./CreateForm";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";

const DescriptionInput = () => {
    const {data, setData, errors} = useContext(CreateProductFormContext);

    const modules = {
        toolbar: [
            [{ header: [1, 2, 3, 4, false] }],
            ["bold", "italic", "underline", "blockquote"],
            [{ color: [] }],
            [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
            ],
            ["link"],
        ],
    };

    const formats = [
        "header",
        "bold",
        "italic",
        "underline",
        "blockquote",
        "color",
        "list",
        "bullet",
        "indent",
        "link",
    ];
    return (
        <>
            <InputLabel className="mb-2">Description de produit</InputLabel>
            <div className="relative flex items-center justify-center bg-gray-100 rounded-md">
                <ReactQuill
                    value={data.description}
                    name="description"
                    onChange={(e) => setData("description", e)}
                    modules={modules}
                    formats={formats}
                    className="bg-gray-100 text-gray-900 w-full"
                    theme="snow"
                />
            </div>

            <InputError message={errors.description} className="mt-2" />
        </>
    );
};

export default DescriptionInput;
