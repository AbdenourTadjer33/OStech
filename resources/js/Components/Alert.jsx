import React from "react";
import { useState } from "react";

const Alert = ({ type, className = "", content = "", ...props }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const iconStyles = "flex-shrink-0 inline w-4 h-4 me-3";
    const baseStyles = `flex items-center p-4 text-base font-medium rounded-lg ${className} transition-all duration-100 hover:shadow-lg hover:skew-y-1`;

    const alertStyles = {
        success: `bg-green-50 text-green-800 dark:bg-gray-800 dark:text-green-400 ${baseStyles}`,
        danger: `bg-red-50 text-red-800 dark:bg-gray-800 dark:text-red-400 ${baseStyles}`,
        info: `bg-blue-50 text-blue-800 dark:bg-gray-800 dark:text-blue-400 ${baseStyles}`,
        warning: `bg-yellow-50 text-yellow-800 dark:bg-gray-800 dark:text-yellow-300 ${baseStyles}`,
    };

    const contentSplited = content.split(" ");
    const minContent = content.split(" ", 14);
    const contentLen = contentSplited.length;

    return (
        <div className={alertStyles[type]} role="alert" {...props}>
            <svg
                className={iconStyles}
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
            >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <div>
                {contentLen > 15 && !isExpanded
                    ? minContent.join(" ")
                    : content}

                {contentLen > 15 && (
                    <a
                        className="underline text-blue-700 cursor-pointer select-none ms-1"
                        onClick={(e) => setIsExpanded(!isExpanded)}
                    >
                        {isExpanded ? "show less" : "show more"}
                    </a>
                )}
            </div>
        </div>
    );
};

export default Alert;