import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { MdClose } from "react-icons/md";
import Minus from "@/Components/Icons/Minus";
import Plus from "@/Components/Icons/Plus";
import { currencyFormat, media, debounce } from "@/Logic/helper";
import { useState } from "react";
import { useEffect } from "react";
import { useRef } from "react";

const SidebarCart = ({ open, setOpen, cart }) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-auto bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">
                                                    Panier
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() =>
                                                            setOpen(false)
                                                        }
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">
                                                            Close panel
                                                        </span>
                                                        <MdClose className="h-6 w-6" />
                                                    </button>
                                                </div>
                                            </div>

                                            <hr className="-mx-4 my-8 mt-4" />

                                            <div className="">
                                                <div className="flow-root">
                                                    <ul
                                                        role="list"
                                                        className="-my-6 divide-y divide-gray-200"
                                                    >
                                                        {cart.map(
                                                            (item, idx) => (
                                                                <li
                                                                    key={idx}
                                                                    className="flex py-6"
                                                                >
                                                                    <Item
                                                                        item={
                                                                            item
                                                                        }
                                                                    />
                                                                </li>
                                                            )
                                                        )}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        {/* <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                                <div className="flex justify-between text-base font-medium text-gray-900">
                                                    <p>Subtotal</p>
                                                    <p>$262.00</p>
                                                </div>
                                                <p className="mt-0.5 text-sm text-gray-500">
                                                    Shipping and taxes
                                                    calculated at checkout.
                                                </p>
                                                <div className="mt-6">
                                                    <a
                                                        href="#"
                                                        className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                    >
                                                        Checkout
                                                    </a>
                                                </div>
                                                <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                    <p>
                                                        or{" "}
                                                        <button
                                                            type="button"
                                                            className="font-medium text-indigo-600 hover:text-indigo-500"
                                                            onClick={() =>
                                                                setOpen(false)
                                                            }
                                                        >
                                                            Continue Shopping
                                                            <span aria-hidden="true">
                                                                {" "}
                                                                &rarr;
                                                            </span>
                                                        </button>
                                                    </p>
                                                </div>
                                            </div> */}
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

const Item = ({ item }) => {
    const { post, processing, data, setData } = useForm({
        qte: item.qte,
    });
    const isFirstRender = useRef(true);

    useEffect(() => {
        if (!isFirstRender.current) {
            const debouncedApiCall = debounce(() => {
                post(route("cart.handle.qte", { id: item?.product?.id }));
            }, 1000);

            debouncedApiCall();

            return () => debouncedApiCall.cancel();
        } else {
            isFirstRender.current = false;
        }
    }, [data.qte]);

    const handleCounter = (increment = false) => {
        const qte = data.qte;
        if ((!increment && qte === 1) || (increment && qte === 5)) {
            return;
        }

        setData('qte', increment ? qte + 1 : qte - 1);
        // setQte((prevQte) => {
        //     if ((!increment && prevQte === 1) || (increment && prevQte === 5)) {
        //         return prevQte;
        //     }

        //     let newQte = increment ? prevQte + 1 : prevQte - 1;

        //     return newQte;
        // });
    };

    const destroyItem = () => {
        post(route("cart.remove", { id: item?.product?.id }));
    };

    return (
        <>
            <div className="h-24 object-contain overflow-hidden rounded border border-gray-200">
                <img
                    src={media(item?.product?.images[0])}
                    alt={item?.product?.name}
                    className="h-full w-full object-cover object-center"
                />
            </div>

            <div className="ml-4 flex flex-1 flex-col">
                <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">
                        <h3 className="text-sm">
                            <a href="#">
                                {item?.product?.name.slice(0, 28) + "..."}
                            </a>
                        </h3>
                        <p className="ml-4">
                            {currencyFormat(item?.product?.price * data.qte)}
                        </p>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">
                        {currencyFormat(item?.product.price)}
                    </p>
                </div>
                <div className="flex flex-1 items-end justify-between text-sm">
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
                                value={data.qte}
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

                    <div className="flex">
                        <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => destroyItem(item.product?.id)}
                        >
                            Remove
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SidebarCart;
