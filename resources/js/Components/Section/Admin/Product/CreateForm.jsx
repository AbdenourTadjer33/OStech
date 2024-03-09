import React, { createContext, useEffect, useState } from "react";
import { useForm } from "laravel-precognition-react-inertia";
import { Transition, Dialog } from "@headlessui/react";
import Button, { IndigoButton } from "@/Components/Button";
import { MdKeyboardArrowDown as AD } from "react-icons/md";

import Modal from "@/Components/Modal";

import Informations from "./Create/Informations";
import Colors from "./Create/Colors";
import Options from "./Create/Options";
import Features from "./Create/Features";
import Visibility from "./Create/Visibility";
import ImageUpload from "./Create/ImageUpload";
import { PreviewProductCard } from "../../Client/Product/ProductCard";
import { PreviewProductDetails, ProductFeatures } from "../../Client/Product/DetailsProduct";

export const CreateProductFormContext = createContext();

const CreateForm = ({ mainCategories, subCategories, brands }) => {
	const {
		data,
		setData,
		post,
		processing,
		progress,
		errors,
		validate,
		forgetError,
		reset,
	} = useForm("post", route("admin.product.store"), {
		mainCategory: [],
		subCategory: [],
		brand: [],
		name: "",
		sku: "",
		qte: "",
		price: "",
		promo: "",
		description: "",
		features: [],
		// colors: [],
		// options: [],
		status: false,
		catalog: false,
		images: [],
	});

	const [isHidden, setIsHidden] = useState({
		informations: true,
		visibility: true,
		colors: true,
		options: true,
		features: true,
		images: true,
	});

	const [isCardProduct, setIsCardProduct] = useState(false);
	const [isDetailProduct, setIsDetailsProduct] = useState(false);

	const createProductForm = [
		{
			title: "informations",
			label: "Information génerale de produit",
			component: <Informations />,
		},
		{
			title: "visibility",
			label: "Visibilité de produit",
			component: <Visibility />,
		},
		// {
		// 	title: "colors",
		// 	label: "Couleur",
		// 	component: <Colors />,
		// },
		// {
		// 	title: "options",
		// 	label: "Options",
		// 	component: <Options />,
		// },
		{
			title: "features",
			label: "Caractéristique",
			component: <Features />,
		},
		{
			title: "images",
			label: "Images",
			component: <ImageUpload />,
		},
	];

	const submitHandler = (e) => {
		e.preventDefault();
		post(route("admin.product.store"), {
			onSuccess: () => reset(),
		});
	};

	return (
		<CreateProductFormContext.Provider
			value={{
				data,
				setData,
				errors,
				forgetError,
				progress,
				validate,
				mainCategories,
				subCategories,
				brands,
			}}
		>
			<div className="flex items-center justify-between">
				<h1 className="text-2xl sm:text-3xl font-medium">
					Créer un produit
				</h1>

				<div className="flex gap-2">
					<IndigoButton onClick={() => setIsCardProduct(true)}>
						Carte de produit
					</IndigoButton>
					<IndigoButton onClick={() => setIsDetailsProduct(true)}>
						Détail de produit
					</IndigoButton>
				</div>
			</div>

			<hr className="h-px mt-4 mb-6 bg-gray-200 border-0 dark:bg-gray-700" />

			<form onSubmit={submitHandler} encType="multipart/form-data">
				{createProductForm.map(({ title, label, component }, idx) => (
					<div key={idx}>
						<div className="flex justify-between items-center mb-5">
							<h2 className="text-xl">{label}</h2>

							<button
								type="button"
								onClick={() => {
									setIsHidden({
										...isHidden,
										[title]: !isHidden?.[title],
									});
								}}
								className="text-gray-900 dark:text-white p-1 rounded-full transition-colors duration-100 hover:bg-gray-200 dark:hover:bg-gray-500"
							>
								<AD
									className={`w-6 h-6 transform transition-transform duration-300 ease-in-out ${
										isHidden?.[title] ? "rotate-180" : ""
									}`}
								/>
							</button>
						</div>
						<Transition
							show={isHidden?.[title]}
							enter="transition-opacity duration-75"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="transition-opacity duration-75"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							{component}
						</Transition>
						{idx !== createProductForm.length - 1 && (
							<hr className="h-px my-6 bg-gray-200 border-0 dark:bg-gray-700" />
						)}
					</div>
				))}

				<div className="flex items-center gap-5 mt-10">
					<Button
						type="button"
						btn="danger"
						className="w-full justify-center"
						disabled={processing}
						onClick={() => reset()}
					>
						Annuler
					</Button>
					<Button
						type="submit"
						btn="primary"
						className="w-full justify-center"
						disabled={processing}
					>
						Ajouté
					</Button>
				</div>
			</form>

			<Modal
				show={isCardProduct}
				maxWidth="2xl"
				closeable
				onClose={() => setIsCardProduct(false)}
			>
				<div className="flex justify-center items-center p-4">
					<PreviewProductCard
						name={data.name}
						price={data.price}
						promo={data.promo}
						image={data.images?.[0]}
						mainCategory={data.mainCategory?.name}
						subCategory={data.subCategory?.name}
						colors={data.colors}
					/>
				</div>
			</Modal>

			<Dialog
				open={isDetailProduct}
				onClose={() => setIsDetailsProduct(false)}
				className="relative z-50"
			>
				{/* The backdrop, rendered as a fixed sibling to the panel container */}
				<div className="fixed inset-0 bg-black/30" aria-hidden="true" />

				{/* Full-screen scrollable container */}
				<div className="fixed inset-0 w-screen overflow-y-auto">
					{/* Container to center the panel */}
					<div className="flex min-h-full items-center justify-center p-4">
						{/* The actual dialog panel  */}
						<Dialog.Panel className="mx-auto max-w-screen-xl p-4 rounded bg-white">
							<div>
								<PreviewProductDetails
									name={data.name}
									description={data.description}
									price={data.price}
									promo={data.promo}
									images={data.images}
									brand={data.brand?.name}
									mainCategory={data.mainCategory?.name}
									subCategory={data.subCategory?.name}
								/>
								<ProductFeatures features={data.features} />
							</div>
						</Dialog.Panel>
					</div>
				</div>
			</Dialog>
			
		</CreateProductFormContext.Provider>
	);
};

export default CreateForm;
