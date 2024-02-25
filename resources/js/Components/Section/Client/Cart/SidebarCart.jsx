import React, { Fragment } from "react";
import { Link } from "@inertiajs/react";
import { Dialog, Transition } from "@headlessui/react";
import { currencyFormat } from "@/Logic/helper";
import { MdClose } from "react-icons/md";
import CartItem from "./CartItem";

const SidebarCart = ({ open, setOpen, cart }) => {
	const totalCart = () => {
		let sum = 0;
		cart.forEach((item) => {
			const qte = item.qte;
			const price = item.product?.price;
			sum += qte * price;
		});
		return sum;
	};

	return (
		<Transition.Root show={open} as={Fragment}>
			<Dialog as="div" className="relative z-50" onClose={setOpen}>
				<Transition.Child
					as={Fragment}
					enter="ease-in-out duration-500"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in-out duration-500"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
				</Transition.Child>

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-0 overflow-hidden">
						<div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
							<Transition.Child
								as={Fragment}
								enter="transform transition ease-in-out duration-500 sm:duration-700"
								enterFrom="translate-x-full"
								enterTo="translate-x-0"
								leave="transform transition ease-in-out duration-500 sm:duration-700"
								leaveFrom="translate-x-0"
								leaveTo="translate-x-full"
							>
								<Dialog.Panel className="pointer-events-auto w-screen max-w-md">
									<div className="flex h-full flex-col bg-white shadow-xl">
										<div className="flex-1 overflow-y-auto px-4 py-6">
											<div className="flex items-start justify-between">
												<Dialog.Title className="text-lg font-medium text-gray-900">
													Panier
												</Dialog.Title>
												<div className="ml-3 flex h-7 items-center">
													<button
														type="button"
														className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
														onClick={() =>
															setOpen(false)
														}
													>
														<span className="absolute -inset-0.5" />
														<span className="sr-only">
															Close panel
														</span>
														<MdClose className="h-6 w-6" />
													</button>
												</div>
											</div>

											<hr className="-mx-4 mt-4" />

											{cart.length === 0 ? (
												<div className="mt-5">
													<h1 className="text-4xl font-medium text-gray-700 mb-4">
														Votre panier est vide
													</h1>

													<img
														className="maxx-w-lg mx-auto"
														src={
															"/assets/images/error/404.png"
														}
													/>
												</div>
											) : (
												<div className="flow-root">
													<ul
														role="list"
														className=" divide-y divide-gray-200"
													>
														{cart.map(
															(item, idx) => (
																<li
																	key={idx}
																	className="flex -mx-4"
																>
																	<CartItem
																		item={
																			item
																		}
																	/>
																</li>
															)
														)}
													</ul>
												</div>
											)}
										</div>

										<div
											className={`${
												cart.length == 0
													? ""
													: "border-t"
											} border-gray-200 px-4 py-6 sm:px-6`}
										>
											{cart.length !== 0 && (
												<>
													<div className="flex justify-between text-base font-medium text-gray-900">
														<p>Sous-total</p>
														<p>
															{currencyFormat(
																totalCart()
															)}
														</p>
													</div>
													<p className="mt-0.5 text-sm text-gray-500">
														Frais de livraison et
														taxes sont calculés à la
														caisse
													</p>
													<div className="mt-6">
														<Link
															href={route(
																"order.create"
															)}
															className="w-full flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
														>
															Finaliser ma
															commande
														</Link>
													</div>
												</>
											)}

											<div className="mt-6 flex justify-center text-center text-sm text-gray-500">
												<p>
													<button
														type="button"
														className="font-medium text-indigo-600 hover:text-indigo-500"
														onClick={() =>
															setOpen(false)
														}
													>
														Continuer l'achat
														<span aria-hidden="true">
															{" "}
															&rarr;
														</span>
													</button>
												</p>
											</div>
										</div>
									</div>
								</Dialog.Panel>
							</Transition.Child>
						</div>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	);
};

export default SidebarCart;
