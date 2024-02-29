import React, { useEffect, useState } from "react";
import { Head, useForm } from "@inertiajs/react";
import AdminLayout from "@/Layouts/AdminLayout";
import { Dropdown as FBdropdown, Modal } from "flowbite-react";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Button, { BlueButton } from "@/Components/Button";
import { FaSpinner } from "react-icons/fa";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { IoMdInformationCircleOutline } from "react-icons/io";

const Index = ({
	hierarchicalCategories,
	mainCategoriesCount,
	subCategoriesCount,
}) => {
	const [isCreate, setIsCreate] = useState(false);

	const {
		data,
		setData,
		post,
		processing,
		reset,
		errors,
		setError,
		clearErrors,
	} = useForm({
		name: "",
	});

	const changeHandler = (e) => {
		clearErrors("name");
		setData("name", e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (!data.name) {
			setError("name", "Veuillez saisir le nom de la catégorie");
			return;
		}

		post(route("admin.category.storeCategory"), {
			preserveScroll: true,
			onSuccess: () => {
				reset();
				setIsCreate(false);
			},
		});
	};

	return (
		<AdminLayout>
			<Head title="Gestion de catégorie" />
			<h1 className="text-xl sm:text-3xl font-medium sm:font-bold mb-5">
				Gestion de catégorie
			</h1>

			<div className="w-full">
				<div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-visible">
					<div className="p-4 flex items-center justify-between">
						<h4 className="text-xl">
							Total catégorie :{" "}
							<span className="font-medium">
								{mainCategoriesCount}
							</span>
							, Total sous-catégorie :{" "}
							<span className="font-medium">
								{subCategoriesCount}
							</span>
						</h4>
						<Button onClick={() => setIsCreate(true)}>
							Ajouté une catégorie
						</Button>
					</div>

					<hr className="h-px mb-2 bg-gray-200 border-0 dark:bg-gray-700 mx-4" />

					<div className="flex items-start gap-6 p-4 overflow-x-auto overflow-visible min-h-full">
						{hierarchicalCategories.length === 0 && !isCreate ? (
							<>
								<div className="w-full text-center text-4xl py-4 font-bold">
									Aucune catégorie trouvé
								</div>
							</>
						) : (
							hierarchicalCategories.map((mainCategory) => (
								<div
									key={mainCategory.id}
									className="flex flex-col space-y-2"
								>
									<MainCategory mainCategory={mainCategory} />

									<SubCategories
										subCategories={
											mainCategory.subCategories
										}
										parentId={mainCategory.id}
									/>
								</div>
							))
						)}
						{isCreate && (
							<form
								onSubmit={submitHandler}
								className="w-screen max-w-sm"
							>
								<div>
									<TextInput
										value={data.name}
										onChange={changeHandler}
										placeholder="Nom de la catégorie"
									/>
									<InputError
										className="mt-2"
										message={errors.name}
									/>
								</div>
								<div className="mt-2 flex gap-2">
									<Button
										type="button"
										btn="danger"
										className="w-full justify-center"
										onClick={() => setIsCreate(false)}
										disabled={processing}
									>
										Annuler
									</Button>
									<Button
										btn="success"
										className="w-full justify-center"
										disabled={processing}
									>
										Ajouté
									</Button>
								</div>
							</form>
						)}
					</div>
				</div>
			</div>
		</AdminLayout>
	);
};

const MainCategory = ({ mainCategory }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [isDelete, setIsDelete] = useState(false);

	const {
		data,
		setData,
		post,
		processing,
		reset,
		errors,
		setError,
		clearErrors,
		delete: destroy,
	} = useForm({
		name: mainCategory.name,
	});

	useEffect(() => {
		setData("name", mainCategory.name);
	}, [mainCategory.name]);

	const changeHandler = (e) => {
		clearErrors("name");
		setData("name", e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (!data.name) {
			setError("name", "Veuillez saisir le nom de la catégorie");
			return;
		}

		if (data.name === mainCategory.name) {
			setError(
				"name",
				"Veuillez editer le nom de la catégorie pour pouvoir effectuez la modification"
			);
			return;
		}
		post(
			route("admin.category.updateCategory", {
				mainCategory: mainCategory.id,
			}),
			{
				preserveScroll: true,
				onSuccess: () => {
					setIsEdit(false);
					reset();
				},
			}
		);
	};

	const deleteHandler = (e) => {
		destroy(
			route("admin.category.destroyCategory", {
				mainCategory: mainCategory.id,
			}),
			{
				preserveScroll: true,
			}
		);
	};

	return (
		<>
			{isEdit ? (
				<form onSubmit={submitHandler} className="w-screen max-w-sm">
					<div>
						<TextInput value={data.name} onChange={changeHandler} />
						<InputError className="mt-2" message={errors.name} />
					</div>
					<div className="mt-2 flex gap-2">
						<Button
							type="button"
							btn="danger"
							className="w-full justify-center"
							onClick={() => setIsEdit(false)}
							disabled={processing}
						>
							Annuler
						</Button>
						<Button
							btn="success"
							className="w-full justify-center"
							disabled={processing}
						>
							Editer
						</Button>
					</div>
				</form>
			) : (
				<div className="flex items-center justify-between w-screen max-w-sm py-3 px-4 whitespace-nowrap rounded-lg shadow-sm border border-indigo-500 text-gray-800 dark:text-gray-50">
					<div className="font-medium text-lg">
						<span>{mainCategory.name}</span>
						<span
							className="ms-2 font-semibold"
							title="total sous catégories"
						>
							({mainCategory.subCategories.length})
						</span>
					</div>

					<FBdropdown
						label=""
						dismissOnClick={true}
						placement="bottom-end"
						renderTrigger={() => (
							<button
								className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
								type="button"
							>
								<PiDotsThreeOutlineVerticalFill className="w-5 h-5" />
							</button>
						)}
					>
						<FBdropdown.Item onClick={() => setIsEdit(true)}>
							Editer
						</FBdropdown.Item>
						<FBdropdown.Item onClick={() => setIsDelete(true)}>
							Supprimé
						</FBdropdown.Item>
					</FBdropdown>
				</div>
			)}

			<Modal
				show={isDelete}
				size={"xl"}
				onClose={() => setIsDelete(false)}
				popup
			>
				<Modal.Body className="relative p-4">
					<Modal.Header className="absolute top-0 right-0" />
					<div className="text-gray-400 dark:text-gray-200">
						{processing ? (
							<FaSpinner className="animate-spin w-14 h-14 mx-auto" />
						) : (
							<IoMdInformationCircleOutline className="w-14 h-14 mx-auto" />
						)}

						<h3 className="mt-5 text-start text-xl font-medium">
							Vous étes sur de vouloir supprimé la catégorie{" "}
							<span className="font-bold underline underline-offset-4">
								{mainCategory.name}
							</span>{" "}
							?
						</h3>

						<p className="mt-4 text-start text-pretty text-base font-medium">
							Une fois la categorie est supprimé, vous pouvez pas
							la récuperer et tous les sous-categorie et produits
							appartenant à cette catégorie seront supprimés.
						</p>

						<div className="mt-5 flex justify-center gap-4">
							<Button btn="danger" onClick={deleteHandler}>
								Oui, je suis sur
							</Button>
							<Button
								btn="secondary"
								onClick={() => setIsDelete(false)}
							>
								No, cancel
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

const SubCategories = ({ subCategories, parentId }) => {
	const [isCreate, setIsCreate] = useState(false);

	const {
		data,
		setData,
		post,
		processing,
		reset,
		errors,
		setError,
		clearErrors,
	} = useForm({
		name: "",
	});

	const changeHandler = (e) => {
		clearErrors("name");
		setData("name", e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (!data.name) {
			setError("name", "Veuillez saisir le nom de la catégorie");
			return;
		}
		post(
			route("admin.category.storeSubCategory", {
				mainCategory: parentId,
			}),
			{
				preserveScroll: true,
				onSuccess: () => {
					setIsCreate(false);
					reset();
				},
			}
		);
	};

	return (
		<>
			<ul className="space-y-2">
				{subCategories.map((subCategory) => (
					<li key={subCategory.id}>
						<SubCategory
							subCategory={subCategory}
							parentId={parentId}
						/>
					</li>
				))}
			</ul>

			{isCreate ? (
				<>
					<form onSubmit={submitHandler}>
						<div>
							<TextInput
								isFocused
								value={data.name}
								onChange={changeHandler}
								placeholder="Nom de la catégorie"
							/>
							<InputError
								message={errors.name}
								className="mt-2"
							/>
						</div>
						<div className="mt-2 flex gap-2">
							<Button
								type="button"
								btn="danger"
								className="w-full justify-center"
								onClick={() => setIsCreate(false)}
								disabled={processing}
							>
								Annuler
							</Button>
							<Button
								btn="success"
								className="w-full justify-center"
								disabled={processing}
							>
								Ajouté
							</Button>
						</div>
					</form>
				</>
			) : (
				<BlueButton onClick={() => setIsCreate(true)}>
					Ajouté
				</BlueButton>
			)}
		</>
	);
};

const SubCategory = ({ subCategory, parentId }) => {
	const [isEdit, setIsEdit] = useState(false);
	const [isDelete, setIsDelete] = useState(false);

	const {
		data,
		setData,
		post,
		processing,
		reset,
		errors,
		setError,
		clearErrors,
		delete: destroy,
	} = useForm({
		name: subCategory.name,
	});

	useEffect(() => {
		setData("name", subCategory.name);
	}, [subCategory.name]);

	const changeHandler = (e) => {
		clearErrors("name");
		setData("name", e.target.value);
	};

	const submitHandler = (e) => {
		e.preventDefault();
		if (!data.name) {
			setError("name", "Veuillez saisir le nom de la catégorie");
			return;
		}

		if (data.name === subCategory.name) {
			setError(
				"name",
				"Veuillez editer le nom de la catégorie pour pouvoir effectuez la modification"
			);
			return;
		}
		post(
			route("admin.category.updateSubCategory", {
				mainCategory: parentId,
				subCategory: subCategory.id,
			}),
			{
				preserveScroll: true,
				onSuccess: () => {
					setIsEdit(false);
					reset();
				},
			}
		);
	};

	const deleteHandler = (e) => {
		destroy(
			route("admin.category.destroySubCategory", {
				mainCategory: parentId,
				subCategory: subCategory.id,
			}),
			{
				preserveScroll: true,
			}
		);
	};

	return (
		<>
			{isEdit ? (
				<form onSubmit={submitHandler}>
					<div>
						<TextInput value={data.name} onChange={changeHandler} />
						<InputError message={errors.name} className="mt-2" />
					</div>
					<div className="mt-2 flex gap-2">
						<Button
							type="button"
							btn="danger"
							className="w-full justify-center"
							onClick={() => setIsEdit(false)}
							disabled={processing}
						>
							Annuler
						</Button>
						<Button
							btn="success"
							className="w-full justify-center"
							disabled={processing}
						>
							Editer
						</Button>
					</div>
				</form>
			) : (
				<div className="flex items-center justify-between w-full py-3 px-4 whitespace-nowrap rounded-lg shadow-sm border border-blue-500">
					<div className="font-medium text-lg">
						<span className="">{subCategory.name}</span>
						<span
							className="ms-2 font-semibold"
							title="total produit"
						>
							({subCategory.products_count})
						</span>
					</div>

					<FBdropdown
						label=""
						placement="bottom-end"
						dismissOnClick={true}
						renderTrigger={() => (
							<button
								className="inline-flex items-center p-0.5 text-sm font-medium text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
								type="button"
							>
								<PiDotsThreeOutlineVerticalFill className="w-5 h-5" />
							</button>
						)}
					>
						<FBdropdown.Item onClick={() => setIsEdit(true)}>
							Editer
						</FBdropdown.Item>
						<FBdropdown.Item onClick={() => setIsDelete(true)}>
							Supprimé
						</FBdropdown.Item>
					</FBdropdown>
				</div>
			)}

			<Modal
				show={isDelete}
				size={"xl"}
				onClose={() => setIsDelete(false)}
				popup
			>
				<Modal.Body className="relative p-4">
					<Modal.Header className="absolute top-0 right-0" />
					<div className="text-gray-400 dark:text-gray-200">
						{processing ? (
							<FaSpinner className="animate-spin w-14 h-14 mx-auto" />
						) : (
							<IoMdInformationCircleOutline className="w-14 h-14 mx-auto" />
						)}

						<h3 className="mt-5 text-start text-xl font-medium">
							Vous étes sur de vouloir supprimé la sous catégorie{" "}
							<span className="font-bold underline underline-offset-4">
								{subCategory.name}
							</span>{" "}
							?
						</h3>

						<p className="mt-4 text-start text-pretty text-base font-medium">
							Une fois la sous catégorie est supprimé, vous pouvez
							pas la récuperer et tous les produits appartenant à
							cette sous catégorie seront supprimés
						</p>

						<div className="mt-5 flex justify-center gap-4">
							<Button btn="danger" onClick={deleteHandler}>
								Oui, je suis sur
							</Button>
							<Button
								btn="secondary"
								onClick={() => setIsDelete(false)}
							>
								No, cancel
							</Button>
						</div>
					</div>
				</Modal.Body>
			</Modal>
		</>
	);
};

export default Index;
