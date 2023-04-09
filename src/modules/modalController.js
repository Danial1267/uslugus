export const modalController = ({
	modal,
	btnOpen,
	btnClose,
	time = 300,
	parrentBtns,
	handlerOpenModal = () => {},
	handlerCloseModal = () => {},
}) => {
	const handlerElems = parrentBtns
		? document.querySelector(parrentBtns)
		: document.querySelectorAll(btnOpen);
	const modalElem = document.querySelector(modal);

	modalElem.style.cssText = `
		display: flex;
		visibility: hidden;
		opacity: 0;
		transition: opacity ${time}ms ease-in-out;
  `;

	const data = {
		handlerOpenModal,
		handlerCloseModal,
		onOpenModal(handlerOpenModal) {
			data.handlerOpenModal = handlerOpenModal;
		},
		onCloseModal(handlerCloseModal) {
			data.handlerCloseModal = handlerCloseModal;
		},
		closeModal: event => {
			const target = event.target;

			if (
				target === modalElem ||
				(btnClose && target.closest(btnClose)) ||
				event.code === 'Escape' ||
				event.type === 'submit'
			) {
				modalElem.style.opacity = '0';

				setTimeout(() => {
					modalElem.style.visibility = 'hidden';
					data.handlerCloseModal({modalElem});
				}, time);


				window.removeEventListener('keydown', data.closeModal);
			}
		},
		openModal: async (handler) => {
			await data.handlerOpenModal({handler, modalElem, closeModal: data.closeModal});
			modalElem.style.visibility = 'visible';
			modalElem.style.opacity = '1';
			window.addEventListener('keydown', data.closeModal)
		},

	}

	if (parrentBtns) {
		handlerElems.addEventListener('click', ({target}) => {
			const handler = target.closest(btnOpen);
			if (handler) {
				data.openModal(handler)
			}
		})
	} else {
		handlerElems.forEach(btn => {
			btn.addEventListener('click', data.openModal);
		});
	}

	modalElem.addEventListener('click', data.closeModal);

	return data;
};
