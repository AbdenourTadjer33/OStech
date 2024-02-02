import React from "react";

const InlineButton = ({ btn="primary", children, className, type = "button", ...props }) => {

    const btnsStyles = {
        primary: `text-primary-700 hover:text-primary-800 dark:text-primary-600 dark:hover:text-primary-700`,
        secondary: `text-secondary-700 hover:text-secondary-800 dark:text-secondary-600 dark:hover:text-secondary-700`,
        danger: `text-danger-700 hover:text-danger-800 dark:text-danger-600 dark:hover:text-danger-700`,
        info: `text-info-700 hover:text-info-800 dark:text-info-600 dark:hover:text-info-700`,
        success: `text-success-700 hover:text-success-800 dark:text-success-600 dark:hover:text-success-700`,
        warning: `text-warning-700 hover:text-warning-800 dark:text-warning-600 dark:hover:text-warning-700`,
    };

    return (
        <button
            {...props}
            type={type}
            className={`hover:underline ${btnsStyles[btn]} ${className}`}
        >
            {children}
        </button>
    );
};

export default InlineButton;
