import React, { useState, useRef, useEffect, useContext } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop,
} from "react-image-crop";
import Table from "@/Components/Table";
import Modal from "@/Components/Modal";
import InputFile from "@/Components/InputFile";
import InlineButton from "@/Components/InlineButton";
import Button from "@/Components/Button";
import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";
import InputError from "@/Components/InputError";
import setCanvasPreview from "@/Logic/setCanvasPreview";

import { CreateBrandFormContext } from "./CreateForm";

const LogoUpload = () => {
    const { setData, errors, cleanError } = useContext(CreateBrandFormContext);

    const [img, setImg] = useState();
    const [seeModal, setSeeModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [crop, setCrop] = useState({});
    const [ruleThird, setRuleThird] = useState(false);

    const imgRef = useRef(null);
    const uploadFileRef = useRef();
    const previewCanvasRef = useRef(null);

    const openSeeModal = () => {
        setSeeModal(() => true);
    };

    const openEditModal = () => {
        setEditModal(() => true);
    };

    const uploadFile = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setData("logo", file);
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageUrl = reader.result?.toString() || "";
            setImg(() => imageUrl);
        });
        reader.readAsDataURL(file);
        cleanError("logo");
        uploadFileRef.value = null;
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (width / width) * 100;

        const crop = centerCrop(
            makeAspectCrop(
                {
                    unit: "%",
                    width: cropWidthInPercent,
                },
                1,
                width,
                height
            ),
            width,
            height
        );

        setCrop(crop);
    };

    const deleteImg = () => {
        setImg(null);
        setData("logo", "");
        uploadFileRef.current.value = null;
    };

    return (
        <>
            <InputFile
                ref={uploadFileRef}
                onChange={(e) => uploadFile(e)}
                accept="image/*"
            />
            <InputError message={errors.logo} className="mt-2" />

            {img && (
                <Table className="mt-5">
                    <Table.Body>
                        <Table.Row className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-opacity-75">
                            <Table.Column className="p-4">
                                <img
                                    className="w-16 md:w-32 max-w-full max-h-full"
                                    src={img}
                                />
                            </Table.Column>
                            <Table.Column className="px-4 py-4">
                                <div className="flex items-center justify-center gap-4">
                                    <InlineButton
                                        btn="primary"
                                        onClick={(e) => openSeeModal()}
                                        className="capitalize"
                                    >
                                        voir
                                    </InlineButton>
                                    <InlineButton
                                        btn="info"
                                        onClick={(e) => openEditModal()}
                                        className="capitalize"
                                    >
                                        éditer
                                    </InlineButton>
                                    <InlineButton
                                        btn="danger"
                                        onClick={(e) => deleteImg()}
                                        className="capitalize"
                                    >
                                        Supprimer
                                    </InlineButton>
                                </div>
                            </Table.Column>
                        </Table.Row>
                    </Table.Body>
                </Table>
            )}

            <Modal
                show={seeModal}
                maxWidth="lg"
                onClose={() => setSeeModal(false)}
            >
                <div className="p-2">
                    {img && <img src={img} className="rounded-sm h-auto" />}
                </div>
            </Modal>

            <Modal show={editModal} width="2xl" closeable={false}>
                <div className="p-4">
                    <h1 className="text-3xl font-semibold capitalize dark:text-white text-gray-900">
                        éditer image
                    </h1>

                    {img && (
                        <div className="flex flex-col items-center mt-4">
                            <ReactCrop
                                crop={crop}
                                onChange={(pixelCrop, percentCrop) =>
                                    setCrop(percentCrop)
                                }
                                keepSelection
                                aspect={null}
                                minWidth={100}
                                ruleOfThirds={ruleThird}
                            >
                                <img
                                    ref={imgRef}
                                    src={img}
                                    alt="Upload"
                                    style={{ maxHeight: "50vh" }}
                                    onLoad={onImageLoad}
                                />
                            </ReactCrop>
                        </div>
                    )}
                    <div className="mt-4">
                        <div className="flex items-center">
                            <InputLabel>
                                <Checkbox
                                    value={ruleThird}
                                    onChange={(e) => {
                                        e.target.checked
                                            ? setRuleThird(true)
                                            : setRuleThird(false);
                                    }}
                                />
                                Règle des tiers
                            </InputLabel>
                        </div>
                    </div>

                    <div className="mt-4">
                        {crop && (
                            <canvas
                                ref={previewCanvasRef}
                                className="mt-4"
                                style={{
                                    // display: "none",
                                    border: "1px solid black",
                                    objectFit: "contain",
                                    width: 150,
                                    height: 150,
                                }}
                            />
                        )}
                    </div>

                    <div className="flex items-center gap-2 justify-center mt-4">
                        <Button
                            onClick={async (e) => {
                                const cropInfo = setCanvasPreview(
                                    imgRef.current,
                                    previewCanvasRef.current,
                                    convertToPixelCrop(
                                        crop,
                                        imgRef.current.width,
                                        imgRef.current.height
                                    )
                                );
                                setData("logoCropInformation", cropInfo);
                                setImg(() =>
                                    previewCanvasRef.current.toDataURL()
                                );
                                setEditModal(false);
                            }}
                        >
                            éditer
                        </Button>
                        <Button
                            btn="danger"
                            onClick={() => setEditModal(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default LogoUpload;
