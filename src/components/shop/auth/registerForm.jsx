'use client'

import React, { useState } from 'react'
import { isEmpty, validateRegister } from '@/utils/validators'
import { register } from '@/services/authService'
import { useRouter } from 'next/router'

/**
 * RegisterForm component
 */

export default function RegisterForm(props) {
  const [username, setUsername] = useState('')
  const [fullname, setFullname] = useState('')
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')
  const [confirm_password, setConfirm_password] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter();   


  const handleSubmit = async (e) => {
    e.preventDefault()
    const validateErrors = validateRegister({
      username,
      fullname,
      email,
      pass,
      confirm_password,
    })
    setErrors(validateErrors);
    if(!isEmpty(validateErrors)) return;

    let data = {
        username,
        fullname,
        email,
        pass,
    }
    try{  
        setLoading(true);
        let res = await register(data);
        console.log(res)
        setSuccess("Register success")
        setTimeout(() => {
            router.push('/login')
        }, 2000);
    }
    catch(e) {
        setErrors({ message: e.data.error })
    } 
    finally {
        setLoading(false)
    }

  }

  return (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create Account
      </h2>

      {errors.message && (
        <p className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-2">
          {errors.message}
        </p>
      )}

      {success && (
        <p className="mb-4 text-sm text-green-600 bg-green-50 border border-green-200 rounded-lg px-4 py-2">
          {success}
        </p>
      )}

      <form method="post" onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          {errors.username && <p className="text-sm text-red-500 mb-1">{errors.username}</p>}
          <input
            type="text"
            value={username}
            id="username"
            name="username"
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label htmlFor="fullname" className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          {errors.fullname && <p className="text-sm text-red-500 mb-1">{errors.fullname}</p>}
          <input
            type="text"
            value={fullname}
            id="fullname"
            name="fullname"
            onChange={(e) => setFullname(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          {errors.email && <p className="text-sm text-red-500 mb-1">{errors.email}</p>}
          <input
            type="email"
            value={email}
            id="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label htmlFor="pass" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          {errors.pass && <p className="text-sm text-red-500 mb-1">{errors.pass}</p>}
          <input
            type="password"
            value={pass}
            id="pass"
            name="pass"
            onChange={(e) => setPass(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <div>
          <label htmlFor="confirm_password" className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          {errors.confirm_password && (
            <p className="text-sm text-red-500 mb-1">{errors.confirm_password}</p>
          )}
          <input
            type="password"
            value={confirm_password}
            id="confirm_password"
            name="confirm_password"
            onChange={(e) => setConfirm_password(e.target.value)}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-2.5 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Register"}
        </button>
      </form>
    </div>
  </div>
)
}
