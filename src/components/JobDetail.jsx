import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Assuming you're using React Router for routing
import Navbar from './Navbar';
import Footer from './Footer';
import { Link,useNavigate } from 'react-router-dom';

const JobDetail = () => {
  const { jobId } = useParams(); // Assuming you have a route parameter for the job ID
  const [jobDetails, setJobDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [applyMessage, setApplyMessage] = useState('');
  const [applyError, setApplyError  ] = useState('');
  const navigate = useNavigate(); // Correct usage of useNavigate

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        

        console.log(jobId);

        const response = await axios.get(`http://localhost:8000/api/job-listings/${jobId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

       

        setJobDetails(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching job details:', error);
        setError('Error fetching job details. Please try again.');
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleApply = async () => {
    try {
      const formData = new FormData();
      formData.append('job_id', jobId);
    
      const token = localStorage.getItem('token');
      const response = await axios.post(
        `http://localhost:8000/api/job-applications/`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setApplyMessage(response.data.message);
      setApplyError(null); // Clear previous error message if any
    } catch (error) {
      console.error('Error applying for job:', error);
      if (error.response && error.response.data.errors) {
        const firstErrorKey = Object.keys(error.response.data.errors)[0];
        setApplyError(error.response.data.errors[firstErrorKey][0]);
      } else {
        setApplyError(error.response.data.message);
        if(error.response.data.message === 'Unauthenticated.')
          {
            navigate('/login');
             
          }
      }
      setApplyMessage(null); // Clear previous success message if any
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  if (!jobDetails) {
    return <p>Job not found.</p>;
  }

  return (

    <>
    <div className="bg-gradient-to-r from-blue-200 to-purple-200 mb-3">

    <Navbar/>
    </div>
    <div className='min-h-screen'>
  
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
    {applyMessage && (
        <div className="bg-green-200 text-green-800 p-2 rounded-lg mb-4">
          {applyMessage}
        </div>
      )}
      {applyError && (
        <div className="bg-red-200 text-red-800 p-2 rounded-lg mb-4">
          {applyError}
        </div>
      )}
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-3xl font-bold text-gray-800">{jobDetails.title}</h2>
      <button onClick={handleApply} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">Apply Now</button>
    </div>
    <div className="flex items-center mb-4">
      <div className="flex-shrink-0">
        <img src="https://placehold.co/400" alt="Company Logo" className="w-12 h-12 rounded-full" />
      </div>
      <div className="ml-4">
        <p className="text-sm text-gray-600">Company: {jobDetails.company_name}</p>
        <p className="text-sm text-gray-600">Location: {jobDetails.location}</p>
        <p className="text-sm text-gray-600">Posted Date: {jobDetails.posted_date}</p>
      </div>
    </div>
  </div>
  <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-3">
  <p className="text-base text-gray-700">{jobDetails.description}</p>

    </div>
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-3">
  <p className="text-base text-gray-700">{jobDetails.detail_req}</p>

    </div>
    </div>
    

  <Footer/>

  </>
  );
};

export default JobDetail;
