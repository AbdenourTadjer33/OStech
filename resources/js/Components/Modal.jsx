import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { VscChromeClose } from "react-icons/vsc";

export default function Modal({
	children,
	show = false,
	maxWidth = "2xl",
	closeable = false,
	closeIcon = false,
	onClose = () => {},
	className,
}) {
	const close = () => {
		if (closeable) {
			onClose();
		}
	};

	const maxWidthClass = {
		sm: "sm:max-w-sm",
		md: "sm:max-w-md",
		lg: "sm:max-w-lg",
		xl: "sm:max-w-xl",
		"2xl": "sm:max-w-2xl",
		"3xl": "sm:max-w-3xl",
		"4xl": "sm:max-w-4xl",
		"5xl": "sm:max-w-5xl",
		"6xl": "sm:max-w-6xl",
		full: "w-full",
	}[maxWidth];

	return (
		<Transition show={show} as={Fragment} leave="duration-200">
			<Dialog
				as="div"
				id="modal"
				className="fixed inset-0 flex overflow-y-auto px-4 py-6 sm:px-0 items-center z-50 transform transition-all"
				onClose={close}
			>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="absolute inset-0 bg-gray-500/75" />
				</Transition.Child>

				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					enterTo="opacity-100 translate-y-0 sm:scale-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100 translate-y-0 sm:scale-100"
					leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
				>
					<Dialog.Panel
						className={`mb-6 bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-xl transform transition-all sm:w-full mx-auto ${maxWidthClass} ${className}`}
					>
						{children}
						{closeIcon && (
							<button
								type="button"
								onClick={(e) => close()}
								className="absolute top-5 right-5 p-2 rounded-full text-gray-300  hover:bg-gray-100 hover:bg-opacity-50 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:bg-opacity-70 dark:focus:ring-gray-600 cursor-pointer transition duration-200 "
							>
								<VscChromeClose className="w-8 h-8" />
							</button>
						)}
					</Dialog.Panel>
				</Transition.Child>
			</Dialog>
		</Transition>
	);
}
