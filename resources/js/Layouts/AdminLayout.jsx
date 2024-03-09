import React, { useEffect, useState, createContext, useRef } from "react";
import { usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import Alert from "@/Components/Alert";
import NavBar from "@/Components/Section/Admin/NavBar";
import SideBar from "@/Components/Section/Admin/SideBar";

export const AdminLayoutContext = createContext();

const AdminLayout = ({ children }) => {
	const { user, flash } = usePage().props;
	const [isShown, setIsShown] = useState(false);
	const [isOpen, SetIsOpen] = useState(
		JSON.parse(localStorage.getItem("sideBar")) == true ? true : false
	);

	const [isDark, setIsDark] = useState(
		JSON.parse(localStorage.getItem("darkMode")) == true ? true : false
	);

	const toggleSideBar = (e) => {
		localStorage.setItem("sideBar", !isOpen);
		SetIsOpen(!isOpen);
	};

	const toggleDarkMode = () => {
		localStorage.setItem("darkMode", !isDark);
		setIsDark(!isDark);
	}

	useEffect(() => {
		if (isDark) {
			document.documentElement.classList.add("dark");
		} else {
			document.documentElement.classList.remove("dark");
		}
	}, [isDark]);

	useEffect(() => {
		if (flash.alert) {
			setIsShown(true);
			setTimeout(() => {
				setIsShown(false);
			}, 10000);
		}
	}, [flash.alert]);

	return (
		<AdminLayoutContext.Provider
			value={{
				user,
				isOpen,
				SetIsOpen,
				toggleSideBar,
				isDark,
				toggleDarkMode,
			}}
		>
			<NavBar />
			<SideBar />

			<main
				className={`p-4 mt-16 transform transition-all duration-200 ease-in-out text-gray-900 dark:text-white  ${
					isOpen ? "ml-64" : "ml-20"
				}`}
			>
				{children}
			</main>

			<div className="fixed bottom-8 right-5 space-y-4 z-[90] max-w-xl min-w-[36rem]">
				{flash.alert && (
					<Transition
						show={isShown}
						enter="transition ease-in-out duration-100 transform"
						enterFrom="translate-y-full"
						enterTo="translate-y-0"
						leave="transition ease-in-out duration-100 transform"
						leaveFrom="translate-y-0"
						leaveTo="translate-y-full"
					>
						<Alert
							onClick={() => setIsShown(false)}
							type={flash.alert?.status}
							content={flash.alert?.message}
						/>
					</Transition>
				)}
			</div>
		</AdminLayoutContext.Provider>
	);
};

export default AdminLayout;
