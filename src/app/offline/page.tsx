import Link from "next/link";

export default function OfflinePage() {
  return (
    <div className="min-h-screen bg-saffron-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 md:p-12 rounded-3xl border border-saffron-200 text-center max-w-md shadow-lg space-y-4">
        <span className="text-6xl block mb-2">🌸</span>
        <h1 className="text-2xl font-display font-bold text-gray-900">
          You are Currently Offline
        </h1>
        <p className="text-xs text-gray-400 font-hindi">
          इंटरनेट कनेक्शन पुनः जुड़ने पर आपका कार्ट सुरक्षित रहेगा
        </p>
        <p className="text-sm text-gray-600 leading-relaxed">
          Please check your network connection. Your items in the FlowersOffers basket are saved locally on your device and will be ready when you reconnect!
        </p>
        <div className="pt-4">
          <Link href="/" className="btn-primary text-xs px-6 py-3">
            Retry Loading Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
