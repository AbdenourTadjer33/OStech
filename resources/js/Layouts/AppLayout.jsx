import React, { createContext, useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import NavBar from "@/Components/Section/Client/Navigation/NavBar";
import DynamicNavBar from "@/Components/Section/Client/Navigation/DynamicNavBar";
import Footer from "@/Components/Footer";
import { MdClose } from "react-icons/md";
import { Transition } from "@headlessui/react";

export const AppLayoutContext = createContext();

const AppLayout = ({ children }) => {
    const { user, categories, cart, flash } = usePage().props;
    const [isShown, setIsShown] = useState(false);
    useEffect(() => {
        if (flash.alert) {
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

            <main className="my-10">{children}</main>

            {/* <Footer/> */}

            <div className="fixed top-20 right-5 z-[90] max-w-xl min-w-[25rem]">
                <Transition
                    show={isShown}
                    // enter="transition-transform duration-250 ease-out"
                    // enterFrom="translate-x-full"
                    // enterTo="translate-x-0"
                    // leave="transition-transform duration-150 ease-in"
                    // leaveFrom="translate-x-0"
                    // leaveTo="translate-x-full"
                    enter="transition-opacity transition-transform duration-200 ease-out"
                    enterFrom="opacity-0 translate-x-full"
                    enterTo="opacity-100 translate-x-0"
                    leave="transition-opacity transition-transform duration-200 ease-in"
                    leaveFrom="opacity-100 translate-x-0"
                    leaveTo="opacity-0 translate-x-full"
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
    console.log(alert);
    const { status, title, message, link } = alert;

    const styles = {
        success: `border-green-500 text-green-400`,
        danger: `border-danger-500 text-danger-400`,
        warning: `border-yellow-500 text-yellow-400`,
        info: `border-info-500 text-info-400`,
    };

    return (
        <>
            <div
                className={`relative bg-white ${styles[status]} border-l-4  p-4 shadow-2xl rounded-tr-lg rounded-br-lg`}
            >
                <p className="font-bold">{title || "Alert"}</p>
                <p>{message}</p>
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
