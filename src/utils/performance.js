// Performance monitoring
export const measurePerformance = (name, fn) => {
  const startTime = performance.now()
  const result = fn()
  const endTime = performance.now()
  
  if (import.meta.env.VITE_NODE_ENV === 'development') {
    console.log(`⏱️ ${name} took ${endTime - startTime}ms`)
  }
  
  return result
}

// Debounce function for performance
export const debounce = (func, wait) => {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for performance
export const throttle = (func, limit) => {
  let inThrottle
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}