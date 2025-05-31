import { useRef } from 'react';
import html2canvas from 'html2canvas-pro';

function OrderSummary({ summary, onClose }) {
	const receiptRef = useRef(null);

	if (!summary) return null;

	const downloadReceipt = async () => {
		if (receiptRef.current) {
			try {
				const canvas = await html2canvas(receiptRef.current, {
					backgroundColor: '#ffffff',
					scale: 2,
					width: receiptRef.current.offsetWidth,
					height: receiptRef.current.offsetHeight,
					logging: false,
					useCORS: true
				});


				const link = document.createElement('a');
				link.download = `receipt-restoran-bunap-${new Date().getTime()}.png`;
				link.href = canvas.toDataURL('image/png', 1.0);
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			} catch (error) {
				console.error('error download:', error);
				alert('Gagal download stuk');
			}
		}
	};

	return (
		<div className="modal modal-open">
			<div className="modal-box max-w-xl h-9/10">

				<div className="alert alert-success mb-4">
					<div className="flex items-center">
						<svg className="w-6 h-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
							<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
						</svg>
						<span className="font-semibold">Pesanan Berhasil!</span>
					</div>
				</div>


				<div ref={receiptRef} data-receipt className="p-5 bg-white text-black font-sans">
					<div className="text-center mb-4">
						<h2 className="text-black text-2xl font-bold mb-2">
							Restoran Bu Nap
						</h2>
						<p className="text-gray-600 text-sm mb-1">
							Struk Pembayaran
						</p>
						<p className="text-gray-400 text-xs">
							{new Date().toLocaleString('id-ID')}
						</p>
					</div>

					<div className="border-t border-dashed border-gray-300 my-3"></div>

					<div className="space-y-2 mb-4">
						{summary.items.map((item, index) => (
							<div key={`${item.id}-${index}`} className="flex justify-between mb-2 text-sm">
								<div className="flex-1">
									<p className="font-medium text-black mb-0.5">
										{item.name}
									</p>
									<p className="text-xs text-gray-600">
										{item.type}
									</p>
								</div>
								<p className="font-semibold text-black">
									Rp {item.price.toLocaleString()}
								</p>
							</div>
						))}
					</div>

					<div className="border-t border-dashed border-gray-300 my-3"></div>

					<div className="text-sm mb-4">
						<div className="flex justify-between mb-1">
							<span className="text-gray-600">Subtotal</span>
							<span className="text-black">Rp {summary.subTotal.toLocaleString()}</span>
						</div>
						<div className="flex justify-between mb-1">
							<span className="text-gray-600">Pajak</span>
							<span className="text-black">Rp {summary.tax.toLocaleString()}</span>
						</div>
						<div className="flex justify-between mb-2">
							<span className="text-gray-600">Diskon</span>
							<span className="text-red-600">-Rp {summary.discount.toLocaleString()}</span>
						</div>
						<div className="border-t border-gray-300 my-2"></div>
						<div className="flex justify-between text-lg font-bold">
							<span className="text-black">Total</span>
							<span className="text-black">Rp {summary.total.toLocaleString()}</span>
						</div>
					</div>

					<div className="text-center mt-4 pt-3 border-t border-dashed border-gray-300">
						<p className="text-xs text-gray-600 mb-0.5">
							Terima kasih atas kunjunganya!
						</p>
						<p className="text-xs text-gray-600">
							Selamat makan-makan
						</p>
					</div>
				</div>


				<div className="modal-action flex flex-col">
					<button
						className="btn btn-primary btn-block"
						onClick={downloadReceipt}
					>
						Download Struk
					</button>
					<button
						className="btn w-full"
						onClick={onClose}
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
}

export default OrderSummary;

