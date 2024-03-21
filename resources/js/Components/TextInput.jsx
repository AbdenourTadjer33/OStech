import { Popover, Transition } from "@headlessui/react";
import { Fragment, forwardRef, useEffect, useRef } from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

export default forwardRef(function TextInput(
	{ type = "text", className = "", isFocused = false, ...props },
	ref
) {
	const input = ref ? ref : useRef();

	useEffect(() => {
		if (isFocused) {
			input.current.focus();
		}
	}, []);

	return (
		<input
			{...props}
			type={type}
			className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 ${className}`}
			ref={input}
		/>
	);
});

export const Input = forwardRef(function (
	{
		type = "text",
		className = "",
		isFocused = false,
		spellCheck = false,
		disabled = false,
		...props
	},
	ref
) {
	const input = ref ? ref : useRef();
	useEffect(() => {
		if (isFocused) {
			input.current.focus();
		}
	}, []);

	return (
		<input
			{...props}
			spellCheck={spellCheck}
			type={type}
			className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-600 focus:border-indigo-600 block w-full p-2.5 ${className}`}
			ref={input}
			disabled={disabled}
		/>
	);
});

export const PopoverInput = ({ children }) => {
	return (
		<Popover className="relative">
			<Popover.Button
				type="button"
				className="rounded-full p-1 outline-none focus:ring-2 focus:ring-indigo-400"
			>
				<IoMdInformationCircleOutline className="w-6 h-6 text-indigo-600" />
			</Popover.Button>
			<Transition
				as={Fragment}
				enter="transition ease-out duration-200"
				enterFrom="opacity-0 translate-y-1"
				enterTo="opacity-100 translate-y-0"
				leave="transition ease-in duration-150"
				leaveFrom="opacity-100 translate-y-0"
				leaveTo="opacity-0 translate-y-1"
			>
				<Popover.Panel className="absolute z-10 left-1/2 mt-3 w-screen max-w-[15rem] -translate-x-1/2 transform">
					<div className="p-4 bg-gray-800 text-gray-50 shadow-md rounded-md">
						{children}
					</div>
				</Popover.Panel>
			</Transition>
		</Popover>
	);
};

export const RangeSlider = ({ className, ...props }) => {
	return (
		<input
			type="range"
			className={`w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-600 ${className}`}
			{...props}
		/>
	);
};
