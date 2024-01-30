import Dashboard from "@/Components/Icons/Dashboard";
import Setting from "@/Components/Icons/Setting";
import {
    MdBrandingWatermark,
    MdCategory,
    MdOutlineProductionQuantityLimits,
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
        iconType: "react-icons/md",
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
        name: "configuration",
        route: "admin.settings",
        icon: Setting,
    },
];
