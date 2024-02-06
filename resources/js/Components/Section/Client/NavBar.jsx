import React from "react";
import { Head, Link } from "@inertiajs/react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Button from "@/Components/Button";

const NavBar = () => {
    return (
        <>
            <nav className="bg-white border-gray-200">
                <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl p-4">
                    <Link
                        href={route("welcome")}
                        className="flex items-center space-x-3 rtl:space-x-reverse"
                    >
                        <ApplicationLogo />
                    </Link>
                    <div className="flex items-center space-x-6 rtl:space-x-reverse">
                        <a
                            href="tel:5541251234"
                            className="text-sm  text-gray-500 hover:underline"
                        >
                            (+213) 780 11 55 27
                        </a>
                        <Link
                            className="text-base text-blue-600 hover:underline"
                            href={route("login")}
                        >
                            <Button>Connexion</Button>
                        </Link>
                    </div>
                </div>
            </nav>
            {/* <nav className="bg-gray-50 dark:bg-gray-700">
                <div className="max-w-screen-xl px-4 py-3 mx-auto">
                    <div className="flex items-center">
                        <ul className="flex flex-row font-medium mt-0 space-x-8 rtl:space-x-reverse text-sm">
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-900 dark:text-white hover:underline"
                                    aria-current="page"
                                >
                                    Home
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-900 dark:text-white hover:underline"
                                >
                                    Company
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-900 dark:text-white hover:underline"
                                >
                                    Team
                                </a>
                            </li>
                            <li>
                                <a
                                    href="#"
                                    className="text-gray-900 dark:text-white hover:underline"
                                >
                                    Features
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav> */}
        </>
    );
};

export default NavBar;
