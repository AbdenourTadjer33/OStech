import { Fragment, useContext, useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import { AdminLayoutContext } from "@/Layouts/AdminLayout";
import SidebarData from "@/Logic/SidebarData";
import { Transition } from "@headlessui/react";

export default function SideBar() {
	const { isOpen, toggleSideBar } = useContext(AdminLayoutContext);
	return (
		<Aside>
			<ul className="space-y-2 font-medium">
				{SidebarData.map(({ name, route, icon, sub }, idx) => {
					return (
						<SideBarLink
							key={idx}
							name={name}
							link={route}
							Icon={icon}
						/>
					);
				})}
			</ul>
			<SideBarToggler />
		</Aside>
	);
}

const Aside = ({ children }) => {
	const { isOpen } = useContext(AdminLayoutContext);
	return (
		<aside
			className={`fixed  top-0 left-0 z-40 ${
				isOpen ? "w-64" : "w-16 "
			} h-screen pt-20 transition-all duration-100 ease-in bg-white border-r border-gray-200 dark:bg-gray-800 dark:border-gray-700 ${
				!isOpen && "-translate-x-16"
			} sm:translate-x-0`}
			aria-label="Sidebar"
		>
			<div className="relative h-full px-3 pb-4 ">{children}</div>
		</aside>
	);
};

const SideBarLink = ({ name, link, Icon }) => {
	const { isOpen } = useContext(AdminLayoutContext);
	const activeLink = link === usePage().url
	return (
		<li>
			<Link
				href={link}
				className={`flex items-center text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group p-2 ${
					isOpen ? "justify-start" : "justify-center"
				} ${activeLink && "bg-gray-200 dark:bg-gray-600"}`}
			>
				{Icon && (
					<Icon
						className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white ${
							activeLink && "text-gray-900 dark:text-white"
						}`}
					/>
				)}
				<Transition
					show={isOpen}
					as={Fragment}
					enter="transition-opacity duration-150"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-75"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<span className={`ms-3 font-semibold capitalize`}>
						{name}
					</span>
				</Transition>
			</Link>
		</li>
	);
};

const SideBarToggler = () => {
	const { isOpen, toggleSideBar } = useContext(AdminLayoutContext);
	return (
		<button
			type="button"
			onClick={toggleSideBar}
			className="absolute -right-4 bg-gray-50 dark:bg-gray-600 top-1/2 -translate-y-1/2  inline-flex items-center p-0.5 border border-gray-200 dark:border-gray-800  text-sm text-gray-500 rounded-full focus:outline-none focus:ring-2 dark:text-gray-400 focus:ring-transparent"
		>
			<svg
				className={`w-6 h-6 transform transition-transform duration-300 ease-in-out ${
					isOpen ? "rotate-180" : ""
				}`}
				fill="currentColor"
				viewBox="0 0 20 20"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fillRule="evenodd"
					d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
					clipRule="evenodd"
				></path>
			</svg>
		</button>
	);
};
