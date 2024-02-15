import React from "react";

const Avatar = ({ user }) => {
    const arr = user.name.split(" ");
    const caracters = arr.length >= 2 ? arr[0][0] + arr[1][0] : arr[0][0]; 

    return (
        <div className="inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-500 px-3 py-2 border-2 dark:border-gray-600 hover:ring-1 text-gray-500 hover:text-gray-700 focus:outline-none transition ease-in-out duration-150">
            <span className="font-semibold text-base text-gray-600 dark:text-gray-300 select-none cursor-pointer">
                {caracters.toUpperCase()}
            </span>
        </div>
    );
};

export default Avatar;
