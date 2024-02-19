import React, { useContext } from "react";
import { CreateOrderContext } from "./CreateOrder";
import { RadioGroup } from "@headlessui/react";
import { capitalize } from "@/Logic/helper";
import axios from "axios";

const ShippingOption = () => {
    const { data, setData } = useContext(CreateOrderContext);

    const shippingType = [
        {
            name: "cost_home",
            label: "tarif à domicile",
        },
        {
            name: "cost_stop_desk",
            label: "tarif stop-desk",
        },
    ];

    const getShippingPricing = async () => {
        try {
            const response = await axios.get(route("api."));
        } catch (e) {
            console.error("Error fetching shipping pricings", e);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto py-6">
            <RadioGroup
                value={data.shippingType}
                onChange={(e) => setData("shippingType", e)}
            >
                <RadioGroup.Label className="sr-only">
                    Shipping type
                </RadioGroup.Label>
                <div className="space-y-2">
                    {shippingType.map((type, idx) => (
                        <RadioGroup.Option
                            key={idx}
                            value={type.name}
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
                                                    {capitalize(type.label)}
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
                                                        {type?.description}
                                                    </span>
                                                </RadioGroup.Description>
                                            </div>
                                        </div>
                                        <input
                                            type="radio"
                                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
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

export default ShippingOption;
