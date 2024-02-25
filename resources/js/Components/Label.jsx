import React from "react";

const Label = ({ children, className = "", required = false, ...props }) => {
	return (
		<label {...props} className={`block text-base font-medium text-gray-500 ${className}`}>
			{children}
            {required && <span className="text-red-500 ms-1">*</span>}
		</label>
	);
};

export default Label;
