import React, {forwardRef} from "react";

const Button = ({ btn = "primary", className="", children, disabled, ...props }) => {
    
    const basedStyle = `inline-flex items-center text-white focus:ring-2 focus:ring-info-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none dark:focus:ring-info-800 disabled:opacity-25 transition ease-in-out duration-150 ${disabled && "opacity-25"} ${className}`;

    const btnsStyles = {
        primary: `bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 ${basedStyle}`,
        secondary: `bg-secondary-700 hover:bg-secondary-800 dark:bg-secondary-600 dark:hover:bg-secondary-700 ${basedStyle}`,
        danger: `bg-danger-700 hover:bg-danger-800 dark:bg-danger-600 dark:hover:bg-danger-700 ${basedStyle}`,
        info: `bg-info-700 hover:bg-info-800 dark:bg-info-600 dark:hover:bg-info-700 ${basedStyle}`,
        success: `bg-success-700 hover:bg-success-800 dark:bg-success-600 dark:hover:bg-success-700 ${basedStyle}`,
        warning: `bg-warning-700 hover:bg-warning-800 dark:bg-warning-600 dark:hover:bg-warning-700 ${basedStyle}`,
    };
    return (
        <button className={btnsStyles[btn]} disabled={disabled} {...props}>
            {children}
        </button>
    );
}
export default Button;
