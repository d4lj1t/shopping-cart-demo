export type Product = {
	title: string;
	currency: string;
	priceValue: number;
};

export type ContextType = {
	cartItems: Product[];
	handleAddToCart: (newItem: Product) => void;
};
