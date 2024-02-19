import React, { useContext } from "react";
import { CreateOrderContext } from "./CreateOrder";
import { RadioGroup } from "@headlessui/react";
import { capitalize } from "@/Logic/helper";

const PaymentMethod = () => {
    const { data, setData } = useContext(CreateOrderContext);

    const paymentMehods = [
        {
            name: "cash-on-delivery",
            label: "paiement à la livraison",
        },
        {
            name: "bank-transfer",
            label: "virement bancaire",
        },
    ];

    return (
        <div className="w-full max-w-md mx-auto py-6">
            <RadioGroup
                value={data.paymentMethod}
                onChange={(e) => setData("paymentMethod", e)}
            >
                <RadioGroup.Label className="sr-only">
                    Méthod de payement
                </RadioGroup.Label>
                <div className="space-y-2">
                    {paymentMehods.map((method, idx) => (
                        <RadioGroup.Option
                            key={idx}
                            value={method.name}
                            className={({
                                checked,
                                active,
                            }) => `border relative flex cursor-pointer rounded-lg px-5 py-4 focus:outline-none bg-gray-50
                        ${active ? " ring-2 ring-info-400 " : ""}
                            ${checked ? "border-info-500" : "border-gray-300"}`}
                        >
                            {({ checked }) => (
                                <>
                                    <div className="flex w-full items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="text-sm">
                                                <RadioGroup.Label
                                                    as="p"
                                                    className={`font-medium

                                                    `}
                                                >
                                                    {capitalize(method.label)}
                                                </RadioGroup.Label>
                                                <RadioGroup.Description
                                                    as="span"
                                                    className={`inline ${
                                                        checked
                                                            ? "text-info-100"
                                                            : "text-gray-500"
                                                    }`}
                                                >
                                                    <span>
                                                        {method?.description}
                                                    </span>
                                                </RadioGroup.Description>
                                            </div>
                                        </div>
                                        <input
                                            type="radio"
                                            className="w-4 h-4 text-info-600 bg-gray-100 border-gray-300 focus:ring-info-500 dark:focus:ring-info-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                            checked={checked}
                                            onChange={(e) =>
                                                (e.target.checked = checked)
                                            }
                                        />
                                    </div>
                                </>
                            )}
                        </RadioGroup.Option>
                    ))}
                </div>
            </RadioGroup>
        </div>
    );
};

export default PaymentMethod;
