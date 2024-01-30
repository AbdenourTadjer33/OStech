import React, { useState } from "react";
import InputFile from "./InputFile";

const FileUpload = () => {
    const [imgSrc, setImgSrc] = useState();

    const uploadImage = (e) => {
        if (!e.target.files && !e.target.files.length > 0) {
            return;
        }

        const file = e.target.files?.[0];

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;
            console.log(imageElement);
            setImgSrc(imageUrl);
        });
        reader.readAsDataURL(file);
    };
    return (
        <>
            <InputFile onChange={uploadImage} accept="image/*" />
        </>
    );
};

export default FileUpload;
