"use client"
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Check, ArrowRight, Loader2 } from 'lucide-react';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [focused, setFocused] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    
    try {
      const res = await fetch('http://localhost:8000/ELACO/forgotpassword', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      
      const data = await res.json();
      
      if (!res.ok) throw new Error(data.error || 'Failed to send reset link');
      
      setMessage('Password reset link sent to your email!');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
        <div className="h-2 bg-[#07ebbd]" />
        
        <div className="p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2 text-black">Forgot Password</h1>
            <p className="text-gray-600">Enter your email to receive a password reset link</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center text-red-700">
              <AlertCircle className="mr-2 h-5 w-5" />
              <p>{error}</p>
            </div>
          )}
          
          {message && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg flex items-center text-green-700">
              <Check className="mr-2 h-5 w-5" />
              <p>{message}</p>
            </div>
          )}

          <div className="space-y-6">
            <div className="relative">
              <label 
                htmlFor="email" 
                className={`absolute left-3 transition-all duration-300 ${
                  focused || email ? 'text-xs text-[#07ebbd] -top-2.5 bg-white px-1' : 'text-gray-500 top-3'
                }`}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                className="w-full border-2 border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:border-[#07ebbd] transition-all duration-300"
                required
              />
            </div>

            <button 
              onClick={handleSubmit} 
              disabled={loading}
              className="w-full bg-black hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center group"
            >
              {loading ? (
                <Loader2 className="animate-spin h-5 w-5" />
              ) : (
                <>
                  <span>Send Reset Link</span>
                  <ArrowRight className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                </>
              )}
            </button>
            
            <div className="text-center mt-4">
              <button 
                onClick={() => router.push('/login')} 
                className="text-sm text-gray-600 hover:text-[#07ebbd] transition-colors duration-300"
              >
                Back to Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}