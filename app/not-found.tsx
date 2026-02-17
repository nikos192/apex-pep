import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-brand-50">
      <div className="container-custom text-center">
        <h1 className="text-6xl font-bold text-brand-900 mb-4">404</h1>
        <h2 className="text-3xl font-bold text-brand-900 mb-4">Page Not Found</h2>
        <p className="text-lg text-brand-700 mb-8 max-w-2xl mx-auto">
          The page you're looking for doesn't exist. Please check the URL or navigate back to home.
        </p>
        <Link href="/" className="btn-primary">
          Return to Home
        </Link>
      </div>
    </div>
  );
}
