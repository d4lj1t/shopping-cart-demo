'use client';

import React, {useContext} from 'react';
import {Context} from '@/app/context';
import {type Product, type ContextType} from '@/app/types';
import styles from './index.module.scss';

type ProductsProps = {
	products: Product[];
};

export default function Products({products}: ProductsProps): React.ReactNode {
	const {handleAddToCart} = useContext(Context) as ContextType;

	return (
		<>
			<div className={styles.container}>
				{products.map((product, index) => (
					<div className={styles.item} key={index}>
						<h1 className={styles.item__title}>{product.title}</h1>
						<h1>
							{product.currency}
							{product.priceValue}
						</h1>
						<button
							onClick={() => {
								handleAddToCart(product);
							}}
							className='p-2 bg-blue-200 cursor-pointer mt-5'>
							Add to basket
						</button>
					</div>
				))}
			</div>
		</>
	);
}
