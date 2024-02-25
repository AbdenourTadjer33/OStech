import React, { useContext, useState } from "react";
import { AppLayoutContext } from "@/Layouts/AppLayout";
import SidebarCart from "./SidebarCart";
import { Cart as CartIcon } from "@/Components/Icons/Cart";
import { useEffect } from "react";
import { useRef } from "react";

const Cart = () => {
	const { cart } = useContext(AppLayoutContext);
	const [open, setOpen] = useState(false);
	const [newCartItem, setNewCartItem] = useState(false);
	const firstRender = useRef(0);

	useEffect(() => {
		if (firstRender.current > 0) {
			setNewCartItem(true);
			setTimeout(() => {
				setNewCartItem(false);
			}, 1500);
		}
		firstRender.current += 1;
	}, [cart.length]);

	return (
		<>
			<button
				className="text-primary-950 hover:text-indigo-400"
				onClick={() => setOpen(true)}
			>
				<div className="relative">
					<CartIcon />
					<div
						className={`absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-4 -end-4 ${
							newCartItem && "animate-ping"
						}`}
					>
						{cart.length}
					</div>
				</div>
			</button>

			<SidebarCart open={open} setOpen={setOpen} cart={cart} />
		</>
	);
};

export default Cart;
