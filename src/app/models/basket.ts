import mongoose, {type Document, Schema} from 'mongoose';

const basketModelSchema = new Schema(
	{
		userId: {
			type: String,
			required: true,
		},
		title: String,
		currency: String,
		priceValue: String,
	},
	{
		timestamps: true,
	},
);

const basketModel = mongoose.models.Basket || mongoose.model('Basket', basketModelSchema);

export default basketModel;
