/**
 * Basic UI Layout Component
 * Foundation layout matching landing page style for Phase 0
 */

import React from 'react'

interface BasicLayoutProps {
  children: React.ReactNode
  title?: string
}

export default function BasicLayout({ children, title }: BasicLayoutProps) {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">
              Compete
            </h1>
            {title && (
              <h2 className="text-lg font-semibold text-gray-700">
                {title}
              </h2>
            )}
          </div>
        </header>

        {/* Main Content */}
        <div className="max-w-4xl mx-auto">
          {children}
        </div>
      </div>
    </main>
  )
}