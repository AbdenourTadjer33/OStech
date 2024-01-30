import React from "react";

const SmallButton = ({ children, className, ...props }) => {
    return (
        <button
            className={`bg-blue-100 text-blue-800 hover:bg-blue-200 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300 hover:dark:bg-indigo-900 ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};

export default SmallButton;
