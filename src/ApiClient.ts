//@ts-nocheck
import axios from 'axios';

const OMDB_URL = `https://www.omdbapi.com/`;
const OMDB_API_KEY = '8a9ce35f';

const axiosClient = axios.create({
	baseURL: OMDB_URL,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	},
	params: {
		apiKey: OMDB_API_KEY,
		plot: 'full'
	}
});

axiosClient.interceptors.response.use(
	function (response) {
		console.log(response);
		const apiRes = response.data.Response;
		if (apiRes === 'False') {
			alert(response.data.Error);
		}
		return response;
	},
	function (error) {}
);

export default axiosClient;
