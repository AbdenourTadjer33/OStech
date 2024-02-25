import React from "react";

export const StatusCercle = ({
	className = "",
	status,
	trueClasses = "bg-green-700",
	falseClasses = "bg-red-700",
}) => {
	return (
		<span
			className={`p-2 ${
				status ? trueClasses : falseClasses
			} rounded-full inline-flex border ${className}`}
		></span>
	);
};
