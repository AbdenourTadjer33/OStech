import React, { useState, useRef } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop,
} from "react-image-crop";

import Modal from "@/Components/Modal";
import FileUpload from "@/Components/FileUpload";
import InputFile from "@/Components/InputFile";
import Button from "@/Components/Button";

const MIN_DIMENSION = 150;
const ASPECT_RATIO = 16 / 9;
const LogoUpload = () => {
    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);
    const [imgSrc, setImgSrc] = useState("");
    const [crop, setCrop] = useState();
    const [modal, setModal] = useState(false);


    const onSelectFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;

            // imageElement.addEventListener("load", (e) => {
            //     if (error) setError("");
            //     const { naturalWidth, naturalHeight } = e.currentTarget;
            //     if (
            //         naturalWidth < MIN_DIMENSION ||
            //         naturalHeight < MIN_DIMENSION
            //     ) {
            //         setError("Image must be at least 150 x 150 pixels.");
            //         return setImgSrc("");
            //     }
            // });
            setImgSrc(imageUrl);
            setModal(true);
        });
        reader.readAsDataURL(file);
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

        const crop = makeAspectCrop(
            {
                unit: "%",
                width: cropWidthInPercent,
            },
            ASPECT_RATIO,
            width,
            height
        );
        const centeredCrop = centerCrop(crop, width, height);
        setCrop(centeredCrop);
    };

    const closeModal = () => {
        setModal(false);
    }

    return (
        <>
            {/* <FileUpload simple={true} onChange={onSelectFile} /> */}
            <InputFile onChange={onSelectFile} />

            

            <Modal show={modal} width="2xl">
                <div className="p-4">
                    <h1
                        onClick={close}
                        className="text-3xl font-semibold dark:text-white text-gray-900"
                    >
                        Image Crop
                    </h1>

                    {imgSrc && (
                        <div className="flex flex-col items-center mt-4">
                            <ReactCrop
                                crop={crop}
                                onChange={(pixelCrop, percentCrop) =>
                                    setCrop(percentCrop)
                                }
                                minWidth={MIN_DIMENSION}
                            >
                                <img
                                    ref={imgRef}
                                    src={imgSrc}
                                    alt="Upload"
                                    style={{ maxHeight: "50vh" }}
                                    onLoad={onImageLoad}
                                />
                            </ReactCrop>
                        </div>
                    )}

                    <div className="flex items-center gap-2 justify-center mt-4">
                        <Button>Crop Image</Button>
                        <Button btn="danger" onClick={closeModal}>Cancel</Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default LogoUpload;
