import { Link } from "@inertiajs/react";

const SettingCard = ({ link, children }) => {
    return (
            <Link
                href={link}
                className=" inline-block w-full p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
            >
                {children}
            </Link>
    );
};

const Title = ({ children }) => {
    return (
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {children}
        </h5>
    );
};

const Description = ({ children }) => {
    return (
        <p className="font-normal text-gray-700 dark:text-gray-400">
            {children}
        </p>
    );
};

SettingCard.Title = Title;
SettingCard.Description = Description;
export default SettingCard;
