import React, { forwardRef } from "react";

const Button = ({
	btn = "primary",
	className = "",
	children,
	disabled,
	...props
}) => {
	const basedStyle = `inline-flex items-center text-white focus:ring-2 focus:ring-info-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none dark:focus:ring-info-800 disabled:opacity-25 transition ease-in-out duration-150 ${
		disabled && "opacity-25"
	} `;

	const btnsStyles = {
		primary: `bg-primary-700 hover:bg-primary-800 dark:bg-primary-600 dark:hover:bg-primary-700 ${basedStyle} `,
		secondary: `bg-secondary-700 hover:bg-secondary-800 dark:bg-secondary-600 dark:hover:bg-secondary-800 ${basedStyle} `,
		danger: `bg-danger-700 hover:bg-danger-800 dark:bg-danger-600 dark:hover:bg-danger-700 ${basedStyle} `,
		info: `bg-info-700 hover:bg-info-800 dark:bg-info-600 dark:hover:bg-info-700 ${basedStyle} `,
		success: `bg-green-700 hover:bg-green-800 dark:bg-green-600 dark:hover:bg-green-700 ${basedStyle} `,
		warning: `bg-yellow-700 hover:bg-yellow-800 dark:bg-yellow-500 dark:hover:bg-yellow-700 ${basedStyle} `,
	};
	return (
		<button
			className={`${btnsStyles[btn]} ${className}`}
			disabled={disabled}
			{...props}
		>
			{children}
		</button>
	);
};
export default Button;

export const IndigoButton = ({ className = "", children, ...props }) => (
	<button
		{...props}
		className={`text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${className}`}
	>
		{children}
	</button>
);

export const BlueButton = ({ className = "", children, ...props }) => (
	<button
		{...props}
		className={`w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ${className}`}
	>
		{children}
	</button>
);