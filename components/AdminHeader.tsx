"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <header className="bg-white border-b border-slate-200">
      <div className="container-custom py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Apex Labs</h1>
          <p className="text-sm text-slate-600">Admin Dashboard</p>
        </div>

        <button
          onClick={handleLogout}
          className="px-4 py-2 text-sm font-medium text-slate-700 border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors"
        >
          Log Out
        </button>
      </div>
    </header>
  );
}
