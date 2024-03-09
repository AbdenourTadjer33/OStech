import React from "react";

const Heading = ({ level = 1, children, className="", ...props }) => {
	const baseClasses = {
		1: "text-5xl font-extrabold dark:text-white",
		2: "text-4xl font-bold dark:text-white",
		3: "text-3xl font-medium dark:text-white",
		4: "text-2xl font-medium dark:text-white",
		5: "text-xl dark:text-white",
		6: "text-lg dark:text-white",
	};

	const baseClass = baseClasses[level] || baseClasses[1];

	return React.createElement(
		`h${level}`,
		{ className: `${baseClass} ${className}`, ...props },
		children
	);
};

export default Heading;
