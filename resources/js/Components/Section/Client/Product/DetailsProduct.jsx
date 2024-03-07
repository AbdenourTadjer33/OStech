import React, { useRef } from "react";
import { RadioGroup } from "@headlessui/react";
import { media, currencyFormat, calculatePrice } from "@/Logic/helper";
import Button from "@/Components/Button";
import { TbShoppingCartPlus } from "react-icons/tb";

export const ProductDetails = ({ product, addToCart, processing, data, setData }) => {
	const {
		name,
		description,
		price,
		promo,
		images,
		brand,
		colors,
		options,
		category,
		parent_category,
	} = product;

	const classNames = (...classes) => classes.filter(Boolean).join(" ");
	const mainImgRef = useRef();

	const visualize = (e) => {
		mainImgRef.current.src = e.target.src;
	};

	return (
		<section>
			<div className="flex flex-col md:flex-row gap-4">
				<div className="flex flex-row w-full md:w-1/2 gap-4 justify-center">
					<div className="flex flex-col items-center justify-start gap-4 overflow-y-auto">
						{images.map((img, idx) => (
							<img
								key={idx}
								src={media(img)}
								className="h-16 cursor-pointer"
								onClick={visualize}
							/>
						))}
					</div>

					<div className="relative h-[30vh] w-[30vh]">
						<img
							ref={mainImgRef}
							src={media(images?.[0])}
							className="h-full w-full object-contain object-center"
						/>
						{promo && (
							<div className="absolute bottom-0 left-0 right-0 w-full flex items-center justify-between">
								<span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
									- {promo} %
								</span>
							</div>
						)}
					</div>
				</div>
				<div className="space-y-3 md:mt-4 md:ms-2">
					<h6 className="text-sm text-gray-500">
						{parent_category} {">"} {category}
					</h6>
					<h2 className="text-xl font-medium text-info-950">
						{name}
					</h2>

					{/* {colors && (
						<div>
							<h3 className="text-sm font-medium text-gray-900">
								Couleur
							</h3>

							<RadioGroup value={data.color} onChange={(e) => setData('color', e)} className="mt-4">
								<RadioGroup.Label className="sr-only">
									Choose a color
								</RadioGroup.Label>
								<div className="flex items-center space-x-3">
									{colors.map((color, idx) => (
										<RadioGroup.Option
											key={idx}
											value={color}
											className={({ active, checked }) =>
												classNames(
													active && checked
														? "ring ring-offset-1"
														: "",
													!active && checked
														? "ring-2"
														: "",
													"relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
												)
											}
										>
											<RadioGroup.Label
												as="span"
												className="sr-only"
											>
												{color.label}
											</RadioGroup.Label>
											<span
												aria-hidden="true"
												className="h-8 w-8 rounded-full border border-black border-opacity-10"
												style={{
													background: color.code,
												}}
											/>
										</RadioGroup.Option>
									))}
								</div>
							</RadioGroup>
						</div>
					)} */}

					{/* {options.map((option, idx) => (
						<div key={idx}>
							<h3 className="text-sm font-medium text-gray-900">
								{option.title}
							</h3>
							<RadioGroup
								className="mt-4"
							>
								<RadioGroup.Label className="sr-only">
									Choose an option
								</RadioGroup.Label>
								<div className="grid grid-cols-4 gap-4 sm:grid-cols-8 lg:grid-cols-4">
									{option.options.map((option, idx) => (
										<RadioGroup.Option
											key={idx}
											className={({ active }) =>
												classNames(
													"cursor-pointer bg-white text-gray-900 shadow-sm",
													active
														? "ring-2 ring-indigo-500"
														: "",
													"group relative flex items-center justify-center rounded-md border py-3 px-4 text-sm font-medium uppercase hover:bg-gray-50 focus:outline-none sm:flex-1 sm:py-6"
												)
											}
										>
											{({ active, checked }) => (
												<>
													<RadioGroup.Label as="span">
														{option.label}
													</RadioGroup.Label>
												</>
											)}
										</RadioGroup.Option>
									))}
								</div>
							</RadioGroup>
						</div>
					))} */}

					<div className="relative">
						{promo ? (
							<>
								<span className="text-lg line-through text-gray-500">
									{currencyFormat(price)}
								</span>
								<h4 className="text-2xl font-medium text-indigo-800">
									{currencyFormat(
										calculatePrice(price, promo)
									)}
								</h4>
							</>
						) : (
							<h4 className="text-2xl font-medium text-indigo-800">
								{currencyFormat(product.price)}
							</h4>
						)}
					</div>

					<div className="flex gap-2 items-center justify-start">
						<Button btn="info" className="capitalize">
							Commander maintenant
						</Button>
						<button
							disabled={processing}
							className="text-info-800 hover:text-info-500"
							onClick={() => addToCart(product.id)}
						>
							<span className="sr-only">add product to cart</span>
							<TbShoppingCartPlus className="w-6 h-6" />
						</button>
					</div>
				</div>
			</div>

			{description && (
				<div
					className="mt-10 text-start text-pretty prose prose-headings:my-2 prose-a:text-blue-700 prose-a:underline"
					dangerouslySetInnerHTML={{ __html: description }}
				/>
			)}
		</section>
	);
};

export const PreviewProductDetails = ({
	name,
	description,
	price,
	promo,
	images,
	brand,
	mainCategory,
	subCategory,
}) => {
	const mainImgRef = useRef();

	const visualize = (e) => {
		mainImgRef.current.src = e.target.src;
	};
	return (
		<section>
			<div className="flex flex-col md:flex-row gap-4">
				<div className="flex flex-row w-full md:w-1/2 gap-4 justify-center">
					<div className="flex flex-col items-center justify-start gap-4 overflow-y-auto">
						{images.map((img, idx) => (
							<img
								key={idx}
								src={media(img)}
								className="h-16 cursor-pointer"
								onClick={visualize}
							/>
						))}
					</div>

					<div className="relative h-[30vh] w-[30vh]">
						<img
							ref={mainImgRef}
							src={media(images?.[0] ?? "default.png")}
							className="h-full w-full object-contain object-center"
						/>
						{promo && (
							<div className="absolute bottom-0 left-0 right-0 w-full flex items-center justify-between">
								<span className="inline-flex items-center rounded-md bg-indigo-50 px-2 py-1 text-sm font-medium text-indigo-700 ring-1 ring-inset ring-indigo-700/10">
									- {promo} %
								</span>
							</div>
						)}
					</div>
				</div>
				<div className="space-y-3 md:mt-4 md:ms-2">
					<h6 className="text-sm text-gray-500">
						{mainCategory} {">"} {subCategory}
					</h6>
					<h2 className="text-xl font-medium text-info-950">
						{name}
					</h2>

					<div className="relative">
						{promo ? (
							<>
								<span className="text-lg line-through text-gray-500">
									{currencyFormat(price)}
								</span>
								<h4 className="text-2xl font-medium text-indigo-800">
									{currencyFormat(
										calculatePrice(price, promo)
									)}
								</h4>
							</>
						) : (
							<h4 className="text-2xl font-medium text-indigo-800">
								{currencyFormat(price)}
							</h4>
						)}
					</div>

					<div className="flex gap-2 items-center justify-start">
						<Button btn="info" className="capitalize">
							Commander maintenant
						</Button>
						<button className="text-info-800 hover:text-info-500">
							<span className="sr-only">add product to cart</span>
							<TbShoppingCartPlus className="w-6 h-6" />
						</button>
					</div>
				</div>
			</div>

			{description && (
					<div
						className="mt-10 text-start text-pretty prose prose-headings:my-2 prose-a:text-blue-700 prose-a:underline"
						dangerouslySetInnerHTML={{ __html: description }}
					/>
			)}
		</section>
	);
};

export const ProductFeatures = ({ features }) => (
	<div className="mt-5 sm:mt-10">
		<ul className="rounded-lg overflow-hidden w-full mx-auto border border-gray-200 shadow">
			<li className="p-4 bg-white ">
				<h2 className="uppercase text-xl sm:text-3xl text-gray-700 font-semibold">
					A propos de produit
				</h2>
			</li>
			<div className="divide-y divide-gray-200">
				{features.map((section, idx) => {
					return (
						<li
							key={idx}
							className="p-4 bg-white hover:bg-gray-50 flex items-center"
						>
							<h3 className="text-base sm:text-xl text-gray-800 font-medium sm:font-semibold capitalize basis-1/4">
								{section?.title}
							</h3>

							<div className="basis-3/4">
								{section?.features.map((feature, idx) => (
									<div
										key={idx}
										className="grid gap-4 grid-cols-3"
									>
										<div
											key={idx}
											className="text-sm sm:text-lg sm:font-medium text-gray-700"
										>
											{feature.label}
										</div>
										<div className="text-xs sm:text-base text-gray-600 col-span-2">
											{feature.description}
										</div>
									</div>
								))}
							</div>
						</li>
					);
				})}
			</div>
		</ul>
	</div>
);

const DangerousContent = () => {
	return <></>
}