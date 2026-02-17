import { createSupabaseServerClient } from "@/lib/supabaseServer";
import Link from "next/link";
import AdminHeader from "@/components/AdminHeader";
import OrderDetailCard from "@/components/OrderDetailCard";
import StatusUpdateForm from "@/components/StatusUpdateForm";

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  country: string;
  address1: string;
  address2: string;
  suburb: string;
  state: string;
  postcode: string;
  note: string;
  payment_method: string;
  status: string;
  items: any[];
  subtotal: number;
  shipping: number;
  total: number;
}

export default async function OrderDetailPage({
  params,
}: {
  params: { orderNumber: string };
}) {
  const supabase = createSupabaseServerClient();

  let order: Order | null = null;
  let error: string | null = null;

  try {
    const { data, error: fetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("order_number", params.orderNumber)
      .single();

    if (fetchError) {
      error = `Order not found: ${fetchError.message}`;
      console.error("[OrderDetail] Supabase error:", fetchError);
      if (fetchError.details && fetchError.details.includes("getaddrinfo")) {
        error += " — Check NEXT_PUBLIC_SUPABASE_URL in your environment variables.";
      }
    } else {
      order = data;
    }
  } catch (err: any) {
    console.error("[OrderDetail] Error:", err);
    error = String(err?.message || err) || "An error occurred while fetching the order";
    if (error.includes("Missing Supabase environment variables")) {
      error += " — Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set.";
    }
  }

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50">
        <AdminHeader />

        <main className="container-custom py-8">
          <div className="max-w-3xl mx-auto">
            <Link
              href="/admin/orders"
              className="text-blue-600 hover:text-blue-700 mb-6 inline-block"
            >
              ← Back to Orders
            </Link>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <main className="container-custom py-8">
        <div className="max-w-3xl mx-auto">
          {/* Back Link */}
          <Link
            href="/admin/orders"
            className="text-blue-600 hover:text-blue-700 mb-6 inline-block"
          >
            ← Back to Orders
          </Link>

          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">
              {order.order_number}
            </h1>
            <p className="text-slate-600">
              {formatDate(order.created_at)}
            </p>
          </div>

          {/* Status Update Form */}
          <StatusUpdateForm
            orderNumber={order.order_number}
            currentStatus={order.status}
          />

          {/* Customer Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <OrderDetailCard
              title="Customer Details"
              items={[
                { label: "Name", value: `${order.first_name} ${order.last_name}` },
                { label: "Email", value: order.email },
                { label: "Phone", value: order.phone },
              ]}
            />

            <OrderDetailCard
              title="Shipping Address"
              items={[
                { label: "Address", value: order.address1 },
                ...(order.address2 ? [{ label: "Address 2", value: order.address2 }] : []),
                { label: "Suburb", value: order.suburb },
                { label: "State", value: order.state },
                { label: "Postcode", value: order.postcode },
                { label: "Country", value: order.country },
              ]}
            />
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Items</h2>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left py-3 px-0 font-semibold text-slate-900">
                      Product
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-900">
                      Qty
                    </th>
                    <th className="text-right py-3 px-4 font-semibold text-slate-900">
                      Price
                    </th>
                    <th className="text-right py-3 px-0 font-semibold text-slate-900">
                      Total
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index} className="border-b border-slate-100">
                      <td className="py-3 px-0 text-slate-700">{item.name}</td>
                      <td className="text-right py-3 px-4 text-slate-700">
                        {item.quantity}
                      </td>
                      <td className="text-right py-3 px-4 text-slate-700">
                        ${item.price.toFixed(2)} AUD
                      </td>
                      <td className="text-right py-3 px-0 font-medium text-slate-900">
                        ${(item.price * item.quantity).toFixed(2)} AUD
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals */}
            <div className="mt-6 pt-6 border-t border-slate-200 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span className="text-slate-900 font-medium">
                  ${order.subtotal.toFixed(2)} AUD
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600">Shipping</span>
                <span className="text-slate-900 font-medium">
                  ${order.shipping.toFixed(2)} AUD
                </span>
              </div>
              <div className="flex justify-between text-lg border-t border-slate-200 pt-2">
                <span className="font-semibold text-slate-900">Total</span>
                <span className="font-bold text-blue-600">
                  ${order.total.toFixed(2)} AUD
                </span>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <OrderDetailCard
              title="Payment"
              items={[
                { label: "Method", value: order.payment_method },
                { label: "Status", value: order.status },
              ]}
            />

            {order.note && (
              <div className="bg-white rounded-lg border border-slate-200 p-6">
                <h3 className="font-semibold text-slate-900 mb-2">Order Note</h3>
                <p className="text-slate-700">{order.note}</p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
