import {baseApiUrl} from '@/app/constants';
import {type Product} from '@/app/types';

type ErrorResponse = {
	error: string;
};

export const postCartItem = async (newItem: Product) => {
	const {title, currency, priceValue} = newItem;
	try {
		const res = await fetch(`${baseApiUrl}/api/basket/post`, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify({title, currency, priceValue}),
		});

		if (!res.ok) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}
	} catch (error) {
		console.log('failed to post');
		const errorMessage = error instanceof Error && error.message ? error.message : 'failed to post';
		const errorResponse: ErrorResponse = {error: errorMessage};

		return errorResponse;
	}
};
