import React from 'react';
import {type Product} from '@/app/types';
import styles from './index.module.scss';
import AddButton from './addButton';

type ProductsProps = {
	products: Product[];
};

export default function Products({products}: ProductsProps): React.ReactNode {
	return (
		<>
			<div className={styles.container}>
				{products.map((product: Product, index: number) => (
					<div className={styles.item} key={index}>
						<h1 className={styles.item__title}>{product.title}</h1>
						<h1>
							{product.currency}
							{product.priceValue}
						</h1>
						<AddButton item={product} />
					</div>
				))}
			</div>
		</>
	);
}
