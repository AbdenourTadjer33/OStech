import React, { useContext } from "react";
import { Link } from "@inertiajs/react";
import { AppLayoutContext } from "@/Layouts/AppLayout";
import { capitalize } from "@/Logic/helper";

import { Transition } from "@headlessui/react";

import ApplicationLogo from "@/Components/ApplicationLogo";
import Button from "@/Components/Button";
import Cart from "../Cart/Cart";
import { MdOutlineMenuOpen } from "react-icons/md";
import { useState } from "react";
import Avatar from "@/Components/Avatar";
import Dropdown from "@/Components/Dropdown";

const NavBar = () => {
    const { user } = useContext(AppLayoutContext);
    const [isOpen, setIsOpen] = useState(false);

    const navData = [
        {
            label: "Accueil",
            link: "welcome",
        },
        {
            label: "Products",
            link: "products.index",
        },
        {
            label: "Catalogue",
            link: "catalogue",
        },
        {
            label: "Contact",
            link: "contact",
        },
    ];

    const toggleNavBar = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <nav className="fixed top-0 w-full border-b bg-white z-50">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <Link
                        href={route("welcome")}
                        className="flex items-center space-x-3"
                    >
                        <ApplicationLogo
                            type="indigo"
                            className="h-12 sm:h-14"
                        />
                    </Link>
                    <div className="space-x-4 font-medium text-primary-950 hidden md:block">
                        {navData.map(({ label, link }, idx) => (
                            <Link
                                key={idx}
                                href={route(link)}
                                className={`transition duration-200 hover:text-info-400 capitalize ${
                                    route().current(`${link}*`) &&
                                    "text-info-400"
                                }`}
                            >
                                {capitalize(label)}
                            </Link>
                        ))}
                    </div>

                    <div className="flex items-center space-x-4 sm:space-x-6">
                        <a
                            href="tel:5541251234"
                            className="text-sm  text-gray-500 hover:underline hidden sm:inline-block"
                        >
                            (+213) 780 11 55 27
                        </a>

                        {user ? (
                            <>
                                <Dropdown>
                                    <Dropdown.Trigger>
                                        <button
                                            type="button"
                                            className="flex text-sm rounded-full focus:ring-4 focus:ring-info-300"
                                        >
                                            <Avatar user={user} />
                                        </button>
                                    </Dropdown.Trigger>
                                    <Dropdown.Content>
                                        <div className="px-4 py-3" role="none">
                                            <p
                                                className="text-sm text-gray-900 capitalize"
                                                role="none"
                                            >
                                                {user.name}
                                            </p>
                                            <p
                                                className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                                                role="none"
                                            >
                                                {user.email}
                                            </p>
                                        </div>
                                        <ul>
                                            <li>
                                                <Dropdown.Link
                                                    href={route("profile.edit")}
                                                >
                                                    Profile
                                                </Dropdown.Link>
                                            </li>
                                            <li>
                                                <Dropdown.Link
                                                    href={route("logout")}
                                                    method="post"
                                                    as="button"
                                                >
                                                    Log Out
                                                </Dropdown.Link>
                                            </li>
                                        </ul>
                                    </Dropdown.Content>
                                </Dropdown>
                            </>
                        ) : (
                            <Link
                                className="text-base text-blue-600 hover:underline hidden sm:block"
                                href={route("login")}
                            >
                                <Button btn="info">Connexion</Button>
                            </Link>
                        )}

                        <Cart />

                        <div
                            onClick={toggleNavBar}
                            className="text-primary-950 hover:text-info-400 cursor-pointer transition duration-150 block md:hidden"
                        >
                            <MdOutlineMenuOpen className="w-7 h-7" />
                        </div>
                    </div>
                </div>
            </nav>

            <Transition
                show={isOpen}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                className="fixed inset-0 overflow-hidden z-[51]"
            >
                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div
                            className="absolute inset-0 bg-black bg-opacity-50 transition-opacity"
                            onClick={() => setIsOpen(false)}
                        ></div>

                        <section className="absolute inset-y-0 right-0  max-w-full flex  outline-none">
                            <Transition.Child
                                enter="transform transition ease-in-out duration-300 sm:duration-500"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-300 sm:duration-500"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <div className="w-screen max-w-md h-full">
                                    <div className="h-full py-6 px-4 bg-white shadow-xl">
                                        <button
                                            className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <span className="sr-only">
                                                Close sidebar
                                            </span>
                                            <svg
                                                className="h-6 w-6"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                aria-hidden="true"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                        </button>

                                        <nav className="space-y-6 flex flex-col mt-10">
                                            {navData.map(
                                                ({ label, link }, idx) => (
                                                    <Link
                                                        key={idx}
                                                        href={route(link)}
                                                        className={`transition duration-200 hover:text-info-400 capitalize ${
                                                            route().current(
                                                                link
                                                            ) && "text-info-400"
                                                        }`}
                                                    >
                                                        {capitalize(label)}
                                                    </Link>
                                                )
                                            )}
                                        </nav>
                                    </div>
                                </div>
                            </Transition.Child>
                        </section>
                    </div>
                </div>
            </Transition>
        </>
    );
};

export default NavBar;
