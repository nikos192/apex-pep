"use client";

import Link from "next/link";

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  email: string;
  total: number;
  status: string;
}

interface OrdersTableProps {
  orders: Order[];
}

const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  pending: { bg: "bg-yellow-50", text: "text-yellow-700" },
  paid: { bg: "bg-green-50", text: "text-green-700" },
  shipped: { bg: "bg-blue-50", text: "text-blue-700" },
  cancelled: { bg: "bg-red-50", text: "text-red-700" },
};

export default function OrdersTable({ orders }: OrdersTableProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50">
              <th className="px-6 py-4 text-left font-semibold text-slate-900 text-sm">
                Order #
              </th>
              <th className="px-6 py-4 text-left font-semibold text-slate-900 text-sm">
                Customer
              </th>
              <th className="px-6 py-4 text-left font-semibold text-slate-900 text-sm">
                Date
              </th>
              <th className="px-6 py-4 text-right font-semibold text-slate-900 text-sm">
                Total
              </th>
              <th className="px-6 py-4 text-left font-semibold text-slate-900 text-sm">
                Status
              </th>
              <th className="px-6 py-4 text-right font-semibold text-slate-900 text-sm">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => {
              const colors = STATUS_COLORS[order.status] || {
                bg: "bg-gray-50",
                text: "text-gray-700",
              };
              return (
                <tr
                  key={order.id}
                  className={`border-b border-slate-100 ${index % 2 === 0 ? "bg-white" : "bg-slate-50/50"}`}
                >
                  <td className="px-6 py-4 font-mono font-semibold text-slate-900">
                    {order.order_number}
                  </td>
                  <td className="px-6 py-4 text-slate-700">{order.email}</td>
                  <td className="px-6 py-4 text-slate-700 text-sm">
                    {formatDate(order.created_at)}
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-slate-900">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${colors.bg} ${colors.text}`}
                    >
                      {order.status.charAt(0).toUpperCase() +
                        order.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/admin/orders/${order.order_number}`}
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      View
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden divide-y divide-slate-200">
        {orders.map((order) => {
          const colors = STATUS_COLORS[order.status] || {
            bg: "bg-gray-50",
            text: "text-gray-700",
          };
          return (
            <div key={order.id} className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <p className="font-mono font-semibold text-slate-900">
                    {order.order_number}
                  </p>
                  <p className="text-sm text-slate-600">{order.email}</p>
                </div>
                <span
                  className={`inline-block px-2 py-1 rounded text-xs font-medium ${colors.bg} ${colors.text}`}
                >
                  {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                </span>
              </div>

              <div className="flex justify-between items-center text-sm text-slate-600 mb-3">
                <span>{formatDate(order.created_at)}</span>
                <span className="font-semibold text-slate-900">
                  ${order.total.toFixed(2)}
                </span>
              </div>

              <Link
                href={`/admin/orders/${order.order_number}`}
                className="text-blue-600 hover:text-blue-700 font-medium text-sm"
              >
                View Details →
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
