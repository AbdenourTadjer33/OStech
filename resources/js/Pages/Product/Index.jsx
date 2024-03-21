import React from "react";
import { Head } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Container from "@/Components/Container";
import SelectInput from "@/Components/SelectInput";
import ProductCard from "@/Components/Section/Client/Product/ProductCard";
import Pagination from "@/Components/Pagination";
import Heading from "@/Components/Heading";
import { NewsLetter } from "../Welcome";

const Index = ({ products, categoryName }) => {
	const {
		data,
		current_page,
		next_page_url,
		prev_page_url,
		links,
		per_page,
		total,
		last_page,
	} = products;

	return (
		<AppLayout>
			<Head title={categoryName} />

			<Container className="space-y-10 rounded-sm">
				<div className="space-y-4">
					<Heading level={2} className="font-light text-gray-800">
						{categoryName}
					</Heading>
					<div className="flex items-center justify-between">
						<h4 className="text-xl">
							<span className="font-medium">{total}</span>{" "}
							Appareils trouvés
						</h4>
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
							subCategory={product.subCategory}
							mainCategory={product.mainCategory}
							colors={product.colors}
						/>
					))}
				</div>

				{total > per_page && (
					<nav
						className={`flex flex-col md:flex-row justify-between items-start md:items-center space-y-3 md:space-y-0 p-4`}
					>
						<Pagination
							currentPage={current_page}
							next={next_page_url}
							prev={prev_page_url}
							links={links}
							perPage={per_page}
							total={total}
							last_page={last_page}
						/>
					</nav>
				)}
			</Container>

			<NewsLetter/>
		</AppLayout>
	);
};

export default Index;
