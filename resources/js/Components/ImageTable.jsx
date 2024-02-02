import React, { useState, useRef, useEffect } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop,
} from "react-image-crop";
import Table from "@/Components/Table";
import Modal from "@/Components/Modal";
import InputFile from "@/Components/InputFile";
import SrOnly from "@/Components/SrOnly";
import InlineButton from "@/Components/InlineButton";
import Button from "@/Components/Button";
import Toggle from "@/Components/Toggle";
import Checkbox from "@/Components/Checkbox";
import InputLabel from "@/Components/InputLabel";

const LogoUpload = () => {
    const [imgs, setImgs] = useState([]);
    const [seeModal, setSeeModal] = useState(false);
    const [img, setImg] = useState();
    const [editModal, setEditModal] = useState(false);
    const [imgToEdit, setImgToEdit] = useState();

    const [crop, setCrop] = useState({});
    const [ruleThird, setRuleThird] = useState(false);

    const imgRef = useRef(null);
    const previewCanvasRef = useRef(null);

    const openSeeModal = (img) => {
        setImg(() => img);
        setSeeModal(() => true);
    };

    const openEditModal = (img) => {
        setImgToEdit(() => img);
        setEditModal(() => true);
    };

    const uploadFiles = (e) => {
        if (!e.target.files && !e.target.files.length > 0) {
            return;
        }
        const files = e.target.files;
        for (let i = 0; i < e.target.files.length; i++) {
            selectFile(files[i]);
        }
    };

    const selectFile = (file) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            const imageElement = new Image();
            const imageUrl = reader.result?.toString() || "";
            imageElement.src = imageUrl;
            setImgs((img) => [...img, imageUrl]);
            // setImgSrc(imageUrl);
            // setModal(true);
        });
        reader.readAsDataURL(file);
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (150 / width) * 100;

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

    const deleteImg = () => {};

    return (
        <>
            <InputFile onChange={uploadFiles} multiple />

            <Table className="mt-5">
                <Table.Head>
                    <Table.Row>
                        <Table.Title className="px-16 py-3 font-medium text-gray-900  dark:text-white">
                            <SrOnly value="image" />
                        </Table.Title>
                        <Table.Title className="px-4 py-3 text-center capitalize">
                            Action
                        </Table.Title>
                    </Table.Row>
                </Table.Head>
                <Table.Body>
                    {imgs.map((img) => {
                        return (
                            <Table.Row
                                key={crypto.randomUUID()}
                                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-opacity-75"
                            >
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
                                            onClick={(e) => openSeeModal(img)}
                                            className="capitalize"
                                        >
                                            voir
                                        </InlineButton>
                                        <InlineButton
                                            btn="info"
                                            onClick={(e) => openEditModal(img)}
                                            className="capitalize"
                                        >
                                            éditer
                                        </InlineButton>
                                        <InlineButton btn="danger">
                                            delete
                                        </InlineButton>
                                    </div>
                                </Table.Column>
                            </Table.Row>
                        );
                    })}
                </Table.Body>
            </Table>

            <Modal
                show={seeModal}
                maxWidth="lg"
                onClose={() => setSeeModal(false)}
            >
                <div className="p-2">
                    {img && (
                        <img src={img} className="w-full h-auto rounded-sm" />
                    )}
                </div>
            </Modal>

            <Modal show={editModal} width="2xl" closeable={false}>
                <div className="p-4">
                    <h1 className="text-3xl font-semibold capitalize dark:text-white text-gray-900">
                        éditer image
                    </h1>

                    {imgToEdit && (
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
                                    src={imgToEdit}
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

                    <div className="flex items-center gap-2 justify-center mt-4">
                        <Button>éditer</Button>
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
