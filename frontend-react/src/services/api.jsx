import axios from 'axios'

const Api = axios.create({
	baseURL: 'http://localhost:3000'
});

export async function getMenu() {
	const response = await Api.get('/menu');
	console.log(response.data);
	return response.data
}

export async function orderItems(itemIds) {
	const data = JSON.stringify({
		items: itemIds
	});
	const response = await Api.post('/order', data, {
		headers: {
			'Content-Type': 'application/json'
		}
	});

	return response;
}
