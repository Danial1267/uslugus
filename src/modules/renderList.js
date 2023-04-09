import {API_URL} from "./const";
import {getData} from "./getData";
import {createCard} from "./createCard";


export const renderList = async (url = `${API_URL}/api/service`) => {
	const serviceList = document.querySelector('.services__list');
	serviceList.textContent = '';

	const data = await getData(url);
	const cards = data.map(createCard);
	serviceList.append(...cards)
}
