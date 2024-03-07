import Dashboard from "@/Components/Icons/Dashboard";
import Setting from "@/Components/Icons/Setting";
import {
	MdBrandingWatermark,
	MdCategory,
	MdOutlineProductionQuantityLimits,
	MdOutlineLocalShipping,
} from "react-icons/md";
import { TbChecklist } from "react-icons/tb";
import { RiCoupon3Line } from "react-icons/ri";

export default [
	{
		name: "dashboard",
		route: "admin.dashboard",
		icon: Dashboard,
	},
	{
		name: "Brand",
		route: "admin.brands.index",
		icon: MdBrandingWatermark,
	},
	{
		name: "Categorie",
		route: "admin.category.index",
		icon: MdCategory,
	},
	{
		name: "Produit",
		route: "admin.product.index",
		icon: MdOutlineProductionQuantityLimits,
	},
	{
		name: "Coupon",
		route: "admin.coupon.index",
		icon: RiCoupon3Line,
	},
	{
		name: "Pack & Group",
		route: "admin.group.index",
	},
	{
		name: "ventes",
		route: "admin.order.index",
		icon: TbChecklist,
	},
	{
		name: "Livraison Company",
		route: "admin.shippings.index",
		icon: MdOutlineLocalShipping,
	},
	{
		name: "configuration",
		route: "admin.settings",
		icon: Setting,
	},
];
