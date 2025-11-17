import React, { useState, useCallback, useMemo } from 'react'
import axios from 'axios'
import { block } from 'million/react'
import { LoadingButton } from '../common/LoadingButton'
import { 
  sanitizeInput, 
  validateEmail, 
  formSubmitLimiter
} from '../../utils/security'

const api = axios.create({
  baseURL: '/api', 
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
  },
})

const LoginForm = block(function LoginForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [errors, setErrors] = useState({})
  const [showPassword, setShowPassword] = useState(false)
  const [lastSubmitTime, setLastSubmitTime] = useState(0)

  const validateForm = useCallback(() => {
    const newErrors = {}
    
    const sanitizedEmail = sanitizeInput(formData.email)
    if (!sanitizedEmail) {
      newErrors.email = 'Email is required'
    } else if (!validateEmail(sanitizedEmail)) {
      newErrors.email = 'Invalid email address'
    }
    
    const sanitizedPassword = sanitizeInput(formData.password)
    if (!sanitizedPassword) {
      newErrors.password = 'Password is required'
    } else if (sanitizedPassword.length < 6) {
      newErrors.password = 'Password must be at least 6 characters'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [formData.email, formData.password])

  // API login function - using proxy
  const handleLoginAPI = useCallback(async () => {
    try {
      console.log('📝 Making API call to login via proxy:', {
        email: formData.email.substring(0, 3) + '...',
        hasPassword: !!formData.password
      })

      // Make the actual login request through proxy
      const response = await api.post('/v1/auth/login/', {
        email: formData.email,
        password: formData.password
      })

      console.log('✅ Login successful:', response.data)

      // Handle successful login
      const { token, user, refresh_token } = response.data
      
      // Store tokens
      localStorage.setItem('access_token', token)
      localStorage.setItem('refresh_token', refresh_token)
      localStorage.setItem('user', JSON.stringify(user))

      // Set default authorization header for future requests
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      // Clear any existing errors
      setErrors({})

      // Success message or redirect
      alert('Login successful!')
      
      return { success: true, data: response.data }

    } catch (error) {
      console.error('❌ Login failed:', error)
      
      let errorMessage = 'Login failed. Please try again.'
      
      if (error.code === 'ERR_NETWORK') {
        errorMessage = `Network Error: Cannot connect to server.\n\nPlease ensure:\n\n• Django server is running: python manage.py runserver\n• Server is accessible at http://localhost:8000\n• Check Django terminal for errors`
      } else if (error.response) {
        const { status, data } = error.response
        
        switch (status) {
          case 400:
            errorMessage = data.message || data.detail || 'Invalid email or password format'
            break
          case 401:
            errorMessage = data.message || data.detail || 'Invalid email or password'
            break
          case 403:
            errorMessage = 'Access forbidden. Check CORS configuration.'
            break
          case 404:
            errorMessage = 'API endpoint not found. Check if /api/v1/auth/login/ exists.'
            break
          case 405:
            errorMessage = 'Method not allowed.'
            break
          case 415:
            errorMessage = 'Unsupported media type.'
            break
          case 500:
            errorMessage = 'Server error. Check Django logs.'
            break
          default:
            errorMessage = data.message || data.detail || `Error ${status}`
        }
        
        console.log('Backend response:', data)
      } else if (error.request) {
        errorMessage = 'No response received from server.'
      }

      setErrors({ general: errorMessage })
      return { success: false, error: errorMessage }
    }
  }, [formData.email, formData.password])

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault()
    
    // Rate limiting check
    const now = Date.now()
    if (now - lastSubmitTime < 2000) {
      setErrors({ general: 'Please wait before submitting again' })
      return
    }

    // Client-side rate limiting
    const userKey = formData.email || 'anonymous'
    if (!formSubmitLimiter.isAllowed(userKey)) {
      setErrors({ general: 'Too many attempts. Please try again later.' })
      return
    }

    if (validateForm()) {
      setIsLoading(true)
      setLastSubmitTime(now)
      
      // Clear previous errors
      setErrors({})
      
      // Call the API function
      await handleLoginAPI()
      
      setIsLoading(false)
    }
  }, [formData, lastSubmitTime, validateForm, handleLoginAPI])

  const handleChange = useCallback((e) => {
    const { name, value } = e.target
    const sanitizedValue = sanitizeInput(value)
    
    setFormData(prev => ({
      ...prev,
      [name]: sanitizedValue
    }))
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
    
    // Clear general error when user starts typing
    if (errors.general) {
      setErrors(prev => ({
        ...prev,
        general: ''
      }))
    }
  }, [errors])

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword(!showPassword)
  }, [showPassword])

  // Memoized form rendering for performance
  const formFields = useMemo(() => (
    <>
      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#255F38] focus:border-transparent ${
            errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
          }`}
          placeholder="john.doe@example.com"
          maxLength={254}
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <span className="mr-1">•</span>
            {errors.email}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#255F38] focus:border-transparent ${
              errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="••••••••"
            maxLength={100}
            autoComplete="current-password"
          />
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
              </svg>
            )}
          </button>
        </div>
        {errors.password && (
          <p className="text-red-500 text-sm mt-1 flex items-center">
            <span className="mr-1">•</span>
            {errors.password}
          </p>
        )}
      </div>
    </>
  ), [formData, errors, showPassword, handleChange, togglePasswordVisibility])

  return (
    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
      {errors.general && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm text-center whitespace-pre-line">{errors.general}</p>
        </div>
      )}
      
      {formFields}

      <div className="flex items-center justify-between">
        <label className="flex items-center">
          <input 
            type="checkbox" 
            className="w-4 h-4 text-[#255F38] border-gray-300 rounded focus:ring-[#255F38]" 
          />
          <span className="ml-2 text-sm text-gray-600">Remember me</span>
        </label>
        <button 
          type="button" 
          className="text-sm text-[#255F38] hover:text-[#1d4829] font-medium transition-colors"
        >
          Forgot password?
        </button>
      </div>

      <LoadingButton
        id="Login"
        type="submit"
        isLoading={isLoading}
        loadingText="Signing in..."
        className="w-full bg-[#255F38] hover:bg-[#1d4829] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
      >
        Sign In
      </LoadingButton>
    </form>
  )
})

export default LoginForm