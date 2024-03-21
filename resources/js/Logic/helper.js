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

export const calculatePrice = (price, percentage) => {
	if (percentage < 0 && percentage > 100) {
		throw new Error("percentage must be between 0 and 100");
	}

	return price - (price * percentage) / 100;
};

const isStr = (str) => {
	return typeof str === "string";
};

export const isNumber = (value) => {
	return !isNaN(value);
};

export const media = (str) => {
	return "/media/" + str;
};

export const debounce = (func, delay) => {
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
};

export const comboFilterData = (query, data, ...key) => {
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

export const parseDatetime = (strDatetime) => {
	if (!strDatetime) return;
	var parts = strDatetime.split(" "); // Split date and time
	var dateParts = parts[0].split("-"); // Split date into day, month, year
	var timeParts = parts[1].split(":"); // Split time into hour, minute

	// Create a new Date object using the components
	// Note: Months in JavaScript Date object are zero-based, so we subtract 1 from the month component
	var jsDate = new Date(
		dateParts[2],
		dateParts[1] - 1,
		dateParts[0],
		timeParts[0],
		timeParts[1]
	);

	// Check if the date is valid
	if (isNaN(jsDate.getTime())) {
		return null; // Return null if the date is invalid
	}

	return jsDate;
};

export const shorter = (str, nbWord = 4) => {
	if (!isStr(str)) return null;

	const arr = str.split(" ");

	if (arr.length <= nbWord) return str;

	return arr.slice(0, nbWord).join(" ");
};

export const generatePassword = (length = 10) => {
	const charset =
		"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+{}[]|;:,.<>?";
	let password = "";
	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * charset.length);
		password += charset[randomIndex];
	}
	return password;
};

export const hasObjectWithKeyValue = (array, key, value) =>
	array.some((obj) => obj.hasOwnProperty(key) && obj[key] === value);
