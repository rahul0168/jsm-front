import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const indianStates = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab',
  'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const roleOptions = [
  'Programming',
  'Design',
  'Management / Finance',
  'Customer Support',
  'Sales / Marketing'
];

const EditJobPosting = () => {
  const { jobId } = useParams();
  const [message, setMessage] = useState('');
  const [jobData, setJobData] = useState({
    title: '',
    company_name: '',
    company_email: '',
    role: '',
    description: '',
    location: '',
    detail_req: '',
    salary: '',
    commitment: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

    axios.get(`http://localhost:8000/api/job-postings/edit/${jobId}`)
      .then(response => {
        const fetchedJobData = response.data.data;
        setJobData(prevState => ({
          ...prevState,
          ...fetchedJobData,
        }));
      })
      .catch(error => console.error('Error fetching job:', error));
  }, [jobId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log('Form Values:', jobData);
      const response = await axios.put(`http://localhost:8000/api/job-postings/${jobId}`, jobData);
      console.log('Job updated successfully:', response.data);
      setMessage('Job updated successfully');
      // Redirect or show a success message
    } catch (error) {
      console.error('Error updating job:', error);
      setMessage('Error updating job');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setJobData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

 

  
  return (
    <>
      <div className="bg-gradient-to-r from-blue-200 to-purple-200">
        <Navbar />
        <h1 className="text-5xl text-center p-12 font-bold text-zinc-800 ">Job Post Edit</h1>
      </div>

      <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        {message && (
          <div className={`mb-4 ${message.indexOf('Error') === 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'} p-2 rounded-lg text-sm`}>
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Part of Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
              <input type="text" name="title" value={jobData.title} onChange={handleChange} className="form-input mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <input type="text" name="company_name" value={jobData.company_name} onChange={handleChange} className="form-input mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label htmlFor="company_email" className="block text-sm font-medium text-gray-700 mb-1">Company Email</label>
              <input type="email" name="company_email" value={jobData.company_email} onChange={handleChange} className="form-input mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
              <select
                name="role"
                value={jobData.role}
                onChange={handleChange}
                className="form-select mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Select a role</option>
                {roleOptions.map((role, index) => (
                  <option key={index} value={role}>{role}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Second Part of Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" value={jobData.description} onChange={handleChange} rows="3" className="form-textarea mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"></textarea>
            </div>
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
              <select
                name="location"
                value={jobData.location}
                onChange={handleChange}
                className="form-select mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Select a state</option>
                {indianStates.map((state, index) => (
                  <option key={index} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="detail_req" className="block text-sm font-medium text-gray-700 mb-1">Detail Req</label>
              <textarea name="detail_req" value={jobData.detail_req} onChange={handleChange} rows="3" className="form-textarea mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"></textarea>
            </div>
            <div>
              <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
              <input type="text" name="salary" value={jobData.salary} onChange={handleChange} className="form-input mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            </div>
            <div>
              <label htmlFor="commitment" className="block text-sm font-medium text-gray-700 mb-1">Commitment</label>
              <select
                name="commitment"
                value={jobData.commitment}
                onChange={handleChange}
                className="form-select mt-1 p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              >
                <option value="">Select a commitment</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Internship">Internship</option>
                <option value="Contract / Freelance">Contract / Freelance</option>
                <option value="Co-founder">Co-founder</option>
              </select>
            </div>
          </div>

          <div className="flex justify-center">
            <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              Submit
            </button>
          </div>
        </form>
      </div>
      {/* Footer and other components */}
    </>
  );
};

export default EditJobPosting;
