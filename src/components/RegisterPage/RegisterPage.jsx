import React from 'react'
import { Layout, Card, Footer, Divider } from '../common/Layout'
import RegisterForm from './RegisterForm'

export default function RegisterPage({ setCurrentPage }) {
  return (
    <Layout maxWidth="max-w-2xl">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#255F38] rounded-full mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-black mb-2">Create Account</h1>
        <p className="text-gray-600">Register to access the Complaints Portal</p>
      </div>

      <Card>
        <RegisterForm setCurrentPage={setCurrentPage} />
        
        <Divider />
        
        <p className="text-center text-gray-600">
          Already have an account?{' '}
          <button 
            onClick={() => setCurrentPage('login')} 
            className="text-[#255F38] hover:text-[#1d4829] font-semibold"
          >
            Sign in here
          </button>
        </p>
      </Card>

      <Footer />
    </Layout>
  )
}