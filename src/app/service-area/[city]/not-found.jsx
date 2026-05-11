import Link from "/src/components/Link.jsx";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F5EC]">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-primary mb-4">Service Area Not Found</h2>
        <p className="text-gray-600 mb-6">
          We couldn&apos;t find the service area you&apos;re looking for.
        </p>
        <div className="space-y-4">
          <Link 
            href="/" 
            className="block bg-primary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
          >
            Go to Homepage
          </Link>
          <Link 
            href="/service/residential" 
            className="block bg-tertiary text-white px-6 py-3 rounded-lg hover:bg-opacity-90 transition"
          >
            View All Services
          </Link>
        </div>
      </div>
    </div>
  );
}