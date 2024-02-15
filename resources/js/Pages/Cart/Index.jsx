import React, { createContext, useContext } from "react";
import { Link, Head, usePage, useForm } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Container from "@/Components/Container";
import { currencyFormat, media } from "@/Logic/helper";
import { useState } from "react";
import { useEffect } from "react";
import Minus from "@/Components/Icons/Minus";
import Plus from "@/Components/Icons/Plus";
import { MdClose } from "react-icons/md";

const Index = () => {
    const { cart } = usePage().props;
    return (
        <AppLayout>
            <Head title="Panier" />
            <div className="mt-10">
                <Container>
                    <div className="mb-5">
                        <h1 className="text-4xl text-gray-800">Mon Panier</h1>
                    </div>
                    <CartItems cart={cart} />
                </Container>
            </div>
        </AppLayout>
    );
};

export default Index;

const CartItems = ({ cart }) => {
    const item = cart[0];
    return (
        <>
            {/* <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-16 py-3">
                                <span className="sr-only">Image</span>
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Article
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Quantité
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Prix
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-3"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {cart.map((cartItem, idx) => (
                            <Item key={idx} cartItem={cartItem} />
                        ))}
                    </tbody>
                </table>
            </div> */}

            <div className="mt-5">
                <div className="flex justify-between max-w-xl gap-10">
                    <div>
                        <img
                            className="w-32 max-w-full max-h-full"
                            src={media(item.product?.images?.[0])}
                            alt={item.product.name}
                        />
                    </div>

                    <div className="flex-col items-start space-y-4">
                        <div className="flex self-start items-center gap-2">
                            <h3>{item.product.name}</h3>
                            <button className="relative -m-2 p-2 text-gray-400 hover:text-gray-500">
                                <span class="absolute -inset-0.5"></span>
                                <MdClose className="w-6 h-6 self-start" />
                            </button>
                        </div>

                        <div className="flex items-center">
                            <div className="basis-1/3 flex items-center">
                                <button
                                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                    type="button"
                                >
                                    <Minus />
                                </button>
                                <div>
                                    <input
                                        type="text"
                                        className="bg-gray-50 w-10 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <button
                                    className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                    type="button"
                                >
                                    <Plus />
                                </button>
                            </div>
                            <div className="basis-1/3 ">
                                {currencyFormat(item.product.price)}
                            </div>
                            <div className="basis-1/3 flex items-center">
                                {currencyFormat(item.product.price * 2)}
                            </div>
                        </div>
                    </div>
                    {/* <div className="grid grid-cols-2">
                        <h3 className="col-span-2">{item.product.name}</h3>

                        <div>
                        
                            <div>{currencyFormat(item.product.price)}</div>
                        </div>
                    </div> */}
                </div>
            </div>
        </>
    );
};

const Item = ({ cartItem }) => {
    const { post, processing } = useForm();
    const [qte, setQte] = useState(cartItem?.qte);

    useEffect(() => {
        console.log(qte);
    }, [qte]);

    const handleCounter = (increment = false) => {
        setQte((prevQte) => {
            if ((!increment && prevQte === 1) || (increment && prevQte === 5)) {
                return prevQte;
            }

            let newQte = increment ? prevQte + 1 : prevQte - 1;

            return newQte;
        });
    };

    const handleQte = (productID) => {
        post(route("cart.handle.qte", { id: productID }));
    };
    const destroyItem = (productID) => {
        post(route("cart.remove", { id: productID }));
    };
    return (
        <>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="p-4">
                    <img
                        src={media(cartItem.product?.images?.[0])}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt="Apple Watch"
                    />
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {cartItem.product.name}
                </td>
                <td className="px-6 py-4">
                    <div className="flex items-center">
                        <button
                            onClick={() => handleCounter(false)}
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                        >
                            <Minus />
                        </button>
                        <div>
                            <input
                                type="text"
                                className="bg-gray-50 w-10 border border-gray-300 text-gray-900 text-sm text-center rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                value={qte}
                                readOnly
                            />
                        </div>
                        <button
                            onClick={() => handleCounter(true)}
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                            type="button"
                        >
                            <Plus />
                        </button>
                    </div>
                </td>
                <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {currencyFormat(cartItem.product?.price)}
                </td>
                <td className="p-6 font-semibold text-gray-900">
                    {currencyFormat(cartItem.product?.price * qte)}
                </td>
                <td className="px-6 py-4">
                    <button
                        className="font-medium text-red-600 dark:text-red-500 hover:underline"
                        onClick={() => destroyItem(cartItem.product?.id)}
                    >
                        Remove
                    </button>
                </td>
            </tr>
        </>
    );
};
