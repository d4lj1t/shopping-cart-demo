import React from 'react';
import Link from 'next/link';
import {type Product} from '@/app/types';
import styles from '@/app/components/Products/index.module.scss';
import {baseApiUrl} from '@/app/constants';

type ErrorResponse = {
	error: string;
};

async function getBasket(): Promise<Product[] | ErrorResponse> {
	try {
		const res = await fetch(`${baseApiUrl}/api/basket/get`, {
			method: 'GET',
		});

		if (!res.ok) {
			throw new Error(`HTTP error! Status: ${res.status}`);
		}

		return await res.json() as Product[];
	} catch (error) {
		console.error('Error in getBasket:', error);
		const errorMessage = error instanceof Error && error.message ? error.message : 'Failed to fetch basket';
		const errorResponse: ErrorResponse = {error: errorMessage};

		return errorResponse;
	}
}

export default async function Basket() {
	const basketItems: Product[] | ErrorResponse = await getBasket();

	if ('error' in basketItems) {
		return <p>Error: {basketItems.error}</p>;
	}

	return (
		<>
			<Link href='/home' className='flex  flex-col items-center'>Home</Link>
			<div className='flex flex-wrap gap-4 p-5'>
				{basketItems.length > 0
					&& basketItems.map((item: Product, index: number) => (
						<div className={styles.item} key={index}>
							<h1 className={styles.item__title}>{item.title}</h1>
							<h1>
								{item.currency}
								{item.priceValue}
							</h1>
						</div>
					))
				}
				{!basketItems.length && <div>No items added</div>}
			</div>
		</>
	);
}
