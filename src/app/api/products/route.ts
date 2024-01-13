import {NextResponse} from 'next/server';
import data from '@/data/products.json';

// eslint-disable-next-line @typescript-eslint/naming-convention
export async function GET(request: any) {
	try {
		return NextResponse.json(data.products);
	} catch (error: any) {
		console.error('error getting products');
		const errorMessage = error instanceof Error && error.message ? error.message : 'Failed to get products';

		return NextResponse.json({error: errorMessage}, {status: 500});
	}
}
