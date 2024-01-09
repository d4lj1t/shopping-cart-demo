import {type NextRequest, NextResponse} from 'next/server';
import connectToMongoDb from '@/app/libs/mongodb';
import basketModel from '@/app/models/basket';

// eslint-disable-next-line @typescript-eslint/naming-convention
export async function DELETE(request: NextRequest) {
	try {
		await connectToMongoDb();

		const id = new URL(request.url).searchParams.get('id') as string | undefined;

		if (!id) {
			return NextResponse.json({message: 'Missing ID parameter'}, {status: 400});
		}

		const deletedItem = await basketModel.findByIdAndDelete(id);

		if (!deletedItem) {
			return NextResponse.json({message: 'Item not found'}, {status: 404});
		}

		return NextResponse.json({message: 'Item deleted'}, {status: 200});
	} catch (error) {
		console.error('Error deleting item:', error);
		return NextResponse.json({message: 'Internal server error'}, {status: 500});
	}
}
