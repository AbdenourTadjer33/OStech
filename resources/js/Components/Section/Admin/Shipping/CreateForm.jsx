import React, { createContext, useEffect, useState } from "react";
import { useForm } from "laravel-precognition-react-inertia";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import Toggle from "@/Components/Toggle";
import Table from "@/Components/Table";
import Minus from "@/Components/Icons/Minus";
import Plus from "@/Components/Icons/Plus";
import Button from "@/Components/Button";
import Spinner from "@/Components/Icons/Spinner";

const CreateShippingFormContext = createContext();

const CreateForm = ({ wilayas }) => {
    const {
        data,
        setData,
        post,
        processing,
        errors,
        validate,
        forgetError,
        reset,
    } = useForm("post", route("admin.shippings.store"), {
        name: "",
        pricings: [],
        status: true,
    });

    const [searchQuery, setSearchQuery] = useState("");
    const [filteredPricings, setFilteredPricings] = useState([]);

    useEffect(() => {
        const pricings = [];
        wilayas.forEach((wilaya) => {
            pricings.push({
                code: wilaya.code,
                name: wilaya.name,
                delay: "",
                cost_home: "",
                cost_stop_desk: "",
            });
        });
        setData("pricings", pricings);
        setFilteredPricings(pricings);
    }, []);

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);

        const filtered = data.pricings.filter(
            (pricing) =>
                pricing.name.toLowerCase().includes(query) ||
                pricing.code.toLowerCase().includes(query)
        );

        setFilteredPricings(filtered);
    };

    const handleInputChange = (e, code) => {
        const { name, value } = e.target;

        setData((prevData) => {
            let updatedPricings;

            updatedPricings = prevData.pricings.map((pricing) => {
                if (pricing.code === code) {
                    return { ...pricing, [name]: value };
                }
                return pricing;
            });

            return { ...prevData, pricings: updatedPricings };
        });
    };

    const handleCounter = (code, increment) => {
        setData((prevData) => {
            let updatedPricings;

            updatedPricings = prevData.pricings.map((pricing) => {
                if (pricing.code === code) {
                    // Parse the current value to ensure it's a number
                    let currentValue = parseInt(pricing.delay, 10) || 0;

                    // Increment or decrement based on the button clicked
                    let newValue = increment
                        ? currentValue + 1
                        : currentValue - 1;

                    // Ensure the value is at least 1
                    newValue = Math.max(newValue, 1);

                    return { ...pricing, delay: newValue.toString() };
                }
                return pricing;
            });

            return { ...prevData, pricings: updatedPricings };
        });
    };

    const handleBeforeInput = (e) => {
        // Check if the pressed key is a number (0-9)
        const isNumberKey = e.data >= "0" && e.data <= "9";

        // // If it's not a number, prevent the default behavior and show an alert
        if (!isNumberKey) {
            e.preventDefault();
        }
    };

    const getPricingValue = (name, code) => {
        const pricing = data.pricings.find((pricing) => pricing.code === code);
        return pricing ? pricing[name] : "";
    };

    const submitHandler = (e) => {
        e.preventDefault();
        post(route("admin.shippings.store"), {
            onSuccess: () => reset(),
        });
    };

    return (
        <CreateShippingFormContext.Provider value={{ data, setData }}>
            <div className="flex items-center justify-between mb-8">
                <h1 className="text-2xl sm:text-4xl font-bold">
                    Créer une company de livraison
                </h1>
            </div>

            <form onSubmit={submitHandler} encType="multipart/form-data">
                <div className="grid gap-4 mb-5 md:grid-cols-3">
                    <div className="sm:col-span-3">
                        <InputLabel className="mb-2" required htmlFor="name">
                            Nom
                        </InputLabel>

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            onBlur={(e) => validate("name")}
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>
                </div>

                <label htmlFor="status" className="block mb-5">
                    <div className="inline-flex items-center justify-between gap-4 w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                        <div className="block">
                            <h4 className="text-2xl font-semibold">Status</h4>
                            <p className="text-base">
                                S'il le status est activé
                            </p>
                        </div>
                        <Toggle
                            id="status"
                            name="status"
                            defaultChecked={data.status}
                            onChange={(e) => {
                                setData("status", e.target.checked);
                                forgetError("status");
                            }}
                        />
                    </div>
                </label>

                <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden mb-5">
                    <div className="flex flex-col md:flex-row items-center justify-between space-y-3 md:space-y-0 md:space-x-4 p-4">
                        <div className="w-full md:w-1/2">
                            <div className="relative w-full">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        aria-hidden="true"
                                        className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                    placeholder="Search"
                                    value={searchQuery}
                                    onChange={handleSearch}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="relative overflow-auto h-96">
                        <Table className="table-auto">
                            <Table.Head className="sticky right-0 left-0 top-0 z-50 shadow-sm">
                                <Table.Row>
                                    <Table.Title className="px-6 py-3">
                                        Wilaya
                                    </Table.Title>
                                    <Table.Title className="px-2 py-3">
                                        Délai
                                    </Table.Title>
                                    <Table.Title className="px-2 py-3">
                                        Tarif à domicile
                                    </Table.Title>
                                    <Table.Title className="px-2 py-3">
                                        Tarif stop desk
                                    </Table.Title>
                                </Table.Row>
                            </Table.Head>
                            <Table.Body>
                                {filteredPricings.map((pricing) => {
                                    return (
                                        <Table.Row
                                            key={pricing.code}
                                            className={`bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600`}
                                        >
                                            <Table.Title className="px-6 py-3">
                                                {pricing.code}
                                                {" - "}
                                                {pricing.name}
                                            </Table.Title>
                                            <Table.Column className="px-2 py-3">
                                                <div className="flex items-center">
                                                    <button
                                                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                        type="button"
                                                        onClick={(e) =>
                                                            handleCounter(
                                                                pricing.code,
                                                                false
                                                            )
                                                        }
                                                    >
                                                        <Minus className="w-4 h-4" />
                                                    </button>
                                                    <div>
                                                        <input
                                                            onBeforeInput={(
                                                                e
                                                            ) =>
                                                                handleBeforeInput(
                                                                    e
                                                                )
                                                            }
                                                            type="text"
                                                            name="delay"
                                                            value={getPricingValue(
                                                                "delay",
                                                                pricing.code
                                                            )}
                                                            onChange={(e) =>
                                                                handleInputChange(
                                                                    e,
                                                                    pricing.code
                                                                )
                                                            }
                                                            className="bg-gray-50 text-center w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                                        />
                                                    </div>
                                                    <button
                                                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                                                        type="button"
                                                        onClick={(e) =>
                                                            handleCounter(
                                                                pricing.code,
                                                                true
                                                            )
                                                        }
                                                    >
                                                        <Plus className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </Table.Column>
                                            <Table.Column className="px-2 py-3">
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
                                                        <span className="text-gray-500 dark:text-gray-200">
                                                            DA
                                                        </span>
                                                    </div>
                                                    <TextInput
                                                        className="min-w-32"
                                                        name="cost_home"
                                                        value={getPricingValue(
                                                            "cost_home",
                                                            pricing.code
                                                        )}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                e,
                                                                pricing.code
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </Table.Column>
                                            <Table.Column className="px-2 py-3">
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 end-0 flex items-center pe-3.5 pointer-events-none">
                                                        <span className="text-gray-500 dark:text-gray-200">
                                                            DA
                                                        </span>
                                                    </div>
                                                    <TextInput
                                                        className="min-w-32"
                                                        name="cost_stop_desk"
                                                        value={getPricingValue(
                                                            "cost_stop_desk",
                                                            pricing.code
                                                        )}
                                                        onChange={(e) =>
                                                            handleInputChange(
                                                                e,
                                                                pricing.code
                                                            )
                                                        }
                                                    />
                                                </div>
                                            </Table.Column>
                                        </Table.Row>
                                    );
                                })}
                            </Table.Body>
                        </Table>
                        {data.pricings.length === 0 && (
                            <div className="animate-pulse p-4">
                                <div className="h-10 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-10 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-10 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-10 bg-gray-200 rounded-lg dark:bg-gray-700 mb-2.5"></div>
                                <div className="h-10 bg-gray-200 rounded-lg dark:bg-gray-700"></div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-center gap-4">
                    <Button disabled={processing}>
                        {processing && <Spinner />}
                        Ajouté
                    </Button>
                </div>
            </form>
        </CreateShippingFormContext.Provider>
    );
};

export default CreateForm;
