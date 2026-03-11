import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Competitive Intelligence That Actually Gets Used
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Stop drowning in data. Get actionable competitive insights that help B2B SaaS teams close more deals in 30 days or less.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link 
              href="/snapshot" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Try Free Snapshot Tool →
            </Link>
            <Link 
              href="#demo" 
              className="border border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              See How It Works
            </Link>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">5-Minute Setup</h3>
                <p className="text-gray-600">Add your competitors and get your first insights in minutes, not weeks.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Smart Alerts</h3>
                <p className="text-gray-600">Only get notified about changes that actually matter to your deals.</p>
              </div>
            </div>
            <div className="text-center">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Ready-to-Use Battlecards</h3>
                <p className="text-gray-600">Transform intelligence into sales tools your team will actually use.</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4">Unlike $30K+ Enterprise Solutions</h2>
            <p className="text-gray-600 mb-4">
              Compete delivers focused intelligence at $1K-$1.5K/month for teams who need results, not reports.
            </p>
            <p className="text-sm text-gray-500">
              "Every feature must directly impact revenue within 30 days or it shouldn't exist."
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}