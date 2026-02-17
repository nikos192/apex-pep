interface BankDetailsCardProps {
  orderNumber: string;
  total: string;
}

export default function BankDetailsCard({ orderNumber, total }: BankDetailsCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-900 mb-6">Bank Transfer Instructions</h2>

      <p className="text-slate-600 mb-8">
        To complete your order, please transfer the exact total amount using the bank details below. Your order will be processed once payment is received and verified.
      </p>

      {/* Instructions List */}
      <div className="mb-8 space-y-3">
        <div className="flex gap-3">
          <span className="text-slate-400 flex-shrink-0">•</span>
          <span className="text-slate-700">Transfer the exact total amount shown above: <strong>{total}</strong></span>
        </div>
        <div className="flex gap-3">
          <span className="text-slate-400 flex-shrink-0">•</span>
          <span className="text-slate-700">Use your Order Number as the payment reference: <strong>{orderNumber}</strong></span>
        </div>
        <div className="flex gap-3">
          <span className="text-slate-400 flex-shrink-0">•</span>
          <span className="text-slate-700">Ensure account number and BSB match exactly</span>
        </div>
      </div>

      {/* Bank Details Card */}
      <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 mb-8">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Account Name</p>
            <p className="text-lg font-semibold text-slate-900">Apex Labs Australia</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Account Number</p>
            <p className="text-lg font-semibold text-slate-900 font-mono">25422126</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">BSB</p>
            <p className="text-lg font-semibold text-slate-900 font-mono">067872</p>
          </div>
          <div>
            <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">Payment Reference</p>
            <p className="text-lg font-semibold text-slate-900">{orderNumber}</p>
          </div>
        </div>
      </div>

      {/* Processing Notice */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-slate-900 mb-2">Processing Notice</h3>
        <p className="text-slate-700">
          Orders are typically processed within 1–2 business days after payment confirmation.
        </p>
      </div>
    </div>
  );
}
