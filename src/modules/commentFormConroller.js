import { API_URL } from './const';
import { postData } from './postData';

export const commentFormController = (form, cb) => {
  form.addEventListener('submit', e => {
    e.preventDefault();
    cb(e)

    const formData = new FormData(form);
		const data = Object.fromEntries(formData);
    postData(`${API_URL}/api/service/comment/${form.dataset.id}`, data)
  })
};