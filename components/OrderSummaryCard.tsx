interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderSummaryCardProps {
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  total: number;
}

export default function OrderSummaryCard({
  items,
  subtotal,
  shipping,
  total,
}: OrderSummaryCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Order Details</h2>

      {/* Items Table */}
      <div className="overflow-x-auto mb-8">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200">
              <th className="text-left py-4 px-0 font-semibold text-slate-900">Product</th>
              <th className="text-right py-4 px-4 font-semibold text-slate-900">Quantity</th>
              <th className="text-right py-4 px-0 font-semibold text-slate-900">Price</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index} className="border-b border-slate-100">
                <td className="py-4 px-0 text-slate-700">{item.name}</td>
                <td className="text-right py-4 px-4 text-slate-700">{item.quantity}</td>
                <td className="text-right py-4 px-0 font-medium text-slate-900">
                  ${(item.price * item.quantity).toFixed(2)} AUD
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="space-y-3 border-t border-slate-200 pt-6">
        <div className="flex justify-between">
          <span className="text-slate-600">Subtotal</span>
          <span className="text-slate-900 font-medium">${subtotal.toFixed(2)} AUD</span>
        </div>
        <div className="flex justify-between">
          <span className="text-slate-600">Shipping</span>
          <span className="text-slate-900 font-medium">${shipping.toFixed(2)} AUD</span>
        </div>
        <div className="flex justify-between text-lg border-t border-slate-200 pt-3">
          <span className="font-semibold text-slate-900">Total</span>
          <span className="font-bold text-slate-900">${total.toFixed(2)} AUD</span>
        </div>
      </div>
    </div>
  );
}
