export default function StorageInstructions() {
  return (
    <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">Storage & Handling</h3>
      <div className="text-sm text-slate-700 leading-relaxed space-y-3">
        <p>All peptides are supplied as lyophilized (freeze-dried) powder to ensure maximum stability during shipping and storage.</p>

        <div>
          <h4 className="font-semibold text-slate-900 mb-1">Before reconstitution:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Store in a refrigerator at 2–8°C</li>
            <li>Keep away from heat, light, and moisture</li>
            <li>Do not freeze unless long-term storage is required</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 mb-1">After reconstitution:</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>Store refrigerated at 2–8°C</li>
            <li>Use within 30 days for optimal stability</li>
            <li>Avoid repeated temperature fluctuations</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
