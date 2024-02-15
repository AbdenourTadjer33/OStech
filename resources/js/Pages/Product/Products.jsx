import React, { useContext } from "react";
import { Head, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import ProductCard from "@/Components/Section/Client/ProductCard";
import { createContext } from "react";

const ProductsContext = createContext();

const Products = ({products}) => {

    const { data } = products;


    return (
        <AppLayout>
            <Head title="Nos produits" />

            <ProductsContext.Provider value={{ data }}>
                {/* <div
                    id="filter"
                    className="h-20 bg-white mb-5 text-center text-2xl"
                >
                    filter
                </div> */}

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
                                category={product.category}
                                parentCategory={product.parent_category}
                            />
                        );
                    })}
                </div>
            </ProductsContext.Provider>
        </AppLayout>
    );
};

export default Products;
