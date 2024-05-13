import React, { useState } from 'react';
import axios from 'axios';
import { Link ,useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    c_password: '',
    role: '', // Add role field
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Correct usage of useNavigate

  const handleChange = (e) => {
    if (e.target.name === 'role') {
      setFormData({ ...formData, role: e.target.value });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const [errorMessage, setErrorMessage] = useState('');


  const validateForm = () => {
    let errorsObj = {};
    if (!formData.name) {
      errorsObj.name = 'Name is required';
    }
    if (!formData.email) {
      errorsObj.email = 'Email is required';
    }
    if (!formData.password) {
      errorsObj.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errorsObj.password = 'Password must be at least 6 characters';
    }
    if (formData.password !== formData.c_password) {
      errorsObj.c_password = 'Passwords do not match';
    }
    setErrors(errorsObj);
    return Object.keys(errorsObj).length === 0; // Returns true if there are no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('http://localhost:8000/api/register', formData);
        console.log(response.data);
        navigate('/login'); // Handle success response (redirect, show message, etc.)
      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          const emailErrors = error.response.data.errors.email;
          if (Array.isArray(emailErrors) && emailErrors.length > 0) {
            setErrorMessage(emailErrors[0]); // Set the error message state
          }
        } else {
          console.error('Error:', error.message); // Handle other error scenarios
        }
      }
    }
  };

  
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
        src="https://img.freepik.com/free-vector/employee-employer-online-interview_23-2148620897.jpg"
        alt="Your Company"
        className="w-full h-auto hidden md:block"
      />
    </div>
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
    
      <h2 className="text-2xl font-bold mb-6 text-center">Register an Account</h2>
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
      <form onSubmit={handleSubmit} className="space-y-6" action="#" method="POST">
        <div>
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            required
            onChange={handleChange}
            value={formData.name}
            className={`block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
              errors.name ? 'border-red-500' : ''
            }`}
            placeholder="Enter your name"
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email" className="block text-gray-700">Email address</label>
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            required
            onChange={handleChange}
            value={formData.email}
            className={`block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6${
              errors.email ? 'border-red-500' : ''
            }`}
            placeholder="Enter your email"
          />
          {errors.email && <p className="text-red-500 text-xs italic">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="role" className="block text-gray-700">Role</label>
          <select
            id="role"
            name="role"
            required
            onChange={handleChange}
            value={formData.role}
            className={`block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 ${
              errors.role ? 'border-red-500' : ''
            }`}
          >
            <option value="">Select your role</option>
            <option value="recruiter">Recruiter</option>
            <option value="candidate">Candidate</option>
          </select>
          {errors.role && <p className="text-red-500 text-xs italic">{errors.role}</p>}
        </div>
        <div>
          <label htmlFor="password" className="block text-gray-700">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            onChange={handleChange}
            value={formData.password}
            className={`block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6${
              errors.password ? 'border-red-500' : ''
            }`}
            placeholder="Enter your password"
          />
          {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
        </div>

       
        <div>
          <label htmlFor="c_password" className="block text-gray-700">Confirm Password</label>
          <input
            id="c_password"
            name="c_password"
            type="password"
            autoComplete="new-password"
            required
            onChange={handleChange}
            value={formData.c_password}
            className={`block w-full p-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6${
              errors.c_password ? 'border-red-500' : ''
            }`}
            placeholder="Confirm your password"
          />
          {errors.c_password && <p className="text-red-500 text-xs italic">{errors.c_password}</p>}
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Register
          </button>
          <p className="mt-10 text-center text-sm text-gray-500">
        Already have an account? &nbsp;
        <a
          href="/login"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          Log in here
        </a>
      </p>
        </div>
      </form>
    </div>
  
</div>


    
  
  </>
  );
};

export default Register;
