export const updatedObject = (oldState, updatedProperties) => {
	return {
		...oldState,
		...updatedProperties,
	};
};

export const checkInputValidity = (inputValue, rule) => {
	let isValid = true;

	if (rule.required) {
		isValid = inputValue !== '' && isValid;
	}

	if (rule.minlength) {
		isValid = inputValue.length >= rule.minlength && isValid;
	}

	if (rule.maxlength) {
		isValid = inputValue.length <= rule.maxlength && isValid;
	}

	if (rule.isEmail) {
		const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
		isValid = pattern.test(inputValue) && isValid;
	}

	if (rule.isNumeric) {
		const pattern = /^\d+$/;
		isValid = pattern.test(inputValue) && isValid;
	}

	return isValid;
};
