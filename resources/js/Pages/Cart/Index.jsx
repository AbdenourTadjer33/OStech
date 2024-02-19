import React, { useState, useEffect } from "react";
import { Head, usePage } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Container from "@/Components/Container";
import CartItem from "@/Components/Section/Client/Cart/CartItem";

import { currencyFormat } from "@/Logic/helper";
import CreateOrder from "@/Components/Section/Client/Order/CreateOrder";
import axios from "axios";
import InputError from "@/Components/InputError";
import CartSummary from "@/Components/Section/Client/Cart/CartSummary";
import Coupon from "@/Components/Section/Client/Cart/Coupon";
import { Transition } from "@headlessui/react";

const Index = () => {
    const { cart, coupon } = usePage().props;
    const [order, setOrder] = useState(false);

    const subTotal = () => {
        let sum = 0;
        cart.forEach((item) => {
            const qte = item.qte;
            const price = item.product?.price;
            sum += qte * price;
        });
        return sum;
    };

    const couponAmount = () => {
        if (!coupon) return;

        let reduction;
        if (coupon.type === "percentage") {
            reduction = (subTotal() * coupon.value) / 100;
        } else {
            reduction = subTotal() - coupon.value;
        }

        return reduction > coupon?.max_amount ? coupon.max_amount : reduction;
    };

    const totalCart = () => {
        let sum = 0;
        cart.forEach((item) => {
            const qte = item.qte;
            const price = item.product?.price;
            sum += qte * price;
        });

        return couponAmount() ? sum - couponAmount() : sum;
    };

    return (
        <AppLayout>
            <Head title="panier" />

            <Container className="py-0 flex flex-col gap-4">
                {cart.length === 0 ? (
                    <div>
                        <h1 className="text-4xl font-medium text-gray-700 mb-4">
                            Votre panier est vide
                        </h1>

                        <img
                            className="maxx-w-lg mx-auto"
                            src={"/assets/images/error/404.png"}
                        />
                    </div>
                ) : (
                    <>
                        <div>
                            <h1 className="text-4xl font-medium text-gray-700 mb-4">
                                Mon panier
                            </h1>

                            <div className="flex flex-col lg:flex-row justify-between items-start gap-4">
                                <div className="divide-y border shadow-lg w-full">
                                    {cart.map((item, index) => (
                                        <CartItem key={index} item={item} />
                                    ))}
                                </div>

                                <div className="relative sm:place-self-end w-full sm:max-w-md border border-gray-200 shadow-lg rounded px-4 py-6 sm:px-6">
                                    <div className="mb-4">
                                        <Coupon coupon={coupon} />
                                    </div>

                                    <div className="space-y-2">
                                        <CartSummary
                                            coupon={coupon}
                                            couponAmount={couponAmount}
                                            subTotal={subTotal}
                                            totalCart={totalCart}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Transition
                            appear={true}
                            show
                            enter="transition-opacity duration-150"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity duration-150"
                            leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                                className="pt-5"
                        >
                            <CreateOrder />
                        </Transition>
                    </>
                )}
            </Container>
        </AppLayout>
    );
};

export default Index;
