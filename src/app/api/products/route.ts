import {NextResponse} from 'next/server';
import data from '@/data/products.json';

// eslint-disable-next-line @typescript-eslint/naming-convention
export async function GET() {
	return NextResponse.json(data.products);
}
