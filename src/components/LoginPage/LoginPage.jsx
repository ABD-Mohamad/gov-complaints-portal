import React from 'react'
import { Layout, Card, Footer, Divider } from '../common/Layout'
import LoginForm from './LoginForm'

export default function LoginPage({ setCurrentPage }) {
  return (
    <Layout>
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-[#255F38] rounded-full mb-4">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-black mb-2">Government Portal</h1>
        <p className="text-gray-600">Complaints Management System</p>
      </div>

      <Card>
        <h2 className="text-2xl font-bold text-black mb-6">Sign In</h2>
        <LoginForm setCurrentPage={setCurrentPage} />
        
        <Divider />
        
        <p className="text-center text-gray-600">
          Don't have an account?{' '}
          <button 
            onClick={() => setCurrentPage('register')} 
            className="text-[#255F38] hover:text-[#1d4829] font-semibold"
          >
            Register here
          </button>
        </p>
      </Card>

      <Footer />
    </Layout>
  )
}