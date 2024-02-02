import React, { forwardRef, useRef } from "react";

const InputFile = forwardRef(({ className, ...props }, ref) => {
    return (
        <input
            className={`block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${className}`}
            type="file"
            {...props}
            ref={ref}
        />
    );
});

export default InputFile;