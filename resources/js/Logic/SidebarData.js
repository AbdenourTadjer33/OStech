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
		route: "/admin/dashboard",
		icon: Dashboard,
	},
	{
		name: "Brand",
		route: "/admin/brand",
		icon: AiOutlineAppstoreAdd,
	},
	{
		name: "Categorie",
		route: "/admin/category",
		icon: FaFolderPlus,
	},
	{
		name: "Produit",
		route: "/admin/product",
		icon: Product,
	},
	{
		name: "Coupon",
		route: "/admin/coupon",
		icon: RiCoupon3Line,
	},
	{
		name: "ventes",
		route: "/admin/orders",
		icon: TbChecklist,
	},
	{
		name: "Livraison",
		route: "/admin/shipping",
		icon: MdOutlineLocalShipping,
	},
	{
		name: "Utilisateur",
		route: "/admin/users",
		icon: FaUsers,
	},
	{
		name: "Inbox",
		route: "/admin/inbox",
		icon: Inbox,
	},
	{
		name: "configuration",
		route: "/admin/settings",
		icon: Setting,
	},
];

