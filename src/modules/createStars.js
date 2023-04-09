import starSVG from '../img/star.svg'
import starOSVG from '../img/star-o.svg'

export const createStars = (commentsOrStars) => {
	const stars = Array.isArray(commentsOrStars)
		? Math.round(
		commentsOrStars.reduce((acc, item) => +item.stars + acc, 0) /
			commentsOrStars.length) || 0
		: commentsOrStars;

	const wrapper = document.createElement('div');
	wrapper.classList.add('stars');

	for (let i = 0; i < 5; i++) {
		const star = document.createElement('img');
		star.classList.add('stars__item');

		if (i === 0) {
			star.alt = `Рейтинг специалиста ${stars} из 5`;
		} else {
			star.alt = '';
		}

		if (stars > i) {
			star.src = starSVG;
		} else {
			star.src = starOSVG;
		}

		wrapper.append(star);
	}

	return wrapper;
}

`
<img src="img/star.svg" class="service__star" alt="Рейтинг специалиста 4 из 5">
<img src="img/star.svg" class="service__star" alt="">
<img src="img/star.svg" class="service__star" alt="">
<img src="img/star.svg" class="service__star" alt="">
<img src="img/star-o.svg" class="service__star" alt="">`
