import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://pixabay.com/api/',
	timeout: 5000,
	responseType: 'json'
})
