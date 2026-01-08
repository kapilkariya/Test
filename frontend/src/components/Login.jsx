import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { GoogleLogin } from '@react-oauth/google'

const Login = ({ settoken }) => {
  const [state, setState] = useState('SignUp')
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')

  const onSubmitHandler = async (e) => {
    try {
      e.preventDefault()
      const payload = state === 'SignUp' ? { email, name, password } : { email, password }
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/${state === 'SignUp' ? 'register' : 'login'}`, payload)
      localStorage.setItem("token", res.data.token);
      settoken(res.data.token)
      setEmail('')
      setName('')
      setPassword('')
      console.log(res.data.message);  
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex justify-center items-center p-4'>
      <div className='bg-white rounded-2xl shadow-2xl overflow-hidden w-full max-w-md'>
        {/* Header */}
        <div className='bg-gradient-to-r from-blue-600 to-indigo-700 p-8 text-white'>
          <h1 className='text-3xl font-bold'>{state === 'SignUp' ? 'Create Account' : 'Welcome Back'}</h1>
          <p className='text-blue-100 mt-2'>
            {state === 'SignUp'
              ? 'Join our community today'
              : 'Sign in to your account'
            }
          </p>
        </div>

        {/* Form */}
        <form onSubmit={onSubmitHandler} className='p-8 space-y-6'>
          {/* Email Field */}
          <div className='space-y-2'>
            <label htmlFor='email' className='block text-sm font-medium text-gray-700'>
              Email Address
            </label>
            <input
              id='email'
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
              placeholder='you@example.com'
              required
            />
          </div>

          {/* Name Field (only for signup) */}
          {state === 'SignUp' && (
            <div className='space-y-2'>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700'>
                Full Name
              </label>
              <input
                id='name'
                type='text'
                value={name}
                onChange={(e) => setName(e.target.value)}
                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
                placeholder='John Doe'
                required
              />
            </div>
          )}

          {/* Password Field */}
          <div className='space-y-2'>
            <label htmlFor='password' className='block text-sm font-medium text-gray-700'>
              Password
            </label>
            <input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all'
              placeholder='Enter your password'
              required
            />
          </div>

          {/* Remember me checkbox (for login only) */}
          {state === 'Login' && (
            <div className='flex items-center'>
              <input
                id='remember'
                type='checkbox'
                className='h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded'
              />
              <label htmlFor='remember' className='ml-2 block text-sm text-gray-700'>
                Remember me
              </label>
            </div>
          )}

          {/* Submit Button */}
          <button
            type='submit' onClick={()=>console.log("btn clicked")}
            className='w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-lg font-semibold hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all transform hover:-translate-y-0.5'
          >
            {state === 'SignUp' ? 'Create Account' : 'Sign In'}
          </button>
          {/* Toggle between SignUp and Login */}
          <div className='text-center pt-4 border-t border-gray-200'>
            <p className='text-gray-600'>
              {state === 'SignUp' ? 'Already have an account?' : "Don't have an account?"}
              <button
                type='button'
                onClick={() => setState(state === 'SignUp' ? 'Login' : 'SignUp')}
                className='ml-2 text-blue-600 hover:text-blue-800 font-semibold focus:outline-none focus:underline'
              >
                {state === 'SignUp' ? 'Sign In' : 'Sign Up'}
              </button>
            </p>
          </div>

          {/* Forgot Password (for login only) */}
          {state === 'Login' && (
            <div className='text-center'>
              <button
                type='button'
                className='text-sm text-blue-600 hover:text-blue-800 hover:underline focus:outline-none'
              >
                Forgot your password?
              </button>
            </div>
          )}
        </form>

        {/* Social Login Divider */}
        <div className='px-8 pb-8'>
          <div className='relative'>
            <div className='absolute inset-0 flex items-center'>
              <div className='w-full border-t border-gray-300'></div>
            </div>
            <div className='relative flex justify-center text-sm'>
              <span className='px-2 bg-white text-gray-500'>Or continue with</span>
            </div>
          </div>

          {/* Social Login Buttons */}
          <div className='mt-6 gap-3'>
            <button
              onClick={()=>window.open(`${import.meta.env.VITE_BACKEND_URL}/auth/google`,'_self')}
              type='button'
              className='w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 24 24'>
                <path d='M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70497C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z' fill='#EA4335' />
                <path d='M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z' fill='#4285F4' />
                <path d='M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.2749 6.60986C0.4649 8.22986 0 10.0599 0 11.9999C0 13.9399 0.4649 15.7699 1.2749 17.3899L5.26498 14.2949Z' fill='#FBBC05' />
                <path d='M12.0003 24C15.2403 24 17.9653 22.935 19.9453 21.095L16.0803 18.095C15.0053 18.82 13.6203 19.25 12.0003 19.25C8.87028 19.25 6.21525 17.14 5.26528 14.295L1.27527 17.39C3.25527 21.31 7.31028 24 12.0003 24Z' fill='#34A853' />
              </svg>
              <span className='ml-2'>Google</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login