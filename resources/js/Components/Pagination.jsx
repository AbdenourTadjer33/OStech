import React from "react";
import { Link } from "@inertiajs/react";

const Pagination = ({
    currentPage,
    next,
    prev,
    links,
    last_page,
    total,
    perPage,
    className,
}) => {
    return (
        <>
            <div className="max-w-full overflow-x-auto">
                <nav className={`${className}`}>
                    <ul className="inline-flex -space-x-px text-sm">
                        {links.map((link) => {
                            return (
                                <span key={crypto.randomUUID()}>
                                    {link.label == "&laquo; Previous" &&
                                        (prev ? (
                                            <Link
                                                href={prev}
                                                className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            >
                                                Previous
                                            </Link>
                                        ) : (
                                            <span className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-default">
                                                Previous
                                            </span>
                                        ))}

                                    {link.url &&
                                        Number.isInteger(
                                            parseInt(link.label)
                                        ) && (
                                            <li>
                                                {currentPage == link.label ? (
                                                    <span className="flex items-center justify-center px-3 h-8 dark:bg-gray-300 dark:text-primary-800 text-white bg-primary-600 cursor-default">
                                                        {link.label}
                                                    </span>
                                                ) : (
                                                    <Link
                                                        href={
                                                            currentPage !=
                                                                link.label &&
                                                            link.url
                                                        }
                                                        className={`flex items-center justify-center px-3 h-8 leading-tight text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white border border-gray-300 `}
                                                    >
                                                        {link.label}
                                                    </Link>
                                                )}
                                            </li>
                                        )}

                                    {link.label == "..." && (
                                        <span className="flex items-center justify-center px-3 h-8 text-xl leading-tight text-gray-500700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 border border-gray-300 cursor-default">
                                            ...
                                        </span>
                                    )}

                                    {link.label == "Next &raquo;" &&
                                        (next ? (
                                            <Link
                                                href={next}
                                                className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                                            >
                                                Next
                                            </Link>
                                        ) : (
                                            <span className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 cursor-default">
                                                Next
                                            </span>
                                        ))}
                                </span>
                            );
                        })}
                    </ul>
                </nav>
            </div>
            <span className="text-sm text-gray-700 dark:text-gray-400">
                Affichage de{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                    1
                </span>{" "}
                à{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                    {perPage}
                </span>{" "}
                sur{" "}
                <span className="font-semibold text-gray-900 dark:text-white">
                    {total}
                </span>{" "}
                résultats
            </span>
        </>
    );
};

export default Pagination;
