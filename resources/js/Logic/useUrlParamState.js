import { useState, useEffect } from "react";

/**
 *
 * @param {?string} defaultValue initialized to an empty string
 * @param {?string} paramName
 * @param {?array} options
 * @param {?string} optionLabel
 * @returns
 */
function useUrlParam(
	defaultValue = "",
	paramName = null,
	options = null,
	optionLabel = "name"
) {
	const [value, setValue] = useState(() => {
		const searchParams = new URLSearchParams(window.location.search);
		if (searchParams.has(paramName)) {
			const paramValue = searchParams.get(paramName);
			if (
				options &&
				options.some((option) => option[optionLabel] === paramValue)
			) {
				return paramValue;
			}
		}
		return defaultValue;
	});

	return [value, setValue];
}

export default useUrlParam;
