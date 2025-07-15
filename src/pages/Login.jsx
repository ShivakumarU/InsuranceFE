import {  LockKeyhole, LogIn } from 'lucide-react';

const Login = () => {
  return (
    <div className="min-h-screen animated-dots bg-base-200 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-base-100 shadow-[1px_1px_10px_rgba(0,0,0,0.2)] shadow-yellow-100 p-8 rounded-xl">
        <h1 className="text-3xl font-bold mb-8 text-center">
            <span className="inline-flex items-center gap-3 justify-center">
                Login Now <LockKeyhole size={35}/>
            </span>
        </h1>
        <form className="space-y-8">
          <div>
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered input-warning w-full"
              required
            />
          </div>

          <div>
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered input-warning w-full"
              required
            />
          </div>

          <div className="form-control mt-6 flex justify-center">
            <button className="mt-6 btn btn-outline btn-success btn-hover-fill before:bg-yellow-300 hover:text-black w-40 group">
                <span className="flex items-center">
                  <span className='mr-1'>  Login  </span>
                  <LogIn size={14} className="transition-all duration-300 group-hover:translate-x-3 group-hover:scale-110" />
                </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
