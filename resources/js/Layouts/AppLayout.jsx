import React, { createContext, useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import NavBar from "@/Components/Section/Client/Navigation/NavBar";
import DynamicNavBar from "@/Components/Section/Client/Navigation/DynamicNavBar";
import Footer from "@/Components/Footer";
import { MdClose } from "react-icons/md";
import { Transition } from "@headlessui/react";
import { capitalize } from "@/Logic/helper";

export const AppLayoutContext = createContext();

const AppLayout = ({ children }) => {
    const { user, categories, cart, coupon, flash } = usePage().props;

    const [isShown, setIsShown] = useState(false);
    useEffect(() => {
        if (flash.alert && flash.alert?.show != false) {
            setIsShown(true);
            setTimeout(() => {
                setIsShown(false);
            }, 5000);
        }
    }, [flash.alert]);

    return (
        <AppLayoutContext.Provider value={{ user, categories, cart }}>
            <NavBar />

            <DynamicNavBar />

            <main className="my-5">{children}</main>

            <Footer />

            <div className="fixed top-[4.125rem] right-0 px-4 z-50 w-full sm:max-w-sm sm:min-w-[22rem] ">
                <Transition
                    show={isShown}
                    enter="transition-opacity transition-transform duration-200 ease-out"
                    enterFrom="opacity-0 translate-x-full"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition-opacity duration-150 ease-in"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    {flash.alert && (
                        <Alert alert={flash.alert} setIsShown={setIsShown} />
                    )}
                </Transition>
            </div>
        </AppLayoutContext.Provider>
    );
};

export default AppLayout;

const Alert = ({ alert, setIsShown }) => {
    const { status, title, message, link } = alert;

    const styles = {
        success: `border-green-500`,
        danger: `border-danger-500`,
        warning: `border-yellow-500`,
        info: `border-info-500`,
    };

    return (
        <>
            <div
                className={`relative bg-white text-gray-600 ${styles[status]} border-l-4 p-4 pe-6 shadow-2xl rounded-tr-lg rounded-br-lg`}
            >
                <p className="text-md font-medium">{capitalize(message)}</p>

                <button
                    className="absolute top-2 right-2 text-gray-400 hover:text-gray-500"
                    onClick={() => setIsShown(false)}
                >
                    <MdClose className="w-6 h-6" />
                </button>
            </div>
        </>
    );
};
