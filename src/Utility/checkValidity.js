export const checkValidity = (value, rules) => {
	let isValid = true;

	if (rules && rules.required) {
		isValid = value.trim() !== "" && isValid;
	}

	return isValid;
};
