import React, { createContext } from "react";
import { usePage, Link } from "@inertiajs/react";
import AppLayout from "@/Layouts/AppLayout";
import Avatar from "@/Components/Avatar";
import Container from "@/Components/Container";
import { capitalize } from "@/Logic/helper";

export const AuthenticatedUserLayout = createContext();

const Authenticated = ({ children }) => {
	const { user } = usePage().props;

	const tabLinks = [
		{
			label: "Profile",
			link: "profile.index",
		},
		{
			label: "Mes commandes",
			link: "order.index",
		},
		{
			label: "Paramètres",
			link: "setting.index",
		},
	];

	return (
		<AppLayout>
			<Container className="flex flex-col lg:flex-row lg:items-start gap-4">
				<div className="w-full lg:max-w-xs space-y-4">
					<div className="w-full bg-white shadow sm:rounded-lg p-4">
						<div className="flex justify-center">
							<Avatar user={user} size="xl" />
						</div>
						<div>
							<div className="text-center text-xl font-medium text-gray-900">
								{user.name}
							</div>
							<div className="text-center text-base font-medium text-gray-900">
								{user.email}
							</div>
						</div>
					</div>

					<div className="w-full bg-white shadow rounded-lg overflow-hidden">
						<ul className="flex items-center lg:block ">
							{tabLinks.map(({ label, link }, idx) => (
								<li key={idx} className="lg:w-full w-1/3">
									<Link
										href={route(link)}
										className={`block py-2.5 px-4 text-sm sm:text-base font-medium transition duration-200 ${
											route().current(link)
												? "bg-gray-200"
												: "hover:bg-gray-100 text-gray-600"
										}`}
									>
										{capitalize(label)}
									</Link>
								</li>
							))}
						</ul>
					</div>
				</div>

				<div className="w-full space-y-4">{children}</div>
			</Container>
		</AppLayout>
	);
};

export default Authenticated;
