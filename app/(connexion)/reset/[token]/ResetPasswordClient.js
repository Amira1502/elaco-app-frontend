
'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AlertCircle, Check, ArrowRight, Loader2, Lock, Eye, EyeOff } from 'lucide-react';

export default function ResetPasswordClient({ token }) {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [focusedFields, setFocusedFields] = useState({ password: false, confirm: false });
  const [showPassword, setShowPassword] = useState({ password: false, confirm: false });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      setError('Passwords do not match!');
      return;
    }

    setLoading(true);
    setError('');
    setMessage('');

    try {
      const res = await fetch(`http://localhost:8000/ELACO/resetpassword/${token}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password, passwordConfirm }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || 'Failed to reset password');

      setMessage('Password reset successful! Redirecting...');
      setTimeout(() => router.push('/dashboard1/profile'), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFocus = (field) => {
    setFocusedFields(prev => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field) => {
    setFocusedFields(prev => ({ ...prev, [field]: false }));
  };

  const togglePasswordVisibility = (field) => {
    setShowPassword(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow-2xl overflow-hidden transform transition-all duration-500 hover:scale-105">
        <div className="h-2 bg-[#07ebbd]" />
        
        <div className="p-8">
          <div className="text-center mb-8">
            <Lock className="mx-auto h-12 w-12 text-[#07ebbd] mb-4" />
            <h1 className="text-3xl font-bold mb-2 text-black">Reset Password</h1>
            <p className="text-gray-600">Create a new secure password for your account</p>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-50 rounded-lg flex items-center text-red-700">
              <AlertCircle className="mr-2 h-5 w-5 flex-shrink-0" />
              <p>{error}</p>
            </div>
          )}
          
          {message && (
            <div className="mb-6 p-4 bg-green-50 rounded-lg flex items-center text-green-700">
              <Check className="mr-2 h-5 w-5 flex-shrink-0" />
              <p>{message}</p>
            </div>
          )}

          <div className="space-y-6">
            <div className="relative">
              <label 
                htmlFor="password" 
                className={`absolute left-3 transition-all duration-300 ${
                  focusedFields.password || password ? 'text-xs text-[#07ebbd] -top-2.5 bg-white px-1' : 'text-gray-500 top-3'
                }`}
              >
                New Password
              </label>
              <input
                id="password"
                type={showPassword.password ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => handleFocus('password')}
                onBlur={() => handleBlur('password')}
                className="w-full border-2 border-gray-300 rounded-lg py-3 px-4 pr-10 focus:outline-none focus:border-[#07ebbd] transition-all duration-300"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('password')}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                {showPassword.password ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            <div className="relative">
              <label 
                htmlFor="passwordConfirm" 
                className={`absolute left-3 transition-all duration-300 ${
                  focusedFields.confirm || passwordConfirm ? 'text-xs text-[#07ebbd] -top-2.5 bg-white px-1' : 'text-gray-500 top-3'
                }`}
              >
                Confirm Password
              </label>
              <input
                id="passwordConfirm"
                type={showPassword.confirm ? "text" : "password"}
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                onFocus={() => handleFocus('confirm')}
                onBlur={() => handleBlur('confirm')}
                className={`w-full border-2 ${
                  passwordConfirm && password !== passwordConfirm ? 'border-red-300' : 'border-gray-300'
                } rounded-lg py-3 px-4 pr-10 focus:outline-none focus:border-[#07ebbd] transition-all duration-300`}
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility('confirm')}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 transition-colors duration-300"
              >
                {showPassword.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
              {passwordConfirm && password !== passwordConfirm && (
                <p className="text-red-500 text-xs mt-1 ml-1">Passwords do not match</p>
              )}
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
                  <span>Reset Password</span>
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

          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="bg-gray-50 rounded-lg p-3">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Password Requirements:</h3>
              <ul className="text-xs text-gray-600 space-y-1">
                <li className="flex items-center">
                  <div className={`w-1 h-1 rounded-full mr-2 ${password.length >= 8 ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  At least 8 characters long
                </li>
                <li className="flex items-center">
                  <div className={`w-1 h-1 rounded-full mr-2 ${/[A-Z]/.test(password) ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  Contains uppercase letter
                </li>
                <li className="flex items-center">
                  <div className={`w-1 h-1 rounded-full mr-2 ${/[0-9]/.test(password) ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  Contains number
                </li>
                <li className="flex items-center">
                  <div className={`w-1 h-1 rounded-full mr-2 ${/[!@#$%^&*]/.test(password) ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                  Contains special character (!@#$%^&*)
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}