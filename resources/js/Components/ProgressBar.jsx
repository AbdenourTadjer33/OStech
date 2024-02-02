import React from "react";

const ProgressBar = ({ bgcolor, completed }) => {
    const containerStyles = {
        height: 20,
        width: "100%",
        backgroundColor: "#e0e0de",
        borderRadius: 50,
        margin: 50,
    };

    const fillerStyles = {
        height: "100%",
        width: `${completed}%`,
        backgroundColor: bgcolor,
        borderRadius: "inherit",
        textAlign: "right",
    };

    const labelStyles = {
        padding: 5,
        color: "white",
        fontWeight: "bold",
    };

    return (
        <div className="h-5 w-full bg-gray-600 dark:bg-gray-200 rounded-3xl my-5">
            <div
                className={`h-full bg-primary-700 rounded-3xl text-right`}
                style={{ width: `${completed}%` }}
            >
                <span className="pe-3 text-sm font-medium text-white">{`${completed}%`}</span>
            </div>
        </div>
    );
};

export default ProgressBar;
