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
import { CreateProductFormContext } from "../CreateForm";

import InputFile from "@/Components/InputFile";
import InputError from "@/Components/InputError";
import InlineButton from "@/Components/InlineButton";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import setCanvasPreview from "@/Logic/setCanvasPreview";
import { MdOutlineCloudUpload } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import Checkbox from "@/Components/Checkbox";
import { IoMdInformationCircleOutline } from "react-icons/io";

import { MdModeEdit, MdDelete, MdOpenInNew } from "react-icons/md";
import { TbGridDots } from "react-icons/tb";
import DropZoneInput from "@/Components/DropZoneInput";
import "axios";

const ImageUpload = () => {
    const { data, setData, errors } = useContext(CreateProductFormContext);

    // image importation states
    const [importModal, setImportModal] = useState(false);
    const [importedFiles, setImportedFiles] = useState([]);

    // loading state
    const [isLoading, setIsLoading] = useState(false);

    // dnd states
    const [draggedRow, setDraggedRow] = useState(null);
    const [dragOverRow, setDragOverRow] = useState(null);

    // feature state's
    const [img, setImg] = useState(null);
    const [seeModal, setSeeModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState({ status: false });
    const [editModal, setEditModal] = useState({ status: false });

    // crop state
    const [crop, setCrop] = useState({});

    const imgRef = useRef();
    const previewCanvasRef = useRef();

    const previewImport = (e) => {
        const files = e.target.files;
        if (!files && !files.length > 0) return;

        const formData = new FormData();

        Array.from(files).forEach((file) => {
            setImportedFiles((prevData) => {
                return [...prevData, { file, url: URL.createObjectURL(file) }];
            });
        });
    };

    const removeImportedFile = (idx) => {
        const files = [...importedFiles];
        files.splice(idx, 1);
        setImportedFiles(files);
    };

    const importToServer = async () => {
        if (importedFiles.length === 0) return;

        setIsLoading(true);

        const formData = new FormData();
        importedFiles.map(({ file }) => formData.append("images[]", file));
        try {
            const response = await axios.post(
                route("api.save.temp.imgs"),
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setData("images", [...data.images, ...response.data]);
            setImportedFiles([]);
            setIsLoading(false);
            setImportModal(false);
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };

    const handleDragStart = (e, row) => {
        e.dataTransfer.effectAllowed = "move";
        setDraggedRow(row);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();
        setDragOverRow(index);
    };

    const handleDrop = (e, index) => {
        e.preventDefault();
        handleRowDrag(draggedRow, index);
        setDraggedRow(null);
        setDragOverRow(null);
    };

    const handleRowDrag = (draggedRow, newIndex) => {
        const newTableData = [...data.images];
        const draggedRowIndex = newTableData.findIndex(
            (row) => row === draggedRow
        );
        newTableData.splice(draggedRowIndex, 1);
        newTableData.splice(newIndex, 0, draggedRow);
        setData("images", newTableData);
    };

    const openSeeModal = () => {
        setSeeModal(() => true);
    };

    const openDeleteModal = (idx) => {
        setDeleteModal({ status: true, imageId: idx });
    };

    const deleteImg = async () => {
        setIsLoading(true);
        const idx = deleteModal.imageId;

        try {
            const response = await axios.post(route("api.destroy.temp.img"), {
                path: data.images[idx],
            });
            if (response.status === 200) {
                const images = [...data.images];
                images.splice(idx, 1);
                setData("images", images);
                setIsLoading(false);
                setDeleteModal({ status: false });
            } else {
                alert("un probleme est sourvenu, veuillez contactez le dev");
            }
        } catch (error) {
            console.error("error while deleting the img", error);
            setIsLoading(false);
        }
    };

    const openEditModal = (idx) => {
        setEditModal({ status: true, imageId: idx });
    };

    useEffect(() => {
        console.log(data.images);
    }, [data.images])

    const editImg = async (cropInfo) => {
        setIsLoading(true);
        const idx = editModal.imageId;
        try {
            const response = await axios.post(route("api.edit.temp.img"), {
                path: data.images[idx],
                cropInfo,
            });
            setData("images", [...data.images]);
            setIsLoading(false);
            setEditModal({ status: false });
        } catch (error) {
            console.error("Error when editing img on the serve", error);
            setIsLoading(false);
        }
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

    return (
        <>
            {/* title */}
            <div className="flex justify-between items-center mb-5">
                <h2 className="text-3xl">Images</h2>
            </div>

            {/* main */}
            <div className={`h-full overflow-auto rounded-lg shadow-lg`}>
                <div className="bg-gray-50 dark:bg-gray-700 shadow-sm py-3 px-4 flex justify-end gap-4">
                    <Button
                        type="button"
                        btn="info"
                        onClick={(e) => setImportModal(true)}
                    >
                        <MdOutlineCloudUpload className="me-3 w-4 h-4" />
                        Importer des images
                    </Button>
                </div>
                {data.images.length === 0 ? (
                    <div className="p-4 text-center text-xl font-semibold bg-gray-50/25 dark:bg-gray-700/25 shadow-sm">
                        Aucune image n'est importé
                    </div>
                ) : (
                    <table className="w-full">
                        <tbody>
                            {data.images?.map((image, idx) => (
                                <tr
                                    draggable
                                    onDragStart={(e) =>
                                        handleDragStart(e, image)
                                    }
                                    onDragOver={(e) => handleDragOver(e, idx)}
                                    onDrop={(e) => handleDrop(e, idx)}
                                    key={idx}
                                    className={`px-5 py-2 bg-gray-50 border border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-opacity-75 ${
                                        idx === dragOverRow
                                            ? "border-t-2 border-blue-500 dark:border-blue-700"
                                            : ""
                                    } `}
                                >
                                    <td className="py-2 w-16 cursor-move">
                                        <button
                                            type="button"
                                            className="w-full cursor-move inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                                        >
                                            <TbGridDots className="w-5 h-5 mx-auto" />
                                        </button>
                                    </td>
                                    <td className="pe-4 py-2">
                                        <img
                                            className="w-16 md:w-28 max-h-full"
                                            src={"/media/" + image}
                                        />
                                    </td>
                                    <td className="px-4 py-2 space-x-4 text-center">
                                        <InlineButton
                                            btn="primary"
                                            onClick={(e) => {
                                                setImg("/media/" + image);
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
                                                setImg("/media/" + image);
                                                openEditModal(idx);
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
                                                openDeleteModal(idx);
                                            }}
                                            className="capitalize"
                                        >
                                            <MdDelete className="w-5 h-5 md:hidden" />
                                            <span className="hidden md:block">
                                                Supprimer
                                            </span>
                                        </InlineButton>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            {/* import modal */}
            <Modal show={importModal} maxWidth="4xl" closeable={false}>
                <div className="py-4 px-5 bg-gray-100 dark:bg-gray-600">
                    <h1 className="text-3xl font-semibold dark:text-white text-gray-900 mb-6">
                        {importedFiles.length === 0 ? (
                            <>Importer des images</>
                        ) : (
                            <>Confirmation</>
                        )}
                    </h1>

                    {importedFiles.length === 0 ? (
                        <div className="mb-6">
                            <DropZoneInput
                                onChange={previewImport}
                                accept="image/*"
                                multiple
                            />
                        </div>
                    ) : (
                        <ul className="rounded-lg overflow-hidden w-full border border-gray-200 dark:border-gray-400 max-h-80 overflow-y-auto mx-auto divide-y divide-gray-200 dark:divide-gray-400 mb-6">
                            {importedFiles.map(({ file, url }, idx) => {
                                return (
                                    <li
                                        key={idx}
                                        className="px-5 py-2 bg-gray-100 hover:bg-gray-50 dark:bg-gray-700/20 dark:hover:bg-gray-600 flex items-center justify-between gap-4"
                                    >
                                        <img
                                            src={url}
                                            className="w-16 md:w-28 max-h-full"
                                        />

                                        <div className="text-gray-600 dark:text-gray-200 basis-1/2 text-base">
                                            <p>
                                                Fichier:{" "}
                                                <span className="text-lg font-medium text-gray-700 dark:text-gray-100">
                                                    {file.size / 1024 ** 2} MB
                                                </span>
                                            </p>
                                            <p>
                                                Type fichier:{" "}
                                                <span className="text-lg font-medium text-gray-700 dark:text-gray-100">
                                                    {file.type}
                                                </span>
                                            </p>
                                        </div>

                                        <InlineButton
                                            btn="danger"
                                            onClick={() =>
                                                removeImportedFile(idx)
                                            }
                                        >
                                            <MdDelete className="w-5 h-5" />
                                        </InlineButton>
                                    </li>
                                );
                            })}
                        </ul>
                    )}

                    {isLoading && (
                        <div className="progress-bar">
                            <div className="progress-bar-value"></div>
                        </div>
                    )}

                    <div className="flex items-center gap-2 justify-center">
                        <Button onClick={importToServer}>
                            <MdOutlineCloudUpload className="me-3 w-4 h-4" />
                            Importer
                        </Button>
                        <Button
                            btn="danger"
                            onClick={() => setImportModal(false)}
                        >
                            Annuler
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* display image modal */}
            <Transition show={seeModal} as={Fragment} leave="duration-200">
                <Dialog
                    as="div"
                    id="modal"
                    className="fixed inset-0 flex overflow-hidden px-4 py-6 sm:px-0 items-center z-50 transform transition-all w-screen h-screen"
                    onClose={() => {
                        setSeeModal(false);
                        setImg(null);
                    }}
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

            {/* edit modal */}
            <Modal show={editModal.status} maxWidth="2xl" closeable={false}>
                <div className="p-4">
                    <h1 className="text-3xl font-semibold capitalize dark:text-white text-gray-900">
                        éditer image
                    </h1>

                    <div className="flex flex-col items-center mt-4">
                        <ReactCrop
                            crop={crop}
                            onChange={(pixelCrop, percentCrop) =>
                                setCrop(percentCrop)
                            }
                            aspect={null}
                            minWidth={100}
                        >
                            <img
                                ref={imgRef}
                                src={img}
                                style={{ maxHeight: "50vh" }}
                                onLoad={onImageLoad}
                            />
                        </ReactCrop>
                    </div>

                    {crop && (
                        <canvas
                            ref={previewCanvasRef}
                            className="mt-4"
                            style={{
                                display: "none",
                                border: "1px solid black",
                                objectFit: "contain",
                                width: 150,
                                height: 150,
                            }}
                        />
                    )}

                    {isLoading && (
                        <div className="progress-bar">
                            <div className="progress-bar-value"></div>
                        </div>
                    )}

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
                                // here you may send http request to update the reel image
                                editImg(cropInfo);
                            }}
                        >
                            éditer
                        </Button>
                        <Button
                            btn="danger"
                            onClick={() => {
                                setEditModal({ status: false }), setImg(null);
                            }}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            </Modal>

            {/* delete modal */}
            <Modal show={deleteModal.status} maxWidth="2xl" closeable={false}>
                <div className="py-6 px-4">
                    <div className="mb-3 text-gray-400 dark:text-gray-200">
                        {isLoading ? (
                            <FaSpinner className="animate-spin w-12 h-12 mx-auto" />
                        ) : (
                            <IoMdInformationCircleOutline className="w-12 h-12 mx-auto" />
                        )}
                    </div>
                    <h2 className="text-2xl font-medium mb-4 text-center text-gray-700 dark:text-gray-50">
                        Vous étes sur de vouloir Supprimé l'image?!
                    </h2>

                    {isLoading && (
                        <div className="progress-bar">
                            <div className="progress-bar-value"></div>
                        </div>
                    )}

                    <div className="flex items-center gap-4 justify-center">
                        <Button
                            btn="danger"
                            disabled={isLoading}
                            className="text-lg"
                            onClick={(e) => deleteImg()}
                        >
                            Supprimé
                        </Button>

                        <InlineButton
                            btn="info"
                            className="text-xl"
                            onClick={(e) => {
                                setDeleteModal({ status: false });
                            }}
                            disabled={isLoading}
                        >
                            Annuler
                        </InlineButton>
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ImageUpload;
