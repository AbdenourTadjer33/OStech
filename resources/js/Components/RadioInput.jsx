import React from "react";

const RadioInput = ({ className, ...props }) => {
    return (
        <input
        {...props}
            type="radio"
            className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 ${className}`}
        />
    );
};

export default RadioInput;
