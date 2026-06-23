'use client'

import React, { useState } from 'react'
import { isEmpty, validateLogin } from '@/utils/validators'
import { login } from '@/services/authService'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import { AuthContext } from '@/context/AuthProvider'


/**
 * RegisterForm component
 */

export default function LoginForm(props) {
  const [username, setUsername] = useState('')
  const [pass, setPass] = useState('')
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter();
  const { user, setUser} = useContext(AuthContext);


  const handleSubmit = async (e) => {
    e.preventDefault()
    const validateErrors = validateLogin({
      username,
      pass

    })
    setErrors(validateErrors);
    if(!isEmpty(validateErrors)) return;

    let data = {
        username,
        pass,
    }
    try{
        setLoading(true);
        let res = await login(data);
        console.log(res)
        setSuccess("Login success")
        setUser(res.user);
        setTimeout(() => {
          if(res.user.user_type=="admin") router.push("/admin")
            else router.push("/");
        }, 1000);
    }
    catch(e) {
        setErrors({ message: e.data?.error || e.message || 'Login failed' })
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


        <button
          type="submit"
          disabled={loading}
          className="w-full rounded-lg bg-blue-600 py-2.5 text-white font-semibold hover:bg-blue-700 transition disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Loading..." : "Login"}
        </button>
      </form>
    </div>
  </div>
)
}
