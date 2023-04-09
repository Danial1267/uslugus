import {renderList} from "./renderList";
import {API_URL} from "./const";

export const searchControl = () => {
	const searchForm = document.querySelector('.search');

	searchForm.addEventListener('submit', e => {
		e.preventDefault();

		renderList(`${API_URL}/api/service?search=${searchForm.search.value}`)
	})
}
