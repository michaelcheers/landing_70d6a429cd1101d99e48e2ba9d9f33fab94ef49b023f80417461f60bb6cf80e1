import React from 'react';
import Link from "/src/components/Link.jsx";
import { TORONTO_CONFIG, VANCOUVER_CONFIG } from '/src/app/utils/metadata.js';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
        <p className="text-xl text-gray-600 mb-8">
          Sorry, we couldn&apos;t find the page you&apos;re looking for.
        </p>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h3 className="text-2xl font-bold text-[#34A853] mb-4">Need Moving Services?</h3>
          <p className="text-lg text-gray-700 mb-6">
            Contact Moving Papa for professional moving services in Toronto and Vancouver
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-600 mb-2">Toronto</p>
              <a href={`tel:${TORONTO_CONFIG.phoneNumber}`} className="text-3xl font-bold text-[#34A853]">
                {TORONTO_CONFIG.phoneNumber}
              </a>
            </div>
            <div className="pt-4 border-t border-gray-200">
              <p className="text-sm text-gray-600 mb-2">Vancouver</p>
              <a href={`tel:${VANCOUVER_CONFIG.phoneNumber}`} className="text-3xl font-bold text-[#34A853]">
                {VANCOUVER_CONFIG.phoneNumber}
              </a>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <Link href="/" className="inline-block px-8 py-3 bg-[#34A853] text-white font-semibold rounded-lg">
            Return to Home
          </Link>
          <div className="flex justify-center gap-4 text-sm">
            <Link href="/service/residential" className="text-[#34A853] hover:underline">Residential Moving</Link>
            <span className="text-gray-400">|</span>
            <Link href="/commercial" className="text-[#34A853] hover:underline">Commercial Moving</Link>
            <span className="text-gray-400">|</span>
            <Link href="/company" className="text-[#34A853] hover:underline">Contact Us</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
