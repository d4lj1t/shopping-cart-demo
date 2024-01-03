import {NextResponse} from 'next/server';
import products from '@/data/products.json';

// eslint-disable-next-line @typescript-eslint/naming-convention
export async function GET(request: Request) {
	return NextResponse.json({
		products: [
			{
				title: 'item 1',
				currency: '£',
				priceValue: 50,
			},
			{
				title: 'item 2',
				currency: '£',
				priceValue: 150,
			},
			{
				title: 'item 3',
				currency: '£',
				priceValue: 250,
			},
		],
	});
}
