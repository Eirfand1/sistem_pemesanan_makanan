import { useEffect, useState } from 'react';
import MenuItem from './components/MenuItem';
import OrderSummary from './components/OrderSummary';
import CartDrawer from './components/CartDrawer';
import { getMenu, orderItems } from './services/api.jsx~';

function App() {
	const [menu, setMenu] = useState([]);
	const [cart, setCart] = useState({});
	const [summary, setSummary] = useState(null);

	useEffect(() => {
		getMenu().then(setMenu).catch(console.error);
	}, []);

	const addToCart = (id) => {
		setCart(prev => ({
			...prev,
			[id]: (prev[id] || 0) + 1
		}));
	};

	const removeFromCart = (id) => {
		setCart(prev => {
			const updated = { ...prev };
			if (updated[id] > 1) updated[id]--;
			else delete updated[id];
			return updated;
		});
	};

	const handleSubmit = async () => {
		const items = Object.entries(cart).flatMap(
			([id, qty]) => Array(qty).fill(parseInt(id))
		);
		const result = await orderItems(items);
		setSummary(result.data);
		setCart({});
	};

	const closeSummary = () => {
		setSummary(null);
	};

	return (
		<div className="pb-24 py-5">
			<h1 className="text-3xl text-center font-bold">MENU WARUNG RAMES BU NAP</h1>
			<div className="border-2 rounded w-16 text-red-700 mb-5 mx-auto mt-1"></div>

			<section className="mb-10">
				<h2 className="px-5 text-2xl mb-4 max-w-5xl mx-auto">Makanan :</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-5 max-w-5xl mx-auto">
					{menu
						.filter(m => m.type === "food")
						.map(item => (
							<MenuItem
								key={item.id}
								item={item}
								onAdd={addToCart}
								onRemove={removeFromCart}
								cart={cart}
							/>
						))}
				</div>
			</section>

			<section className="mb-10">
				<h2 className="px-5 text-2xl mb-4  max-w-5xl mx-auto ">Minuman :</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-5 max-w-5xl mx-auto">
					{menu
						.filter(m => m.type === "beverage")
						.map(item => (
							<MenuItem
								key={item.id}
								item={item}
								onAdd={addToCart}
								onRemove={removeFromCart}
								cart={cart}
							/>
						))}
				</div>
			</section>

			<CartDrawer
				cart={cart}
				menu={menu}
				onAdd={addToCart}
				onRemove={removeFromCart}
				onSubmit={handleSubmit}
			/>

			<OrderSummary
				summary={summary}
				onClose={closeSummary}
			/>
		</div>

	);
}

export default App;
