import { AdminLayoutContext } from "@/Layouts/AdminLayout";

import React, { useContext } from "react";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "../../ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import Avatar from "../../Avatar";

export default function NavBar() {
    const { user } = useContext(AdminLayoutContext);

    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start rtl:justify-end">
                        <Link
                            href={route("admin.dashboard")}
                            className="flex ms-2 md:me-24"
                        >
                            <ApplicationLogo
                                type="dark"
                                className="h-8 w-auto me-3"
                            />
                        </Link>
                    </div>

                    <div className="flex items-center">
                        <div className="ms-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <button
                                        type="button"
                                        className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                        aria-expanded="false"
                                    >
                                        <Avatar user={user} />
                                    </button>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <div className="px-4 py-3" role="none">
                                        <p
                                            className="text-sm text-gray-900 dark:text-white capitalize"
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
                                            // href={route("welcome")}
                                            >
                                                Site web
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
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
