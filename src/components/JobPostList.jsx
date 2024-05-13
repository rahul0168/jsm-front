import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const JobPostList = () => {
    const [jobPostings, setJobPostings] = useState([]);
    const userId = localStorage.getItem('UserId');
    const token = localStorage.getItem('token');
    const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
      
    
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    axios.get(`http://localhost:8000/api/job-postings/list/${userId}`)
      .then(response => {
        setJobPostings(response.data.data);
      })
      .catch(error => console.error('Error fetching job postings:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
      await axios.delete(`http://localhost:8000/api/job-postings/delete/${userId}/${id}`);
      setJobPostings(prevJobPostings => prevJobPostings.filter(job => job.id !== id));
  
      setSuccessMessage('Job posting deleted successfully.');
      setTimeout(() => setSuccessMessage(''), 3000)
    } catch (error) {
      console.error('Error deleting job posting:', error);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-200 to-purple-200">
        <Navbar />
        <h1 className="text-5xl text-center p-12 font-bold text-zinc-800 ">Job Postings</h1>
      </div>

      <div className=" h-800 max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
      {successMessage && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{successMessage}</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3" onClick={() => setSuccessMessage('')}>
              <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1 1 0 01-1.414 0L10 11.414l-2.929 2.93a1 1 0 01-1.414-1.414l2.93-2.929-2.93-2.93a1 1 0 111.414-1.414l2.929 2.93 2.93-2.93a1 1 0 111.414 1.414l-2.93 2.929 2.93 2.93a1 1 0 010 1.415z"/></svg>
            </span>
          </div>
        )}
        <table className="min-w-full">
          <thead>
            <tr>
              <th className="text-left">Title</th>
              <th className="text-left">Company Name</th>
              <th className="text-left">Location</th>
              <th className="text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(jobPostings) && jobPostings.length > 0 ? (
              jobPostings.map(job => (
                <tr key={job.id}>
                  <td>{job.title}</td>
                  <td>{job.company_name}</td>
                  <td>{job.location}</td>
                  <td>
                    <Link to={`/job-post/edit/${job.id}`} className="text-green-500 hover:underline mr-2">Edit</Link>
                    <button onClick={() => handleDelete(job.id)} className="text-red-500 hover:underline">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No job postings available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Footer/>

    </>
  );
};

export default JobPostList;
