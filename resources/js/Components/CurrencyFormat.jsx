import React from "react";

const CurrencyFormat = ({number=0}) => {
    const $output = new Intl.NumberFormat("fr", {
        style: "currency",
        currency: "dzd",
    }).format(number);

    return <>{$output}</>;
};

export default CurrencyFormat;
