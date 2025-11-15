import React from 'react'

export function LoadingButton({ 
  isLoading, 
  children, 
  loadingText = 'Loading...', 
  className = '',
  ...props 
}) {
  return (
    <button
      {...props}
      disabled={isLoading}
      className={`w-full bg-[#255F38] hover:bg-[#1d4829] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 ${className}`}
    >
      {isLoading ? loadingText : children}
    </button>
  )
}