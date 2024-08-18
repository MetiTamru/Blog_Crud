import React, { useEffect, useState } from 'react';
import { useNavigate ,Link } from 'react-router-dom';
import axiosInstance from './Axios';

const LoginPage = ({ setIsLoggedIn }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [userInfo, setUserInfo] = useState('');
  const [error, setError] = useState('');
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


  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get('/users');
      setUserInfo(response.data);
      
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };


  const handleLogin = async () => {
    const user = userInfo.find(user => user.email === email);

    if (user && user.password === password) {
      setIsLoggedIn(true); 
      navigate('/home');
    } else {
      setError('Login failed. Please check your credentials.');
      setPasswordErr("password or email incorrect")

    }

  };

  return (
    <div className="bg-[#EFF5F7] min-h-screen flex items-center justify-center p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-sm">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Login</h1>
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-3 mb-4 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"        />
        {passwordErr && (<p className='text-red-500 mb-3'>{passwordErr}</p>)}
        <button
          onClick={handleLogin}
          className="bg-teal-500 text-white p-2 rounded w-full hover:bg-teal-600 transition duration-300 mb-5"
        >
          Login
        </button>
        <p>Create and account?
        <Link to={"/signup"} className='text-teal-500 ml-3' >SignUp</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
