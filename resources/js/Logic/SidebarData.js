import Dashboard from "@/Components/Icons/Dashboard";
import Setting from "@/Components/Icons/Setting";
import {
    MdBrandingWatermark,
    MdCategory,
    MdOutlineProductionQuantityLimits,
    MdOutlineLocalShipping,
} from "react-icons/md";

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
        route: "admin.categories.index",
        icon: MdCategory,
    },
    {
        name: "Produit",
        route: "admin.products.index",
        icon: MdOutlineProductionQuantityLimits,
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
