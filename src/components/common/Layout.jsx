import React from 'react'

export function Layout({ children, maxWidth = 'max-w-md', center = true }) {
  const containerClasses = center 
    ? "min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-gray-100 px-4 py-12"
    : "min-h-screen bg-gradient-to-br from-green-50 to-gray-100 px-4 py-12"

  return (
    <div className={containerClasses}>
      <div className={`${maxWidth} w-full`}>
        {children}
      </div>
    </div>
  )
}

export function Card({ children, className = '' }) {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-8 ${className}`}>
      {children}
    </div>
  )
}

export function Footer() {
  return (
    <p className="text-center text-sm text-gray-500 mt-8">
      © 2024 Government Complaints Portal. All rights reserved.
    </p>
  )
}

export function Divider() {
  return (
    <div className="mt-6 mb-6 flex items-center">
      <div className="flex-1 border-t border-gray-300"></div>
      <span className="px-4 text-sm text-gray-500">or</span>
      <div className="flex-1 border-t border-gray-300"></div>
    </div>
  )
}