import { AdminLayoutContext } from "@/Layouts/AdminLayout";
import React, { useContext } from "react";
import { Link } from "@inertiajs/react";
import ApplicationLogo from "../../ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import Avatar from "../../Avatar";
import { BiMenuAltLeft } from "react-icons/bi";

export default function NavBar() {
	const { user, isDark, toggleDarkMode, toggleSideBar } =
		useContext(AdminLayoutContext);

	return (
		<nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
			<div className="px-3 py-3 lg:px-5 lg:pl-3">
				<div className="flex items-center justify-between">
					<div className="flex items-center justify-start rtl:justify-end">
						<div className="block sm:hidden">
							<button onClick={toggleSideBar} className="text-gray-800 hover:text-gray-900 dark:text-white dark:hover:text-gray-200">
								<BiMenuAltLeft className="w-8 h-8"/>
							</button>
						</div>
						<Link href="/" className="flex ms-2 md:me-24">
							<ApplicationLogo
								type="indigo"
								className="h-8 w-auto me-3"
							/>
						</Link>
					</div>

					<div className="flex items-center gap-5">
						<div>
							<button
								type="button"
								className="text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-2.5"
								onClick={toggleDarkMode}
							>
								{isDark ? (
									<svg
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
											fillRule="evenodd"
											clipRule="evenodd"
										></path>
									</svg>
								) : (
									<svg
										className="w-5 h-5"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
									</svg>
								)}
							</button>
						</div>

						<div className="relative">
							<Dropdown>
								<Dropdown.Trigger>
									<button
										type="button"
										className="flex text-sm rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
										aria-expanded="false"
									>
										<Avatar user={user} />
									</button>
								</Dropdown.Trigger>

								<Dropdown.Content>
									<div className="px-4 py-3" role="none">
										<p
											className="text-sm text-gray-900 dark:text-white capitalize"
											role="none"
										>
											{user.name}
										</p>
										<p
											className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
											role="none"
										>
											{user.email}
										</p>
									</div>
									<ul>
										<li>
											<Dropdown.Link href={"/profile"}>
												Profile
											</Dropdown.Link>
										</li>
										{/* <li>
											<Dropdown.Link
												href={route("welcome")}
											>
												Site web
											</Dropdown.Link>
										</li> */}
										<li>
											<Dropdown.Link
												href={"/logout"}
												method="post"
												as="button"
											>
												Log Out
											</Dropdown.Link>
										</li>
									</ul>
								</Dropdown.Content>
							</Dropdown>
						</div>
					</div>
				</div>
			</div>
		</nav>
	);
}
