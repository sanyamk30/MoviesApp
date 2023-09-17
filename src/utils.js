export const debounce = (fn, delay) => {
	let timerId;

	return function (...args) {
		if (timerId) clearTimeout(timerId);

		timerId = setTimeout(() => {
			fn.apply(this, args);
		}, delay);
	};
};
