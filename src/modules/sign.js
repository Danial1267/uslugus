import {avatarController} from "./avatarController";
import {API_URL} from "./const";
import {postData} from "./postData";
import {createCard} from "./createCard";
import {auth} from "./auth";


export const signInController = (callback) => {
	const form = document.querySelector('.form-sign-in');

	form.addEventListener('submit', async e => {
		e.preventDefault();

		const formData = new FormData(form);
		const data = Object.fromEntries(formData);

		const dataResponse = await postData(`${API_URL}/api/service/signin`, data);

		if (dataResponse.errors) {
			console.log(dataResponse.errors) // todo обработка ошибки
			return;
		}

		callback(e)

		auth(dataResponse);
	});
};

export const signUpController = (callback) => {
	const form = document.querySelector('.form-sign-up');
	form.action = `${API_URL}/api/service/signup`;
	const crp = avatarController({
		inputFile: '.avatar__input',
		uploadResult: '.avatar__result',
	});


	form.addEventListener('submit', async e => {
		e.preventDefault();

		if (form.password[0].value !== form.password[1].value) {
			console.log('Пароли не совпадают') // todo обработка ошибки
			return;
		}

		const formData = new FormData(form);
		const data = Object.fromEntries(formData);
		data.avatar = await crp.result({
			type: 'base64',
			size: 'viewport',
		});

		if (!data.avatar.includes('base64')) {
			delete data.avatar;
		}

		const dataResponse = await postData(form.action, data, form.dataset.method);

		if (dataResponse.errors) {
			console.log(dataResponse.errors) // todo обработка ошибки

			return;
		}

		if (form.dataset.method !== 'PATCH') {
			const servicesList = document.querySelector('.services__list');
			servicesList.append(createCard(dataResponse));
			auth(dataResponse);
		}

		form.reset();
		crp.hideAvatar();
		callback(e);
	})

};
