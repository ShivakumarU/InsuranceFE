import { LockKeyhole, LockKeyholeOpen, LogIn, Mail } from 'lucide-react';
import { useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import api from '../../lib/axios';

const LOGIN_TIMEOUT = 25000; // 25 seconds in ms

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPopup, setShowPopup] = useState(false);
  
  const progressRef = useRef(null);

  const navigate = useNavigate();

  // Loader animation (percentage up to 25s)
  const startProgress = () => {
    setProgress(0);
    let startTimestamp = Date.now();
    if (progressRef.current) clearInterval(progressRef.current);
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimestamp;
      const percent = Math.min((elapsed / LOGIN_TIMEOUT) * 100, 100);
      setProgress(percent);
      if (percent === 100) clearInterval(progressRef.current);
    }, 250);
  };

  const stopProgress = () => {
    setProgress(0);
    if (progressRef.current) clearInterval(progressRef.current);
  };

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) {
      setShowPopup(true);
      setTimeout(() => setShowPopup(false), 3000);
      return;
    }
    setLoading(true);
    startProgress();
    try {
      const resPromise = api.post("/user-auth/login", { email, password });
      // Wait for either backend or timeout, whichever is sooner:
      const result = await Promise.race([
        resPromise,
        new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), LOGIN_TIMEOUT)),
      ]);
      stopProgress();

      const data = result.data;
      localStorage.setItem("token", data.token);
      toast.success("Login successful");
      navigate("/home");
    } catch (err) {
      stopProgress();
      setLoading(false);
      if (err.message === "timeout") {
        toast.error("Server is taking too long to respond.");
      } else if (err.response) {
        toast.error(err.response.data.message || "Login failed");
      } else if (err.request) {
        toast.error("No response from server");
      } else {
        toast.error("Something went wrong");
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 shadow-xl rounded-xl overflow-hidden border border-slate-500 pb-5 relative">
        {/* Loader Overlay */}
        {loading && (
          <div className="absolute z-30 inset-0 bg-slate-900 bg-opacity-70 flex flex-col items-center justify-center">
            <svg className="animate-spin mb-4" width={48} height={48} viewBox="0 0 50 50">
              <circle
                className="text-blue-500"
                cx="25"
                cy="25"
                r="20"
                fill="none"
                strokeWidth="6"
                stroke="currentColor"
                strokeDasharray="31.4 31.4"
              />
            </svg>
            <div className="text-white text-lg">Starting server, this may take a few seconds…</div>
            <div className="mt-2 text-blue-300 font-bold">{Math.round(progress)}%</div>
          </div>
        )}

        {/* Popup if multiple clicks while loading */}
        {showPopup && (
          <div className="absolute z-40 top-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-red-500 text-white rounded shadow-lg">
            Please wait for the server to start.
          </div>
        )}

        <div className="px-8 py-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-blue-900/30 flex items-center justify-center relative">
              <div className="absolute animate-lockTransition">
                <LockKeyhole size={36} className="text-red-400" />
              </div>
              <div className="absolute animate-lockTransition opacity-0">
                <LockKeyholeOpen size={36} className="text-green-400" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Sign In</h1>
            <p className="text-slate-300"></p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6" autoComplete="off">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-slate-200 font-medium">Email Address</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="input input-bordered w-full pl-10 bg-slate-800 border-slate-600 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 text-white placeholder-slate-400"
                  required
                  disabled={loading}
                />
              </div>
            </div>
            <div className="form-control">
              <div className="flex justify-between items-center mb-1">
                <label className="label">
                  <span className="label-text text-slate-200 font-medium">Password</span>
                </label>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <LockKeyhole className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="input input-bordered w-full pl-10 bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 text-slate-900 dark:text-white placeholder-slate-400"
                  required
                  disabled={loading}
                />
              </div>
              <div className="text-right mt-2">
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  disabled={loading}
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>
            <div className="pt-2">
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow hover:shadow-lg flex items-center justify-center"
                disabled={loading}
              >
                <span className="flex items-center justify-center">
                  <span className="mr-2">Sign In</span>
                  <LogIn size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

