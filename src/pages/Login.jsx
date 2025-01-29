import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/admin');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white/5 backdrop-blur-lg rounded-xl p-8 shadow-xl"
        >
          <div className="text-center">
            <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-emerald-400">
              Admin Login
            </h2>
          </div>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-white/80">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-white/80">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 block w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 text-white focus:outline-none focus:ring-2 focus:ring-emerald-400"
                />
              </div>
            </div>

            {error && (
              <div className="text-red-400 text-sm text-center">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full px-6 py-3 rounded-lg bg-gradient-to-r from-teal-400 to-emerald-400 text-black font-medium
                transition-all duration-200 hover:shadow-lg hover:shadow-emerald-400/20
                ${loading ? 'opacity-50 cursor-not-allowed' : 'hover:-translate-y-1'}`}
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login; 