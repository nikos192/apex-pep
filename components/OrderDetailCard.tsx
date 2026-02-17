interface DetailItem {
  label: string;
  value: string;
}

interface OrderDetailCardProps {
  title: string;
  items: DetailItem[];
}

export default function OrderDetailCard({ title, items }: OrderDetailCardProps) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-6">
      <h3 className="font-semibold text-slate-900 mb-4">{title}</h3>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={index}>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wide mb-1">
              {item.label}
            </p>
            <p className="text-slate-900">{item.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
