import { LockKeyhole, LockKeyholeOpen, LogIn, Mail } from 'lucide-react';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:5001/api/user-auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Login failed");
        return;
      }

      // Save token in localStorage
      localStorage.setItem("token", data.token);
      toast.success("Login successful");

      // Navigate to /home
      navigate("/home");
    } catch (err) {
      console.error("Login error:", err);
      alert("Something went wrong");
    }  
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-300 via-slate-400 to-slate-600 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-slate-800 shadow-xl rounded-xl overflow-hidden border border-slate-500 pb-5">
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
          
          <form onSubmit={handleSubmit} className="space-y-6">
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
                />
              </div>
              <div className="text-right mt-2">
                <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
                  >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-500 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-300 transform hover:-translate-y-0.5 shadow hover:shadow-lg"
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
