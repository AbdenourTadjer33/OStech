import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
const colors = require("tailwindcss/colors");

export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
        "node_modules/flowbite-react/lib/esm/**/*.js",
    ],

    theme: {
        colors: {
            primary: colors.blue,
            secondary: colors.gray,
            danger: colors.red,
            info: colors.indigo,
            slate: colors.slate,
            zinc: colors.zinc,
            cyan: colors.cyan
        },
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
        },
    },

    plugins: [forms, require("flowbite/plugin")],

    darkMode: "class",
};
