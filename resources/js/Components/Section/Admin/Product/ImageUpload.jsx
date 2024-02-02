import React, {
    useContext,
    useEffect,
    useRef,
    useState,
    Fragment,
} from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, {
    centerCrop,
    convertToPixelCrop,
    makeAspectCrop,
} from "react-image-crop";
import { Dialog, Transition } from "@headlessui/react";
import { VscChromeClose } from "react-icons/vsc";
import { CreateProductFormContext } from "./CreateForm";

import InputFile from "@/Components/InputFile";
import InputError from "@/Components/InputError";
import InlineButton from "@/Components/InlineButton";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import setCanvasPreview from "@/Logic/setCanvasPreview";

import { MdModeEdit, MdDelete, MdOpenInNew } from "react-icons/md";

const ImageUpload = () => {
    const { data, setData, errors } = useContext(CreateProductFormContext);
    const [img, setImg] = useState();
    const [seeModal, setSeeModal] = useState(false);
    const [editModal, setEditModal] = useState(false);

    const [crop, setCrop] = useState({});

    const imgRef = useRef();
    const uploadFileRef = useRef();
    const previewCanvasRef = useRef();

    const uploadFiles = (e) => {
        const files = e.target.files;
        if (!files && !files.length > 0) return;

        setData((prevData) => {
            const newImages = [
                ...prevData.images,
                ...Array.from(files).map((file, index) => ({
                    sort: prevData.images.length + index,
                    file,
                    url: URL.createObjectURL(file),
                })),
            ];

            return { ...prevData, images: newImages };
        });
    };

    const onImageLoad = (e) => {
        const { width, height } = e.currentTarget;
        const cropWidthInPercent = (width / 2) * 100;

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

    const openSeeModal = () => {
        setSeeModal(() => true);
    };

    const openEditModal = () => {
        setEditModal(() => true);
    };

    const deleteImg = () => {};

    return (
        <>
            <InputFile
                ref={uploadFileRef}
                onChange={(e) => uploadFiles(e)}
                accept="image/*"
                multiple
            />

            <InputError message={errors.images} className="mt-2" />

            {data.images?.length > 0 && (
                <ul className="mt-5 rounded-lg overflow-hidden w-full md:max-w-2xl min-w-[20rem] max-h-80 overflow-y-auto mx-auto divide-y divide-gray-200 dark:divide-gray-700">
                    {data.images?.map(({ sort, url }, idx) => {
                        return (
                            <li key={idx} className="px-5 py-2 bg-white dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-opacity-75">
                                <div className="flex items-center justify-between gap-4">
                                    <img
                                        className="w-16 md:w-28 max-h-full"
                                        src={url}
                                    />

                                    <div className="flex items-center justify-center gap-4">
                                        <InlineButton
                                            btn="primary"
                                            onClick={(e) => {
                                                setImg(url);
                                                openSeeModal();
                                            }}
                                            className="capitalize"
                                        >
                                            <MdOpenInNew className="w-5 h-5 md:hidden" />
                                            <span className="hidden md:block">
                                                voir
                                            </span>
                                        </InlineButton>
                                        <InlineButton
                                            btn="info"
                                            onClick={(e) => {
                                                setImg(url);
                                                openEditModal();
                                            }}
                                            className="capitalize"
                                        >
                                            <MdModeEdit className="w-5 h-5 md:hidden" />
                                            <span className="hidden md:block">
                                                éditer
                                            </span>
                                        </InlineButton>
                                        <InlineButton
                                            btn="danger"
                                            onClick={(e) => {
                                                setImg(url);
                                                deleteImg();
                                            }}
                                            className="capitalize"
                                        >
                                            <MdDelete className="w-5 h-5 md:hidden" />
                                            <span className="hidden md:block">
                                                Supprimer
                                            </span>
                                        </InlineButton>
                                    </div>
                                </div>
                            </li>
                        );
                    })}
                </ul>
            )}

            <Transition show={seeModal} as={Fragment} leave="duration-200">
                <Dialog
                    as="div"
                    id="modal"
                    className="fixed inset-0 flex overflow-hidden px-4 py-6 sm:px-0 items-center z-50 transform transition-all w-screen h-screen"
                    onClose={() => setSeeModal(false)}
                >
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="absolute inset-0 bg-gray-500/75 " />
                    </Transition.Child>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <Dialog.Panel
                            className={`rounded-lg overflow-hidden shadow-xl transform transition-all mx-auto`}
                        >
                            {img && <img src={img} className="max-h-[90vh]" />}
                        </Dialog.Panel>
                    </Transition.Child>
                    <button
                        type="button"
                        onClick={(e) => setSeeModal(false)}
                        className="absolute top-5 right-5 p-2 rounded-full text-gray-300  hover:bg-gray-100 hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:bg-opacity-70 dark:focus:ring-gray-600 cursor-pointer transition duration-200 "
                    >
                        <VscChromeClose className="w-8 h-8" />
                    </button>
                </Dialog>
            </Transition>

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
                                ruleOfThirds
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

export default ImageUpload;
