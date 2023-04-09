import {createElement} from "./createElement";
import {createStars} from "./createStars";

export const createReview = comments => {
	const reviewList = createElement('ul', {
		className: 'review__list',
	});

	comments.forEach(comment => {
		const reviewItem = createElement('li', {
			className: 'review__item',
		}, reviewList);

		createElement('h4', {
			className: 'review__name',
			textContent: comment.name
		}, reviewItem);

		const stars = createStars(comment.stars);
		stars.classList.add('review__stars');
		reviewItem.append(stars);

		createElement('p', {
			className: 'review__text',
			textContent: comment.text
		}, reviewItem);

	});

	return reviewList;
}
