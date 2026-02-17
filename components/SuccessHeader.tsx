export default function SuccessHeader() {
  return (
    <div className="text-center mb-12">
      {/* Success Icon */}
      <div className="flex justify-center mb-6">
        <div className="w-16 h-16 bg-green-50 rounded-full flex items-center justify-center">
          <svg
            className="w-10 h-10 text-green-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      </div>

      {/* Success Text */}
      <h1 className="text-4xl font-bold text-slate-900 mb-2">Order Confirmed</h1>
      <p className="text-lg text-slate-600">
        Thank you. Your order has been successfully submitted. Please complete payment using the instructions below.
      </p>
    </div>
  );
}
