import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Correct usage of useNavigate

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let errorsObj = {};
    if (!formData.email) {
      errorsObj.email = 'Email is required';
    }
    if (!formData.password) {
      errorsObj.password = 'Password is required';
    }
    setErrors(errorsObj);
    return Object.keys(errorsObj).length === 0;
  };
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8000/api/login', formData);
        const token = response.data.data.token; // Assuming the token is in the response data
        const UserId = response.data.data.id; // Assuming the token is in the response data
        const UserRole = response.data.data.role; // Assuming the token is in the response data

        // Store the token in localStorage (consider secure storage alternatives)
        localStorage.setItem('token', token);
        localStorage.setItem('UserId', UserId);
        localStorage.setItem('UserRole', UserRole);

        console.log('Login successful!');
        console.log(token);
        navigate('/'); // Redirect to the dashboard or another protected page
      } catch (error) {
        if (error.response && error.response.data && error.response.data.success === false) {
          setErrorMessage(error.response.data.message);
        } else {
          console.error('Error:', error.message); // Handle other error scenarios
        }
      }
    }
  };

  // Check for existing token on initial render (optional)
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      // Handle potential token refresh or validation here if needed
      console.log('Token found:', storedToken);
      // Optionally, redirect to a protected page if token is valid
    }
  }, []); // Empty dependency array ensures it runs only once

  return (
    <>
    <nav className="bg-opacity-90 md:bg-opacity-100 ">
    <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-blue-800 bg-transparent hover:bg-blue-100 font-semibold py-2 px-4 rounded">Home</Link>
       
        </div>
    </nav>

 <div className="min-h-screen bg-white-100 flex justify-center items-center">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto  w-auto hidden md:block"
            src="https://img.freepik.com/free-vector/employee-employer-online-interview_23-2148620897.jpg"
            alt="Your Company"
          />
        
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign in to your account
          </h2>
          {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline">{errorMessage}</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg onClick={() => setErrorMessage('')} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <title>Close</title>
              <path fillRule="evenodd" d="M14.348 5.652a.5.5 0 0 0-.708 0L10 9.293 6.36 5.652a.5.5 0 0 0-.708.708L9.293 10l-3.64 3.64a.5.5 0 0 0 .708.708L10 10.707l3.64 3.64a.5.5 0 0 0 .708-.708L10.707 10l3.64-3.64a.5.5 0 0 0 0-.708z"/>
            </svg>
          </span>
        </div>
      )}
          <form className="space-y-6" onSubmit={handleSubmit} action="#" method="POST">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={handleChange}
                  value={formData.email}
                  className={`block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.email ? 'border-red-500' : ''
                  }`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs italic">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={handleChange}
                  value={formData.password}
                  className={`block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
                    errors.password ? 'border-red-500' : ''
                  }`}
                />
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs italic">{errors.password}</p>
              )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            Not a member? &nbsp;
            <a href="/register" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              Register Here
            </a>
          </p>
        </div>
      </div>

 </>
  );
};

export default Login;
