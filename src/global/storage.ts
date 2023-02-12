const storage = () => {
	const get = (key: string) => {
		return localStorage.getItem(key);
	}
	const exists = (key: string) => {
		return get(key) !== null;
	}

	const length = () => {
		return localStorage.length;
	}

	const getJson = (key: string) => {
		return JSON.parse(get(key) || '{}');
	}
	const set = (key: string, val: string) => {
		return localStorage.setItem(key, val);
	}

	const remove = (key: string) => {
		return localStorage.removeItem(key);
	}
	const clear = () => {
		return localStorage.clear();
	}
	const dispatch = () => {
		window.dispatchEvent(new Event("storage"))
	}
	return {
		ls: localStorage,
		get, 
		exists, 
		length, 
		getJson, 
		set, 
		remove, 
		clear,
		dispatch 
	};
}
export default storage;