import axios from 'axios';

export const api = axios.create({
	baseURL: 'https://pixabay.com/api/',
	timeout: 5000,
	responseType: 'json',
	params: {
		key: '16881353-7698db3408afc2db4d639fb05'
	}
})
