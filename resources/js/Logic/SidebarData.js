import Dashboard from "@/Components/Icons/Dashboard";
import Setting from "@/Components/Icons/Setting";
import Product from "@/Components/Icons/Product";
import { MdOutlineLocalShipping } from "react-icons/md";
import { TbChecklist } from "react-icons/tb";
import { RiCoupon3Line } from "react-icons/ri";
import { FaFolderPlus } from "react-icons/fa6";
import { AiOutlineAppstoreAdd } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import Inbox from "@/Components/Icons/Inbox";
import Sales from "@/Components/Icons/Sales";

export default [
	{
		name: "dashboard",
		route: "/dashboard",
		icon: Dashboard,
	},
	{
		name: "Brand",
		route: "/brand",
		icon: AiOutlineAppstoreAdd,
	},
	{
		name: "Categorie",
		route: "/category",
		icon: FaFolderPlus,
	},
	{
		name: "Produit",
		route: "/product",
		icon: Product,
	},
	{
		name: "Coupon",
		route: "/coupon",
		icon: RiCoupon3Line,
	},
	{
		name: "ventes",
		route: "/orders",
		icon: TbChecklist,
	},
	{
		name: "Livraison",
		route: "/shipping",
		icon: MdOutlineLocalShipping,
	},
	{
		name: "Utilisateur",
		route: "/users",
		icon: FaUsers,
	},
	{
		name: "Inbox",
		route: "/inbox",
		icon: Inbox,
	},
	{
		name: "configuration",
		route: "/settings",
		icon: Setting,
	},
];

