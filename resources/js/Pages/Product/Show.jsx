import React from "react";
import { Head, Link, useForm } from "@inertiajs/react";
import ProductCard from "@/Components/Section/Client/ProductCard";
import AppLayout from "@/Layouts/AppLayout";
import { currencyFormat, media } from "@/Logic/helper";
import Button from "@/Components/Button";
import { TbShoppingCartPlus } from "react-icons/tb";
import Container from "@/Components/Container";

const Show = ({ product }) => {
    const { post, processing } = useForm();
    
    const addToCart = (id) => {
        post(route('cart.add', { id }), {
            preserveScroll: true
        });
    }
    return (
        <AppLayout>
            <Head title={product.name} />

            <Container>
                <section className="flex flex-col md:flex-row gap-4">
                    <div className="flex flex-row w-full md:w-1/2 gap-2 justify-center">
                        <div className="flex flex-col items-center justify-start gap-4 overflow-y-auto">
                            {product.images.map((img, idx) => (
                                <img
                                    key={idx}
                                    src={media(img)}
                                    className="h-16 cursor-pointer"
                                />
                            ))}
                        </div>

                        <img
                            src={media(product.images?.[0])}
                            className="h-[30vh] w-auto"
                        />
                    </div>

                    <div className="space-y-3 md:mt-4 md:ms-2">
                        <h6 className="text-sm text-gray-500">
                            {product.parent_category} {">"} {product.category}
                        </h6>
                        <h2 className="text-xl font-medium text-info-950">
                            {product.name}
                        </h2>
                        <h4 className="text-lg font-medium text-gray-800">
                            {currencyFormat(product.price)}
                        </h4>
                        <div className="flex gap-2 items-center justify-start">
                            <Button btn="info" className="capitalize">
                                Commander maintenant
                            </Button>
                            <button className="text-info-800 hover:text-info-500"
                                onClick={() => addToCart(product.id)}
                            >
                                <TbShoppingCartPlus className="w-6 h-6" />
                            </button>
                        </div>
                        {/* {product.description && (
                            <div
                                dangerouslySetInnerHTML={{
                                    __html: product.description,
                                }}
                            />
                        )} */}
                    </div>
                </section>
            </Container>

            <div className="bg-info-50 p-4 mb-10">
                <Container>
                    <div className="flex items-center justify-between">
                        <h4 className="text-lg font-medium">Modèles pareils</h4>
                    </div>
                </Container>
            </div>

            <Container>
                <div className="mb-5">
                    <ul className="rounded-lg overflow-hidden w-full mx-auto border border-gray-200 shadow">
                        <li className="p-4 bg-white ">
                            <h2 className="uppercase text-xl sm:text-3xl text-gray-900 font-meduim">
                                Caractéristique
                            </h2>
                        </li>
                        <div className="divide-y divide-gray-200">
                            {product.features.map((section, idx) => {
                                return (
                                    <li
                                        key={idx}
                                        className="p-4 bg-white hover:bg-gray-50 flex items-center"
                                    >
                                        <h3 className="text-base sm:text-xl text-gray-800 font-medium sm:font-semibold capitalize basis-1/4">
                                            {section?.title}
                                        </h3>

                                        <div className="basis-3/4">
                                            {section?.features.map(
                                                (feature, idx) => (
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
                                                            {
                                                                feature.description
                                                            }
                                                        </div>
                                                    </div>
                                                )
                                            )}
                                        </div>
                                    </li>
                                );
                            })}
                        </div>
                    </ul>
                </div>
            </Container>
        </AppLayout>
    );
};

export default Show;
