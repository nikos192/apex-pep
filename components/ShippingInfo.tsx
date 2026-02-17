export function ShippingInfo() {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-lg p-6 md:p-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Shipping & Storage</h3>
      <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
        <div>
          <h4 className="font-semibold text-slate-900 mb-1">Shipping</h4>
          <p>
            Orders are securely packaged and shipped from Australia via standard courier. All products are supplied in
            lyophilized powder format for stability during transit.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 mb-1">Handling</h4>
          <p>
            Products should be handled according to standard laboratory protocols. Keep containers closed during storage
            and transport.
          </p>
        </div>
        <div>
          <h4 className="font-semibold text-slate-900 mb-1">Storage</h4>
          <p>
            Store in a cool, dry place away from direct light. Specific storage instructions are provided with each
            order.
          </p>
        </div>
      </div>
    </div>
  );
}
