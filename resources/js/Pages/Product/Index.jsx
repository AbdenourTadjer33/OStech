import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Container from "@/Components/Container";
import SelectInput from "@/Components/SelectInput";
import ProductCard from "@/Components/Section/Client/Product/ProductCard";

const Index = ({ products, categoryName }) => {

	const { data } = products;

	return (
		<AppLayout>
			<Head title={categoryName} />

			<Container className="space-y-10">
				<div className="flex items-center justify-between">
					<h2 className="text-4xl font-medium text-gray-600">
						{categoryName}
					</h2>

					<div>
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

				<div className="flex items-center justify-center flex-wrap gap-5">
					{data.map((product) => (
						<ProductCard
							key={product.id}
							id={product.id}
							slug={product.slug}
							name={product.name}
							price={product.price}
							promo={product.promo}
							image={product.image}
							category={product.category}
							parentCategory={product.parent_category}
						/>
					))}
				</div>
			</Container>
		</AppLayout>
	);
};

export default Index;
