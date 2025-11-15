// Input sanitization utilities
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input
  
  return input
    .trim()
    // Remove script tags and other dangerous HTML
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/<[^>]*>?/gm, '')
    // Limit length for security
    .substring(0, 1000)
}

// XSS protection - escape HTML
export const escapeHTML = (str) => {
  if (typeof str !== 'string') return str
  
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
}

// Enhanced email validation
export const validateEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  return emailRegex.test(email) && email.length <= 254
}

// Enhanced phone validation
export const validatePhone = (phone) => {
  const digits = phone.replace(/\D/g, '')
  return digits.length >= 10 && digits.length <= 15
}

// Password strength validation
export const validatePasswordStrength = (password) => {
  const requirements = {
    length: password.length >= 8,
    uppercase: /[A-Z]/.test(password),
    lowercase: /[a-z]/.test(password),
    number: /[0-9]/.test(password),
    special: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
  }
  
  const strengthScore = Object.values(requirements).filter(Boolean).length
  return {
    requirements,
    strengthScore,
    isStrong: strengthScore >= 4 // At least 4 out of 5 requirements
  }
}

// Rate limiting utility
export class RateLimiter {
  constructor(maxRequests, timeWindow) {
    this.maxRequests = maxRequests
    this.timeWindow = timeWindow
    this.requests = new Map()
  }

  isAllowed(key) {
    const now = Date.now()
    const userRequests = this.requests.get(key) || []
    
    // Remove old requests outside the time window
    const recentRequests = userRequests.filter(time => now - time < this.timeWindow)
    
    if (recentRequests.length >= this.maxRequests) {
      return false
    }
    
    recentRequests.push(now)
    this.requests.set(key, recentRequests)
    return true
  }
}

// Create rate limiter instance (5 requests per minute per user)
export const formSubmitLimiter = new RateLimiter(5, 60000)