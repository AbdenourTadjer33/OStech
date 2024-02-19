export const capitalize = (str) => {
    if (!isStr(str) || !str.length > 0) return str;
    return str.charAt(0).toUpperCase() + str.slice(1);
};

export const currencyFormat = (number) => {
    return new Intl.NumberFormat("fr", {
        style: "currency",
        currency: "dzd",
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(number);
};

const isStr = (str) => {
    return typeof str === "string";
};

export const media = (str) => {
    return "/media/" + str;
};

export function debounce(func, delay) {
    let timeoutId;

    const debouncedFunction = function (...args) {
        const context = this;

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
            func.apply(context, args);
        }, delay);
    };

    debouncedFunction.cancel = function () {
        clearTimeout(timeoutId);
    };

    return debouncedFunction;
}

export const comboFilterData = (query, data, ...key) => {
    console.log(key);
    if (typeof key === "string") {
        return "is String";
    }
    return query === ""
        ? data
        : data.filter((record) =>
              record?.[key]
                  .toLowerCase()
                  .replace(/\s+/g, "")
                  .includes(query.toLowerCase().replace(/\s+/g, ""))
          );
};
