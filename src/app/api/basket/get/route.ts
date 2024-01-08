import {NextResponse} from 'next/server';
import {type Product} from '@/app/types';
import connectToMongoDb from '@/app/libs/mongodb';
import basketModel from '@/app/models/basket';

// eslint-disable-next-line @typescript-eslint/naming-convention
export async function GET(request: {json: () => Promise<Product[]>}) {
	await connectToMongoDb();
	const data = await basketModel.find();
	return NextResponse.json(data);
}
