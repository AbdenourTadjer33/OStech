import React from "react";
import { Link, useForm } from "@inertiajs/react";
import { currencyFormat } from "@/Logic/helper";
import { TbShoppingCartPlus } from "react-icons/tb";
import Button from "@/Components/Button";

const ProductCard = ({
    id,
    slug,
    name,
    price,
    promo,
    image,
    category,
    parentCategory,
}) => {

    const { post, processing } = useForm();

    const addToCart = (id) => {
        post(route("cart.add", { id }), {});
    };
    
    return (
        <div className="group w-full max-w-sm p-4 bg-white shadow rounded-lg overflow-hidden transition-all duration-300 hover:shadow-2xl">
            <Link
                href={route("products.show", { slug })}
                className="overflow-hidden block"
            >
                {/* <div
                    className={`w-full h-64 bg-center bg-contain bg-no-repeat rounded-t-lg transition duration-300 bg-[url(/media/${images?.[0]})]`}></div> */}
                <img
                    className="w-full h-64 rounded-t-lg object-contain"
                    src={`/media/${image ? image : "default.png"}`}
                />
            </Link>

            <div className="pt-5 space-y-4">
                <h6 className="text-sm text-gray-500">
                    {parentCategory} {">"} {category}
                </h6>
                <Link href={route("products.show", { slug })}>
                    <h5 className="text-lg font-medium leading-tight text-info-950 h-11 my-1">
                        {name}
                    </h5>
                </Link>
                <div className="flex items-center justify-between">
                    <h4 className="text-lg font-medium text-gray-800">
                        {currencyFormat(price)}
                    </h4>
                    <div className="flex gap-3">
                        {/* Affiché */}
                        <Link
                            href={route("products.show", { slug })}
                            // className="text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition ease-in-out duration-150 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-base px-4 py-2 text-center "
                        >
                            <Button btn="info" type="button">
                                Affiché
                            </Button>
                        </Link>
                        <button className="text-info-800 hover:text-info-500"
                            onClick={() => addToCart(id)}
                            >
                            <TbShoppingCartPlus className="w-6 h-6" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
