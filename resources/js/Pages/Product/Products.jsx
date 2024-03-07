import React from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import ProductCard from "@/Components/Section/Client/Product/ProductCard";
import Container from "@/Components/Container";
import SelectInput from "@/Components/SelectInput";

const Products = ({ products }) => {
	const { data } = products;

	return (
		<AppLayout>
			<Head title="Nos produits" />

			<Container>
				<div className="mb-10 space-y-4">
					<h2 className="text-4xl text-gray-600">Nos produits</h2>
					<div className="flex items-center justify-between">
						<h4 className="text-xl">
							<span className="font-medium">{data.length}</span>{" "}
							Appareils trouvés
						</h4>

						<div className=" ">
							<SelectInput className="rounded-2xl">
								<SelectInput.Option>
									Trier par nom
								</SelectInput.Option>
								<SelectInput.Option>
									Trier par prix décroissant
								</SelectInput.Option>
								<SelectInput.Option>
									Trier par prix croissant
								</SelectInput.Option>
								<SelectInput.Option>
									Trier par nom
								</SelectInput.Option>
							</SelectInput>
						</div>
					</div>
				</div>

				<div className="flex justify-center items-start flex-wrap gap-4">
					{data.map((product) => {
						return (
							<ProductCard
								key={product.id}
								id={product.id}
								slug={product.slug}
								name={product.name}
								price={product.price}
								promo={product.promo}
								image={product.image}
								subCategory={product.category}
								mainCategory={product.parent_category}
								colors={product.colors}
							/>
						);
					})}
				</div>
			</Container>
		</AppLayout>
	);
};

export default Products;
