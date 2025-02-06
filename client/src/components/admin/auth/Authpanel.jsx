import { useState } from 'react';
import { ArrowRight, LogIn, UserPlus } from 'lucide-react';
import LoginForm from "./login";
import RegisterForm from "./register";

const Auth = () =>{
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4">     
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Tab Navigation */}
            <div className="flex">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2
                  ${isLogin ? 'bg-indigo-500 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
              >
                <LogIn size={18} />
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-4 text-sm font-semibold transition-colors flex items-center justify-center gap-2
                  ${!isLogin ? 'bg-indigo-500 text-white' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
              >
                <UserPlus size={18} />
                Register
              </button>
            </div>
  
            <div className="p-8">
              {isLogin ? <LoginForm /> : <RegisterForm />}
            </div>
          </div>
  
          {/* Footer */}
          <p className="text-center text-white mt-6 flex items-center justify-center gap-2">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="font-semibold hover:text-indigo-100 transition-colors flex items-center gap-1"
            >
              {isLogin ? 'Register here' : 'Login here'}
              <ArrowRight size={16} />
            </button>
          </p>
        </div>
      </div>
    )
}
export default Auth;


