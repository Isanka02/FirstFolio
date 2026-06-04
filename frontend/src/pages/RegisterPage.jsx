import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/api'
import { useAuth } from '../context/AuthContext'
import loginImage from '../assets/login-bg.jpg'

const RegisterPage = () => {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { loginUser } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await register({ fullName, email, password })
      loginUser(res.data.data)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
        <div style={{ 
        minHeight: '100vh', 
        background: '#0A0A0A',
        backgroundImage: 'url(/src/assets/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        padding: '1rem' 
        }}>      

        <div style={{ width: '100%', maxWidth: '1000px', background: '#111111', borderRadius: '24px', overflow: 'hidden', display: 'flex', minHeight: '560px', border: '1px solid #1E1E1E' }}>


        {/* Left Panel — Image */}
        <div style={{ flex: 1, position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end' }}>
          <img
            src={loginImage}
            alt="illustration"
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,100,60,0.3) 100%)' }} />
          <div style={{ position: 'relative', zIndex: 1, padding: '2rem', textAlign: 'center' }}>
            <h2 style={{ color: '#FFFFFF', fontSize: '1.8rem', fontWeight: '700', marginBottom: '0.5rem' }}>
              Join FirstFolio
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '14px' }}>
              Build your professional portfolio today
            </p>
          </div>
        </div>

        {/* Right Panel — Form */}
        <div style={{ flex: 1, padding: '3rem 2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ fontSize: '1.6rem', fontWeight: '700', color: '#00E5A0', marginBottom: '0.25rem' }}>
              Create Account
            </h1>
            <p style={{ color: '#A0A0A0', fontSize: '14px' }}>Start building your portfolio</p>
          </div>

          {/* Google Button */}
          <button
            onClick={() => window.location.href = 'http://localhost:8080/oauth2/authorization/google'}
            style={{ width: '100%', background: '#1A1A1A', border: '1px solid #2A2A2A', borderRadius: '10px', padding: '0.75rem', color: '#FFFFFF', fontSize: '14px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', marginBottom: '1.5rem' }}
            onMouseOver={(e) => e.currentTarget.style.borderColor = '#00E5A0'}
            onMouseOut={(e) => e.currentTarget.style.borderColor = '#2A2A2A'}
          >
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
            <div style={{ flex: 1, height: '1px', background: '#2A2A2A' }} />
            <span style={{ color: '#A0A0A0', fontSize: '12px' }}>or</span>
            <div style={{ flex: 1, height: '1px', background: '#2A2A2A' }} />
          </div>

          {error && (
            <div style={{ background: '#2A0A0A', border: '1px solid #FF4444', borderRadius: '8px', padding: '0.75rem 1rem', marginBottom: '1rem', color: '#FF4444', fontSize: '13px' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#A0A0A0', fontSize: '13px', marginBottom: '0.4rem' }}>
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Ishanka Sonali"
                required
                style={{ width: '100%', background: '#0A0A0A', border: '1px solid #2A2A2A', borderRadius: '10px', padding: '0.75rem 1rem', color: '#FFFFFF', fontSize: '14px', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#00E5A0'}
                onBlur={(e) => e.target.style.borderColor = '#2A2A2A'}
              />
            </div>

            <div style={{ marginBottom: '1rem' }}>
              <label style={{ display: 'block', color: '#A0A0A0', fontSize: '13px', marginBottom: '0.4rem' }}>
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                style={{ width: '100%', background: '#0A0A0A', border: '1px solid #2A2A2A', borderRadius: '10px', padding: '0.75rem 1rem', color: '#FFFFFF', fontSize: '14px', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#00E5A0'}
                onBlur={(e) => e.target.style.borderColor = '#2A2A2A'}
              />
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', color: '#A0A0A0', fontSize: '13px', marginBottom: '0.4rem' }}>
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                style={{ width: '100%', background: '#0A0A0A', border: '1px solid #2A2A2A', borderRadius: '10px', padding: '0.75rem 1rem', color: '#FFFFFF', fontSize: '14px', outline: 'none' }}
                onFocus={(e) => e.target.style.borderColor = '#00E5A0'}
                onBlur={(e) => e.target.style.borderColor = '#2A2A2A'}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ width: '100%', background: '#00E5A0', color: '#0A0A0A', border: 'none', borderRadius: '10px', padding: '0.85rem', fontSize: '15px', fontWeight: '600', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.8 : 1 }}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', color: '#A0A0A0', fontSize: '13px' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#00E5A0', textDecoration: 'none', fontWeight: '500' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage