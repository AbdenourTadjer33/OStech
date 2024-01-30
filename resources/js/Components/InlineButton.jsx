import React from "react";

const InlineButton = ({ children, className, type="button", ...props }) => {
    return (
        <button
            {...props}
            type={type}
            className={`text-gray-900 dark:text-white hover:underline ${className}`}
        >
            {children}
        </button>
    );
};

export default InlineButton;
