import React, { useState, createContext } from "react";
import { usePage, useForm } from "@inertiajs/react";
import Stepper from "@/Components/Stepper";
import CustomerDetails from "./CustomerDetails";
import PaymentMethod from "./PaymentMethod";
import ShippingOption from "./ShippingOption";
import ConfirmOrder from "./ConfirmOrder";
import Button from "@/Components/Button";
import { capitalize } from "@/Logic/helper";
import { Transition } from "@headlessui/react";

export const CreateOrderContext = createContext();

const CreateOrder = () => {
    const { user } = usePage().props;
    const [currentStep, setCurrentStep] = useState(0);
    const { post, data, setData, processing, errors } = useForm({
        name: user?.name || "",
        phone: user?.phone || "",
        email: user?.email || "",
        address: user?.data?.address || "",
        city: user?.data?.city || "",
        wilaya: user?.data?.wilaya || "",
        paymentMethod: "cash on delivery",
        shippingCompany: "",
        shippingType: "",
    });

    const formSteps = [
        {
            title: "information génerale",
            description: "adresse de livraison et facturation",
            component: <CustomerDetails />,
            validationRoute: "order.validate.customer",
        },
        {
            title: "mode de paiement",
            description: "méthode de paiement",
            component: <PaymentMethod />,
            validationRoute: "order.validate.paymentMethod",
        },
        {
            title: "mode de livraison",
            description: "méthode d'expédition",
            component: <ShippingOption />,
            validationRoute: "order.validate.shippingMethod",
        },
        {
            title: "confirmation",
            component: <ConfirmOrder />,
        },
    ];

    const handleNext = () => {
        const { validationRoute } = formSteps[currentStep];
        post(route(validationRoute), {
            preserveScroll: true,
            preserveState: true,
            onSuccess: () => setCurrentStep(currentStep + 1),
        });
    };

    const handlePrevious = () => {
        setCurrentStep(currentStep - 1);
    };

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("order.store"), {
            preserveScroll: true
        });
    };

    return (
        <CreateOrderContext.Provider value={{  data, setData, errors }}>
            <div className="shadow-lg rounded-xl py-6 px-4 space-y-6 bg-gray-100">
                <Stepper
                    steps={formSteps.map((step) => {
                        return {
                            title: step.title,
                            description: step?.description,
                        };
                    })}
                    currentStep={currentStep}
                />

                <form>
                    {formSteps.map((step, idx) => (
                        <div
                            key={idx}
                            className={`transition-opacity duration-300 ${
                                currentStep === idx
                                    ? "opacity-100"
                                    : "opacity-0 sr-only"
                            }`}
                        >
                            {step.component}
                        </div>
                    ))}
                </form>

                <div className="flex items-center gap-4">
                    {/* {currentStep === 0 && (
                        <button
                            onClick={() => setOrder(false)}
                            className="w-full flex items-center justify-center rounded-md border border-transparent bg-red-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-red-700"
                        >
                            {capitalize("annuler")}
                        </button>
                    )} */}

                    {currentStep > 0 && (
                        <button
                            onClick={handlePrevious}
                            className="w-full flex items-center justify-center rounded-md border border-transparent bg-gray-700 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-gray-800"
                        >
                            {capitalize("Retour")}
                        </button>
                    )}

                    {currentStep !== formSteps.length - 1 && (
                        <button
                            onClick={handleNext}
                            className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                            {capitalize("suivant")}
                        </button>
                    )}

                    {currentStep === formSteps.length - 1 && (
                        <button
                            onClick={submitHandler}
                            className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700">
                            {capitalize("Commander")}
                        </button>
                    )}
                </div>
            </div>
        </CreateOrderContext.Provider>
    );
};

export default CreateOrder;
