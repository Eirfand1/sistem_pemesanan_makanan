import menu from './utils/menu.json' assert { type: "json" }

export const getAllMenu = async (req, res) => {
	res.json(menu)
}

export const orderMenu = async (req, res) => {
	const orderedId = req.body.items;

	const counts = orderedId.reduce((acc, id) => {
		acc[id] = (acc[id] || 0) + 1;
		return acc;
	}, {});
	
	const orderedItems = menu
		.filter(item => counts[item.id])
		.flatMap(item => Array(counts[item.id]).fill(item));

	const subTotal = orderedItems.reduce((sum, item) => sum + item.price, 0);
	const tax = subTotal * 0.10;
	const discount = subTotal > 50000 ? subTotal * 0.10 : 0;
	const total = subTotal + tax - discount;

	res.json({
		items: orderedItems,
		subTotal,
		tax,
		discount,
		total
	});
}
