import React from "react";

export const Search = ({label, className="", ...props}) => {
	return (
		<input
			type="text"
			className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 ${className}`}
			placeholder={label ? label : "Search"}
			{...props}
		/>
	);
};
