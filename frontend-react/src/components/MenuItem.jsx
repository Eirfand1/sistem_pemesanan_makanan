function MenuItem({ item, onAdd, onRemove, cart }) {
	const quantity = cart[item.id] || 0;

	return (
		<div className="bg-white rounded-xl shadow-sm transition-shadow duration-200 overflow-hidden">
			<div className="relative">
				<img
					src={item.image}
					alt={item.name}
					className="w-full h-40 object-cover"
				/>
			</div>

			<div className="p-4">
				<h3 className="font-semibold text-gray-900 text-lg mb-1">{item.name}</h3>
				<p className="text-orange-600 font-bold text-xl mb-4">
					Rp {item.price.toLocaleString()}
				</p>

				{quantity === 0 ? (
					<button
						onClick={() => onAdd(item.id)}
						className="btn w-full rounded-xl"
					>
						Tambah
					</button>
				) : (
					<div className="flex items-center justify-center gap-4">
						<button
							onClick={() => onRemove(item.id)}
							className="btn btn-circle text-red-800"
						>
							−
						</button>
						<span className="font-bold text-xl text-gray-900 min-w-[2rem] text-center">
							{quantity}
						</span>
						<button
							onClick={() => onAdd(item.id)}
							className="btn btn-circle text-green-800"
						>
							+
						</button>
					</div>
				)}
			</div>
		</div>
	);
}

export default MenuItem;
