import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axiosInstance from './Axios';

const SignUP = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  const [data, setData] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    let timer;
    if (passwordErr) {
      
      timer = setTimeout(() => {
        setPasswordErr('');
      }, 3000);
    }

    
    return () => clearTimeout(timer);
  }, [passwordErr]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    navigate('/home');
  };

  const handleSignup = async () => {
    if (password !== repassword) {
      setPasswordErr("password did not match")
      console.log("Passwords do not match");
      return;
    }

    try {
      const response = await axiosInstance.post("/users", {
        email: email,
        name: username,
        password: password,
      });
      setData(response.data);
      console.log(data);
      handleLogin(); 
    } catch (error) {
      console.error("Failed to sign up:", error);
    }
  };

  return (
    <div className="bg-[#EFF5F7] min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-2xl rounded-xl p-8 w-full max-w-sm">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">Sign Up</h1>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={repassword}
          onChange={(e) => setRePassword(e.target.value)}
          className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
         {passwordErr && (
          <div className="text-red-500 mb-4">{passwordErr}</div>
        )}
        <button
          onClick={handleSignup}
          className="bg-teal-600 text-white p-3 rounded-lg w-full hover:bg-teal-700 transition duration-300 shadow-md"
        >
          Sign Up
        </button>

        <p className="mt-6 text-center text-gray-700">
          Already have an account? <Link className="text-teal-600 hover:underline" to="/">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUP;
