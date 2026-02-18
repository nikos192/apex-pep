"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface StatusUpdateFormProps {
  orderNumber: string;
  currentStatus: string;
}

const STATUS_OPTIONS = ["pending", "paid", "shipped", "cancelled"];

export default function StatusUpdateForm({
  orderNumber,
  currentStatus,
}: StatusUpdateFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState(currentStatus);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setIsLoading(true);

    try {
      const response = await fetch(`/api/admin/orders/${orderNumber}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        // ensure cookies are sent and we bypass any browser cache for immediate consistency
        credentials: "same-origin",
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to update status");
        setIsLoading(false);
        return;
      }

      setSuccess("Order status updated successfully");
      setIsLoading(false);
      // Dispatch a global event so client lists can refresh immediately.
      // Include the updated order when available so listeners can update optimistically.
      try {
        if (typeof window !== "undefined") {
          window.dispatchEvent(
            new CustomEvent("order-updated", { detail: { orderNumber, status, order: data.order } })
          );
        }
      } catch (e) {
        // ignore
      }

      // Broadcast the updated order so other pages/tabs can sync immediately
      try {
        if (typeof window !== "undefined") {
          // localStorage fallback (read by orders list on mount)
          localStorage.setItem(
            "order-updated",
            JSON.stringify({ orderNumber, status, order: data.order })
          );

          // BroadcastChannel for same-origin tabs/pages
          try {
            const bc = new BroadcastChannel("orders");
            bc.postMessage({ orderNumber, status, order: data.order });
            bc.close();
          } catch (e) {
            // ignore if BroadcastChannel unsupported
          }
        }
      } catch (e) {
        // ignore storage errors
      }

      // Navigate back to orders list so the admin sees the updated list
      router.push("/admin/orders");
    } catch (err) {
      setError("An error occurred while updating status");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg border border-slate-200 p-6 mb-6">
      <h2 className="text-xl font-bold text-slate-900 mb-4">Update Order Status</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <label
            htmlFor="status"
            className="block text-sm font-medium text-slate-700 mb-2"
          >
            Status
          </label>
          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            disabled={isLoading}
            className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-slate-50 disabled:text-slate-500"
          >
            {STATUS_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option.charAt(0).toUpperCase() + option.slice(1)}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button
            type="submit"
            disabled={isLoading || status === currentStatus}
            className="w-full sm:w-auto bg-blue-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>

      {error && (
        <div className="mt-4 bg-red-50 border border-red-200 rounded-lg p-3">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {success && (
        <div className="mt-4 bg-green-50 border border-green-200 rounded-lg p-3">
          <p className="text-sm text-green-700">{success}</p>
        </div>
      )}
    </form>
  );
}
