// import React, { useState } from 'react'
// import { block } from 'million/react'
// import { LoadingButton } from '../common/LoadingButton'

// const RegisterForm = block(function RegisterForm({ setCurrentPage }) {
//   const [isLoading, setIsLoading] = useState(false)
//   const [showPassword, setShowPassword] = useState(false)
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false)
//   const [formData, setFormData] = useState({
//     fullName: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//     agreeToTerms: false
//   })
//   const [errors, setErrors] = useState({})

//   const validateForm = () => {
//     const newErrors = {}
    
//     // Full Name validation
//     if (!formData.fullName.trim()) {
//       newErrors.fullName = 'Full name is required'
//     } else if (formData.fullName.length < 3) {
//       newErrors.fullName = 'Full name must be at least 3 characters'
//     }
    
//     // Email validation
//     if (!formData.email) {
//       newErrors.email = 'Email is required'
//     } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
//       newErrors.email = 'Invalid email address'
//     }
    
//     // Phone validation
//     if (!formData.phone) {
//       newErrors.phone = 'Phone number is required'
//     } else if (formData.phone.replace(/\D/g, '').length < 10) {
//       newErrors.phone = 'Phone number must be at least 10 digits'
//     }
    
//     // Password validation
//     if (!formData.password) {
//       newErrors.password = 'Password is required'
//     } else if (formData.password.length < 8) {
//       newErrors.password = 'Password must be at least 8 characters'
//     } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) {
//       newErrors.password = 'Password must contain both uppercase and lowercase letters'
//     }
    
//     // Confirm Password validation
//     if (!formData.confirmPassword) {
//       newErrors.confirmPassword = 'Confirm password is required'
//     } else if (formData.password !== formData.confirmPassword) {
//       newErrors.confirmPassword = 'Passwords must match'
//     }
    
//     // Terms agreement validation
//     if (!formData.agreeToTerms) {
//       newErrors.agreeToTerms = 'You must agree to the terms and conditions'
//     }
    
//     setErrors(newErrors)
//     return Object.keys(newErrors).length === 0
//   }

//   const handleSubmit = (e) => {
//     e.preventDefault()
    
//     if (validateForm()) {
//       setIsLoading(true)
//       console.log('✅ Form submitted successfully!')
//       console.log('📝 Submitted data:', formData)
      
//       // Simulate API call
//       setTimeout(() => {
//         setIsLoading(false)
//         alert(`Registration successful!\n\nWelcome ${formData.fullName}!`)
//         setCurrentPage('login')
//       }, 1500)
//     }
//   }

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target
//     setFormData(prev => ({
//       ...prev,
//       [name]: type === 'checkbox' ? checked : value
//     }))
//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors(prev => ({
//         ...prev,
//         [name]: ''
//       }))
//     }
//   }

//   const togglePasswordVisibility = () => {
//     setShowPassword(!showPassword)
//   }

//   const toggleConfirmPasswordVisibility = () => {
//     setShowConfirmPassword(!showConfirmPassword)
//   }

//   return (
//     <form onSubmit={handleSubmit} className="space-y-6" noValidate>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//         {/* Full Name */}
//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
//           <input
//             type="text"
//             name="fullName"
//             value={formData.fullName}
//             onChange={handleChange}
//             className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#255F38] focus:border-transparent ${
//               errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-300'
//             }`}
//             placeholder="John Doe"
//           />
//           {errors.fullName && (
//             <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
//           )}
//         </div>

//         {/* Email */}
//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
//           <input
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#255F38] focus:border-transparent ${
//               errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
//             }`}
//             placeholder="john.doe@example.com"
//           />
//           {errors.email && (
//             <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//           )}
//         </div>

//         {/* Phone */}
//         <div className="md:col-span-2">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
//           <input
//             type="tel"
//             name="phone"
//             value={formData.phone}
//             onChange={handleChange}
//             className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#255F38] focus:border-transparent ${
//               errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
//             }`}
//             placeholder="+1234567890"
//           />
//           {errors.phone && (
//             <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
//           )}
//         </div>

//         {/* Password */}
//         <div className="relative">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
//           <div className="relative">
//             <input
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#255F38] focus:border-transparent ${
//                 errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
//               }`}
//               placeholder="••••••••"
//             />
//             <button
//               type="button"
//               onClick={togglePasswordVisibility}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//             >
//               {showPassword ? (
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                 </svg>
//               ) : (
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                 </svg>
//               )}
//             </button>
//           </div>
//           {errors.password && (
//             <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//           )}
//         </div>

//         {/* Confirm Password */}
//         <div className="relative">
//           <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
//           <div className="relative">
//             <input
//               type={showConfirmPassword ? "text" : "password"}
//               name="confirmPassword"
//               value={formData.confirmPassword}
//               onChange={handleChange}
//               className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#255F38] focus:border-transparent ${
//                 errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
//               }`}
//               placeholder="••••••••"
//             />
//             <button
//               type="button"
//               onClick={toggleConfirmPasswordVisibility}
//               className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
//             >
//               {showConfirmPassword ? (
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                 </svg>
//               ) : (
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                 </svg>
//               )}
//             </button>
//           </div>
//           {errors.confirmPassword && (
//             <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
//           )}
//         </div>
//       </div>

//       {/* Password Requirements */}
//       <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
//         <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
//         <ul className="text-sm text-gray-600 space-y-1">
//           <li className={`flex items-center ${formData.password.length >= 8 ? 'text-[#255F38]' : 'text-gray-600'}`}>
//             <svg className={`w-4 h-4 mr-2 ${formData.password.length >= 8 ? 'text-[#255F38]' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//             </svg>
//             At least 8 characters
//           </li>
//           <li className={`flex items-center ${/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'text-[#255F38]' : 'text-gray-600'}`}>
//             <svg className={`w-4 h-4 mr-2 ${/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'text-[#255F38]' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
//               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//             </svg>
//             Contains uppercase and lowercase letters
//           </li>
//         </ul>
//       </div>
      
//       {/* Terms Agreement */}
//       <div>
//         <label className="flex items-start">
//           <input 
//             type="checkbox" 
//             name="agreeToTerms"
//             checked={formData.agreeToTerms}
//             onChange={handleChange}
//             className="w-4 h-4 mt-1 text-[#255F38] border-gray-300 rounded focus:ring-[#255F38]" 
//           />
//           <span className="ml-2 text-sm text-gray-600">
//             I agree to the Terms and Conditions and Privacy Policy
//           </span>
//         </label>
//         {errors.agreeToTerms && (
//           <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>
//         )}
//       </div>

//       <LoadingButton
//         type="submit"
//         isLoading={isLoading}
//         id="Register"
//         loadingText="Creating account..."
//         className="w-full bg-[#255F38] hover:bg-[#1d4829] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
//       >
//         Create Account
//       </LoadingButton>
//     </form>
//   )
// })

// export default RegisterForm
import React, { useState } from 'react'
import axios from 'axios'
import { block } from 'million/react'
import { LoadingButton } from '../common/LoadingButton'

// Create axios instance with base configuration
const api = axios.create({
  baseURL:'http://127.0.0.1:8000',
  timeout: 1000,
  headers: {
    'Content-Type': 'application/json',
  }
})

const RegisterForm = block(function RegisterForm({ setCurrentPage }) {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  })
  const [errors, setErrors] = useState({})

  const validateForm = () => {
    const newErrors = {}
    
    // Full Name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (formData.fullName.length < 3) {
      newErrors.fullName = 'Full name must be at least 3 characters'
    }
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required'
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email address'
    }
    
    // Phone validation
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required'
    } else if (formData.phone.replace(/\D/g, '').length < 10) {
      newErrors.phone = 'Phone number must be at least 10 digits'
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required'
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters'
    } else if (!/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password)) {
      newErrors.password = 'Password must contain both uppercase and lowercase letters'
    }
    
    // Confirm Password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm password is required'
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords must match'
    }
    
    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = 'You must agree to the terms and conditions'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleRegisterAPI = async () => {
    try {
      console.log('📝 Making API call to register:', {
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        hasPassword: !!formData.password
      })

      // Prepare data for backend (adjust field names based on your API requirements)
      const registrationData = {
        name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        // Add any other required fields your backend expects
      }

      const response = await api.post('/api/v1/auth/register/', registrationData)

      console.log('✅ Registration successful:', response.data)

      // Handle successful registration
      const { token, user, refresh_token, message } = response.data
      
      // Store tokens if provided
      if (token) {
        localStorage.setItem('access_token', token)
        localStorage.setItem('refresh_token', refresh_token || '')
        localStorage.setItem('user', JSON.stringify(user))
        
        // Set default authorization header for future requests
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }

      // Clear any existing errors
      setErrors({})

      // Show success message
      alert(message || `Registration successful!\n\nWelcome ${formData.fullName}!`)
      
      // Redirect to login page or dashboard
      setCurrentPage('login')
      
      return { success: true, data: response.data }

    } catch (error) {
      console.error('❌ Registration failed:', error)
      
      let errorMessage = 'Registration failed. Please try again.'
      
      if (error.response) {
        const { status, data } = error.response
        
        switch (status) {
          case 400:
            // Handle validation errors from backend
            if (data.errors) {
              // If backend returns specific field errors
              const backendErrors = {}
              Object.keys(data.errors).forEach(key => {
                backendErrors[key] = data.errors[key][0] // Take first error message
              })
              setErrors(backendErrors)
              return { success: false, error: 'Please fix the form errors' }
            } else {
              errorMessage = data.message || 'Please check your input and try again.'
            }
            break
          case 409:
            errorMessage = data.message || 'User already exists with this email or phone.'
            break
          case 422:
            errorMessage = data.message || 'Invalid data provided. Please check your input.'
            break
          case 500:
            errorMessage = 'Server error. Please try again later.'
            break
          default:
            errorMessage = data.message || 'Registration failed. Please try again.'
        }
      } else if (error.request) {
        errorMessage = 'Network error. Please check your connection and try again.'
      }

      setErrors({ general: errorMessage })
      return { success: false, error: errorMessage }
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      setIsLoading(true)
      
      // Call the API function
      await handleRegisterAPI()
      
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
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
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      {/* General Error Message */}
      {errors.general && (
        <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm text-center">{errors.general}</p>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#255F38] focus:border-transparent ${
              errors.fullName ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="John Doe"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#255F38] focus:border-transparent ${
              errors.email ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="john.doe@example.com"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
          )}
        </div>

        {/* Phone */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#255F38] focus:border-transparent ${
              errors.phone ? 'border-red-300 bg-red-50' : 'border-gray-300'
            }`}
            placeholder="+1234567890"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
          )}
        </div>

        {/* Password */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#255F38] focus:border-transparent ${
                errors.password ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
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
            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-2">Confirm Password *</label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#255F38] focus:border-transparent ${
                errors.confirmPassword ? 'border-red-300 bg-red-50' : 'border-gray-300'
              }`}
              placeholder="••••••••"
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? (
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
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>
          )}
        </div>
      </div>

      {/* Password Requirements */}
      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
        <p className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</p>
        <ul className="text-sm text-gray-600 space-y-1">
          <li className={`flex items-center ${formData.password.length >= 8 ? 'text-[#255F38]' : 'text-gray-600'}`}>
            <svg className={`w-4 h-4 mr-2 ${formData.password.length >= 8 ? 'text-[#255F38]' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            At least 8 characters
          </li>
          <li className={`flex items-center ${/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'text-[#255F38]' : 'text-gray-600'}`}>
            <svg className={`w-4 h-4 mr-2 ${/(?=.*[a-z])(?=.*[A-Z])/.test(formData.password) ? 'text-[#255F38]' : 'text-gray-400'}`} fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Contains uppercase and lowercase letters
          </li>
        </ul>
      </div>
      
      {/* Terms Agreement */}
      <div>
        <label className="flex items-start">
          <input 
            type="checkbox" 
            name="agreeToTerms"
            checked={formData.agreeToTerms}
            onChange={handleChange}
            className="w-4 h-4 mt-1 text-[#255F38] border-gray-300 rounded focus:ring-[#255F38]" 
          />
          <span className="ml-2 text-sm text-gray-600">
            I agree to the Terms and Conditions and Privacy Policy
          </span>
        </label>
        {errors.agreeToTerms && (
          <p className="text-red-500 text-sm mt-1">{errors.agreeToTerms}</p>
        )}
      </div>

      <LoadingButton
        type="submit"
        isLoading={isLoading}
        id="Register"
        loadingText="Creating account..."
        className="w-full bg-[#255F38] hover:bg-[#1d4829] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50"
      >
        Create Account
      </LoadingButton>
    </form>
  )
})

export default RegisterForm