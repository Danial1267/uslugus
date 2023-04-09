import './index.html';
import './index.scss';
import {modalController} from "./modules/modalController";
import {selectController} from "./modules/selectController";
import {showPassword} from "./modules/showPassword";
import {choicesController} from "./modules/choicesController";
import {getCategory} from "./modules/getCategory";
import {renderList} from "./modules/renderList";
import {searchControl} from "./modules/searchControl";
import {ratingController} from "./modules/ratingController";
import {signInController, signUpController} from "./modules/sign";
import {getData} from "./modules/getData";
import {API_URL} from "./modules/const";
import {renderModal} from "./modules/renderModal";


const init = async () => {
	await getCategory();
	renderList();

	const eventModalSignIn = modalController({
		modal: '.modal_sign-in',
		btnOpen: '.header__auth-btn_sign-in',
		btnClose: '.modal__close'
	});

	const eventModalSignUp = modalController({
		modal: '.modal_sign-up',
		btnOpen: '.header__auth-btn_sign-up',
		btnClose: '.modal__close',
	});

	modalController({
		modal: '.modal_person',
		btnOpen: '.service',
		parrentBtns: '.services__list',
		btnClose: '.modal__close',
		handlerOpenModal: async ({handler, modalElem, closeModal}) => {
			const data = await getData(`${API_URL}/api/service/${handler.dataset.id}`);
			renderModal(modalElem, data, closeModal);
			const comments = document.querySelectorAll('.review__text');

			comments.forEach((comment) => {
				if (comment.scrollHeight > 38) {
					const button = document.createElement('button');
					button.classList.add('review__open');
					button.textContent = 'Развернуть';
					comment.after(button);

					button.addEventListener('click', () => {
						comment.classList.toggle('review__text_open');
						button.textContent = comment.classList.contains('review__text_open')
							? 'Свернуть'
							: 'Развернуть';
					})
				}
			})
		}
	});

	selectController( {
		openBtn: '.category__title',
		openBlock: '.category__list',
		closeBtn: '.category__btn',
		handlerChange: (value) => {
			console.log(value)
		}
	});

	showPassword();
	choicesController();

	searchControl();

	signUpController(eventModalSignUp.closeModal);

	signInController(eventModalSignIn.closeModal)
};

init();
