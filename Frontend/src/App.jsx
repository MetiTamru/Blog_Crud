import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import SignUP from './Components/SignUp';
import HomePage from './Components/HomePage';
import EditItemPage from './Components/EditItemPage';
import AddItemsPage from './Components/AddItemsPage';
import LoginPage from './Components/LoginPage';
import Navbar from "./Components/Navbar"
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
      <Routes>
        {!isLoggedIn ? (
          <>
          <Route path="/" element={<LoginPage setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/signup" element={<SignUP setIsLoggedIn={setIsLoggedIn} />} />
          </>
          
          
        ) : (
          <>
            <Route
              path="/*"
              element={
                <>
                  <Navbar />
                  <Routes>
                    <Route path="/home" element={<HomePage />} />
                    <Route path="/edit/:id" element={<EditItemPage />} />
                    <Route path="/add" element={<AddItemsPage />} />
                    <Route path="/" element={<Navigate to="/home" />} /> 
                  </Routes>
                </>
              }
            />
          </>
        )}
       
        <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/"} />} />
        <Route path="*" element={<Navigate to={isLoggedIn ? "/home" : "/"} />} />
      </Routes>
      
  );
};

export default App;
