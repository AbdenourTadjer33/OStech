import React, { useState, useRef, Fragment } from "react";
import "react-image-crop/dist/ReactCrop.css";
import ReactCrop, {
	centerCrop,
	convertToPixelCrop,
	makeAspectCrop,
} from "react-image-crop";
import { Dialog, Transition } from "@headlessui/react";
import { VscChromeClose } from "react-icons/vsc";
import InlineButton from "@/Components/InlineButton";
import Modal from "@/Components/Modal";
import Button from "@/Components/Button";
import setCanvasPreview from "@/Logic/setCanvasPreview";
import { MdOutlineCloudUpload } from "react-icons/md";
import { FaSpinner } from "react-icons/fa";
import { IoMdInformationCircleOutline } from "react-icons/io";

import { MdModeEdit, MdDelete, MdOpenInNew } from "react-icons/md";
import DropZoneInput from "@/Components/DropZoneInput";
import "axios";
import { media } from "@/Logic/helper";
import Heading from "@/Components/Heading";

const LogoUpload = ({ data, setData }) => {
	// image importation states
	const [importModal, setImportModal] = useState(false);
	const [importedFiles, setImportedFiles] = useState();

	// loading state
	const [isLoading, setIsLoading] = useState(false);

	// dnd states
	const [draggedRow, setDraggedRow] = useState(null);
	const [dragOverRow, setDragOverRow] = useState(null);

	// feature state's
	const [img, setImg] = useState(null);
	const [seeModal, setSeeModal] = useState(false);
	const [deleteModal, setDeleteModal] = useState(false);
	const [editModal, setEditModal] = useState(false);

	// crop state
	const [crop, setCrop] = useState({});

	const imgRef = useRef();
	const previewCanvasRef = useRef();

	const previewImport = (e) => {
		const file = e.target.files[0];
		if (!file) return;

		setImportedFiles({ file, url: URL.createObjectURL(file) });
	};

	const removeImportedFile = () => {
		setImportedFiles(null);
	};

	const importToServer = async () => {
		if (!importedFiles) return;

		setIsLoading(true);

		const formData = new FormData();
		formData.append("image", importedFiles.file);

		try {
			const response = await axios.post(
				"/upload/save-temp",
				formData,
				{
					headers: {
						"Content-Type": "multipart/form-data",
					},
				}
			);

			const data = response.data.data;
			setData("image", data?.path);
			setImportedFiles(null);
			setIsLoading(false);
			setImportModal(false);
		} catch (error) {
			console.error(error);
			setIsLoading(false);
		}
	};

	const openSeeModal = () => {
		setSeeModal(() => true);
	};

	const openDeleteModal = (idx) => {
		setDeleteModal(true);
	};

	const deleteImg = async () => {
		setIsLoading(true);

		try {
			const response = await axios.post("/upload/destroy-temp", {
				path: data.image,
			});
			if (response.status === 200) {
				setData("image");
				setIsLoading(false);
				setDeleteModal(false);
			} else {
				alert(
					"un probleme est sourvenu, veuillez contactez le service de dév"
				);
			}
		} catch (error) {
			console.error("error while deleting the img", error);
			setIsLoading(false);
		}
	};

	const openEditModal = () => {
		setEditModal(true);
	};

	const editImg = async (cropInfo) => {
		setIsLoading(true);
		try {
			const response = await axios.post("/upload/edit-temp", {
				path: data.image,
				cropInfo,
			});
			if (response.status === 200) {
				const status = response.data.status;
				const message = response.data.message;
				const path = response?.data?.data?.path;

				setData("image", path);
			}

			setIsLoading(false);
			setEditModal(false);
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
			<Heading level={5} className="mb-3">
				Logo
			</Heading>

			{/* main */}
			<div className={`h-full overflow-auto rounded-lg shadow-lg`}>
				<div className="bg-gray-50 dark:bg-gray-700 shadow-sm py-3 px-4 flex justify-end gap-4">
					<Button
						type="button"
						btn="info"
						onClick={(e) => setImportModal(true)}
					>
						<MdOutlineCloudUpload className="me-3 w-4 h-4" />
						Importer logo de brand
					</Button>
				</div>
				{!data.image ? (
					<div className="p-4 text-center text-xl font-semibold bg-gray-50/25 dark:bg-gray-700/25 shadow-sm">
						Aucune image n'est importé
					</div>
				) : (
					<table className="w-full">
						<tbody>
							{data.image && (
								<tr className="px-5 py-2 bg-gray-50 border border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-opacity-75">
									<td className="pe-4 py-2">
										<img
											className="w-16 md:w-28 max-h-full"
											src={media(data.image)}
										/>
									</td>

									<td className="px-4 py-2 space-x-4 text-center">
										<InlineButton
											btn="primary"
											onClick={(e) => {
												setImg("/media/" + data.image);
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
												setImg("/media/" + data.image);
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
												openDeleteModal();
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
							)}
						</tbody>
					</table>
				)}
			</div>

			<Modal show={importModal} maxWidth="4xl" closeable={false}>
				<div className="py-4 px-5 bg-gray-100 dark:bg-gray-600">
					<h1 className="text-3xl font-semibold dark:text-white text-gray-900 mb-6">
						{!importedFiles ? (
							<>Importer des images</>
						) : (
							<>Confirmation</>
						)}
					</h1>

					{!importedFiles ? (
						<div className="mb-6">
							<DropZoneInput
								onChange={previewImport}
								accept="image/*"
								multiple
							/>
						</div>
					) : (
						<ul className="rounded-lg overflow-hidden w-full border border-gray-200 dark:border-gray-400 max-h-80 overflow-y-auto mx-auto divide-y divide-gray-200 dark:divide-gray-400 mb-6">
							<li className="px-5 py-2 bg-gray-100 hover:bg-gray-50 dark:bg-gray-700/20 dark:hover:bg-gray-600 flex items-center justify-between gap-4">
								<img
									src={importedFiles.url}
									className="w-16 md:w-28 max-h-full"
								/>
								<div className="text-gray-600 dark:text-gray-200 basis-1/2 text-base">
									<p>
										Fichier:{" "}
										<span className="text-lg font-medium text-gray-700 dark:text-gray-100">
											{importedFiles.file.size /
												1024 ** 2}{" "}
											MB
										</span>
									</p>
									<p>
										Type fichier:{" "}
										<span className="text-lg font-medium text-gray-700 dark:text-gray-100">
											{importedFiles.file.type}
										</span>
									</p>
								</div>

								<InlineButton
									btn="danger"
									onClick={() => removeImportedFile()}
								>
									<MdDelete className="w-5 h-5" />
								</InlineButton>
							</li>
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
			<Modal show={editModal} maxWidth="2xl" closeable={false}>
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
								setEditModal(false), setImg(null);
							}}
						>
							Annuler
						</Button>
					</div>
				</div>
			</Modal>

			{/* delete modal */}
			<Modal show={deleteModal} maxWidth="2xl" closeable={false}>
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
								setDeleteModal(false);
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

export default LogoUpload;
