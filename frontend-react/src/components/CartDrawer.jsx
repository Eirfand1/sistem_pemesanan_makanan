import React, { useState } from 'react';

function CartDrawer({ cart = {}, menu = [], onAdd, onRemove, onSubmit }) {
	const [isExpanded, setIsExpanded] = useState(false);

	const cartItems = Object.entries(cart)
		.map(([id, qty]) => {
			const item = menu.find(item => item.id === Number(id));
			if (!item) return null;
			return {
				...item,
				quantity: qty
			};
		})
		.filter(Boolean);

	const total = cartItems.reduce(
		(sum, item) => sum + item.price * item.quantity,
		0
	);

	const totalItems = cartItems.reduce(
		(sum, item) => sum + item.quantity,
		0
	);

	const toggleExpanded = () => {
		setIsExpanded(!isExpanded);
	};

	return (
		<>

			{isExpanded && (
				<div
					className="fixed inset-0 bg-black bg-gray-800/50 z-40"
					onClick={() => setIsExpanded(false)}
				/>
			)}


			<div className={`fixed bottom-0 left-0 right-0 bg-white rounded-t-xl max-w-5xl  mx-auto shadow-lg transform transition-transform duration-300 ease-in-out z-50 ${isExpanded ? 'translate-y-0' : 'translate-y-[calc(100%-80px)]'
				}`}>


				<div
					className="bg-yellow-400 px-4 py-4 cursor-pointer flex rounded-t-xl items-center justify-between"
					onClick={toggleExpanded}
				>
					<div className="flex items-center space-x-1">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
							<circle cx="9" cy="21" r="1"></circle>
							<circle cx="20" cy="21" r="1"></circle>
							<path d="m1 1 4 4 2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
						</svg>
						<span className="font-semibold">
							Keranjang
						</span>
						{totalItems > 0 && (
							<span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 font-bold">
								{totalItems > 99 ? '99+' : totalItems}
							</span>
						)}
					</div>

					<div className="flex items-center space-x-2">
						{totalItems > 0 && (
							<span className="font-bold">Rp{total.toLocaleString()}</span>
						)}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="20"
							height="20"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className={`transform transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
						>
							<polyline points="18,15 12,9 6,15"></polyline>
						</svg>
					</div>
				</div>


				<div className="max-h-96 overflow-y-auto p-4">
					<h3 className="font-bold text-lg mb-2">Detail Keranjang</h3>

					{cartItems.length === 0 ? (
						<div className="text-center py-8 text-gray-500">

							<p>Keranjang masih kosong</p>
							<p>Silahkan tambahkan menu ke keranjang</p>
						</div>
					) : (
						<>
							<div className="space-y-3 mb-6">
								{cartItems.map(item => (
									<div key={item.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
										<div className="flex-1">
											<h4 className="font-medium">{item.name}</h4>
											<p className="text-sm text-gray-600">Rp{item.price.toLocaleString()}</p>
										</div>
										<div className="flex items-center space-x-2">
											<button
												onClick={() => onRemove(item.id)}
												className="btn btn-sm text-white rounded-full btn-error"
											>
												-
											</button>
											<span className="w-8 text-center font-medium">{item.quantity}</span>
											<button
												onClick={() => onAdd(item.id)}
												className="btn btn-sm text-white rounded-full btn-success"
											>
												+
											</button>
										</div>
									</div>
								))}
							</div>


							<div className="border-t border-gray-300 pt-4">
								<div className="flex justify-between items-center mb-1">
									<span className="font-semibold">Sub Total:</span>
									<span className="font-semibold">Rp{total.toLocaleString()}</span>
								</div>

								<div className="flex justify-between items-center mb-1">
									<span>Pajak:</span>
									<span>Rp{(total * 0.10).toLocaleString()}</span>
								</div>

								<div className="flex justify-between items-center mb-1">
									<span>
										Diskon
										<br />
										<span className="text-xs text-gray-600">
											(10%, pembelian &gt; Rp50.000)
										</span>
									</span>
									<span>
										Rp{(total > 50000 ? total * 0.10 : 0).toLocaleString()}
									</span>
								</div>

								<div className="flex justify-between items-center mb-1">
									<span className="text-lg font-semibold">Total:</span>
									<span className="text-xl font-bold">
										Rp{(total + total * 0.10 - (total > 50000 ? total * 0.10 : 0)).toLocaleString()}
									</span>
								</div>

								<div className="space-x-3 mt-3">
									<button
										onClick={() => {
											const confirm = window.confirm("Pastikan pesanan sudah sesuai");
											if (confirm) onSubmit();
										}}
										className="btn btn-info w-full rounded-xl text-white"
									>
										Pesan Sekarang
									</button>
								</div>
							</div>

						</>
					)}
				</div>
			</div>
		</>
	);
}

export default CartDrawer;
