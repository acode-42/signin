import { useState } from "react";
import { auth } from "./firebaseconfig.js";
import {
  signInWithEmailAndPassword,
  fetchSignInMethodsForEmail,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
} from "firebase/auth";
import { motion, AnimatePresence } from "framer-motion";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [notice, setNotice] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setNotice("");

    if (isLogin) {
      try {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        if (methods.length === 0) {
          setNotice("No account found. Please sign up to continue.");
          setIsLogin(false);
          return;
        }
        await signInWithEmailAndPassword(auth, email, password);
      } catch (err) {
        setError(err.message);
      }
    } else {
      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        await updateProfile(userCredential.user, { displayName: fullName });
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={isLogin ? "login" : "signup"}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            {notice && (
              <p className="text-blue-500 text-center mb-4">{notice}</p>
            )}
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <form onSubmit={handleSubmit}>
              {!isLogin && (
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  type="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {!isLogin && (
                <div className="mb-6">
                  <label className="block text-gray-700 text-sm font-semibold mb-2">
                    Confirm Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-600"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}
              <button
                type="submit"
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition duration-200"
              >
                {isLogin ? "Login" : "Sign Up"}
              </button>
            </form>
            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500 font-semibold">OR</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center border border-gray-300 rounded-md py-2 hover:bg-gray-100 transition duration-200"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                <path
                  fill="#EA4335"
                  d="M24 9.5c3.2 0 5.9 1.1 8.1 2.9l6-6C35.4 4.3 30.1 2 24 2 14.6 2 6.6 7.5 2.3 15.1l7.2 5.6C11.8 15.4 17.3 9.5 24 9.5z"
                ></path>
                <path
                  fill="#4285F4"
                  d="M46.1 24.5c0-1.6-.1-3.1-.3-4.5H24v8.5h12.5c-.6 3.3-2.5 6.1-5.4 7.9l7.2 5.6C43 36.6 46.1 30.6 46.1 24.5z"
                ></path>
                <path
                  fill="#FBBC05"
                  d="M10.5 28.7c-.6-1.7-1-3.5-1-5.4s.4-3.7 1-5.4L3.3 12.3C1.2 16.2 0 20.7 0 25.3s1.2 9.1 3.3 12.9l7.2-5.6z"
                ></path>
                <path
                  fill="#34A853"
                  d="M24 47c6.5 0 12-2.1 16-5.7l-7.2-5.6c-2 1.4-4.5 2.3-8 2.3-6.7 0-12.3-4.5-14.3-10.7L3.3 36.9C7.5 44.5 15.5 50 24 50z"
                ></path>
                <path fill="none" d="M0 0h48v48H0z"></path>
              </svg>
              <span className="font-semibold text-gray-700">
                {isLogin ? "Sign in with Google" : "Sign up with Google"}
              </span>
            </button>
            <div className="text-center mt-4">
              {isLogin ? (
                <p className="text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    className="text-purple-600 font-semibold hover:underline"
                    onClick={() => {
                      setIsLogin(false);
                      setError("");
                      setNotice("");
                    }}
                  >
                    Sign Up
                  </button>
                </p>
              ) : (
                <p className="text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    className="text-purple-600 font-semibold hover:underline"
                    onClick={() => {
                      setIsLogin(true);
                      setError("");
                      setNotice("");
                    }}
                  >
                    Login
                  </button>
                </p>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AuthForm;
