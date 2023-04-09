export const showPassword = () => {
	const inputsPassword = document.querySelectorAll('.form__input_password');
	const btnsEyePassowrd = document.querySelectorAll('.form__password-eye');

	btnsEyePassowrd.forEach((btn, i) => {
		btn.addEventListener('click', () => {
			btn.classList.toggle('form__password-eye_show');
			inputsPassword[i].type = btn.classList.contains('form__password-eye_show')
				? 'text'
				: 'password';
		})
	})
}
