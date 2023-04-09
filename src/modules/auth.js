import {store} from "./store";
import {API_URL} from "./const";
import {createElement} from "./createElement";
import {modalController} from "./modalController";
import {getData} from "./getData";

export const auth = (data) => {
	store.user.name = data.name
	store.user.category = data.category
	store.user.id = data.id
	store.user.avatar = data.avatar

	const headerAuth = document.querySelector('.header__auth');
	headerAuth.textContent = ''
	headerAuth.classList.add('auth');

	const categoryRus = store.category.find(
		item => item.title === store.user.category
	).rus;

	createElement('img', {
		src: `${API_URL}/${store.user.avatar}`,
		alt: `${categoryRus} ${store.user.name}`,
		className: 'auth__avatar'
	}, headerAuth)

	createElement('p', {
		className: 'auth__name',
		textContent: store.user.name,
	}, headerAuth)

	createElement('p', {
		className: 'auth__category',
		textContent: categoryRus,
	}, headerAuth)

	createElement('button', {
		className: 'auth__btn-edit',
		textContent: 'Изменить услугу',
	}, headerAuth)


	modalController({
		modal: '.modal_sign-up',
		btnOpen: '.auth__btn-edit',
		btnClose: '.modal__close',
		handlerOpenModal: async () => {
			const data = await getData(`${API_URL}/api/service/${store.user.id}`);
			const form = document.querySelector('.form-sign-up');
			form.action = `${API_URL}/api/service/${store.user.id}`;
			form.dataset.method = 'PATCH';

			form.name.value = data.name;
			form.surname.value = data.surname;
			form.phone.value = data.phone;
			form.email.value = data.email;
			form.price.value = data.price;
			form.about.value = data.about;
			form.direction._choices.setChoiceByValue(data.direction)
			form.category._choices.setChoiceByValue(data.category)
		},
	})
}
