import React, { useContext } from "react";
import { Link } from "@inertiajs/react";
import { AppLayoutContext } from "@/Layouts/AppLayout";
import { Dropdown } from "flowbite-react";

const DynamicNavBar = () => {
    const { categories } = useContext(AppLayoutContext);
    return (
        <div className="pt-20 sm:pt-[5.5rem] w-full bg-gray-100 shadow">
            <div className="max-w-screen-xl p-4 mx-auto overflow-x-auto">
                <div className="flex items-center">
                    <ul className="flex font-medium mt-0 space-x-8 text-sm">
                        {categories.map((category) => (
                            <li key={category.id}>
                                <Dropdown
                                    label=""
                                    dismissOnClick
                                    renderTrigger={() => (
                                        <button
                                            type="button"
                                            className="text-gray-900 dark:text-white hover:underline whitespace-nowrap"
                                        >
                                            {category.name}
                                        </button>
                                    )}
                                >
                                    {Object.values(category?.subCategories).map(
                                        (subCategory) => (
                                            <Dropdown.Item key={subCategory.id}>
                                                <Link href={route('subCategory.products', {subCategory: subCategory.slug})}>{subCategory.name}</Link>
                                            </Dropdown.Item>
                                        )
                                    )}
                                </Dropdown>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DynamicNavBar;
