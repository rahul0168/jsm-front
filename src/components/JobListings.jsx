import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const JobListings = () => {
  const [jobListings, setJobListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [filter, setFilter] = useState({ category: '', location: '', keywords: '' });
  const itemsPerPage = 5; // Change this to adjust the number of items per page

  useEffect(() => {
    const fetchJobListings = async () => {
      try {
        const token = localStorage.getItem('token');
       

        const response = await axios.get('http://localhost:8000/api/jobs/filter', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { ...filter, page: currentPage, limit: itemsPerPage },
        });

        console.log('API Response:', response.data); // Log the API response

        if (response.data && response.data.jobs) {
          console.log('Job listings:', response.data.jobs.data);
          setJobListings(response.data.jobs.data);
          setTotalPages(response.data.jobs.last_page); // Assuming Laravel response includes last_page for total pages
          setTotalCount(response.data.total_count); // Set the total count in state
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching job listings:', error);
        setLoading(false);
      }
    };
    fetchJobListings();
  }, [currentPage, filter]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(prevPage => prevPage - 1);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter(prevFilter => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleApplyFilter = () => {
    setCurrentPage(1); // Reset to first page when applying filter
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Job Listings</h2>
      <div className="mb-4 flex flex-col md:flex-row items-center">
        <input
          type="text"
          name="category"
          value={filter.category}
          onChange={handleFilterChange}
          placeholder="Category"
          className="mb-2 md:mr-2 md:mb-0 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="location"
          value={filter.location}
          onChange={handleFilterChange}
          placeholder="Location"
          className="mb-2 md:mr-2 md:mb-0 p-2 border border-gray-300 rounded-md"
        />
        <input
          type="text"
          name="keywords"
          value={filter.keywords}
          onChange={handleFilterChange}
          placeholder="Keywords"
          className="mb-2 md:mr-2 md:mb-0 p-2 border border-gray-300 rounded-md"
        />
        <button
          onClick={handleApplyFilter}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md"
        >
          Apply Filter
        </button>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
       
          <div className="max-w-4xl mx-auto">
          {jobListings.map(job => (
              <div key={job.id} className="bg-white shadow-md rounded-lg p-6 mb-4">
                  <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                          <img src="https://placehold.co/70x70" alt="Company Logo" className="rounded-full mr-4" />
                          <div>
                              <h2 className="text-lg font-semibold">{job.title}</h2>
                              <p className="text-sm text-zinc-600">{job.salary} • {job.location}</p>
                          </div>
                      </div>
                      <Link to={`/job-details/${job.id}`} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md">
                      Apply Now
                    </Link>                     </div>
                  <div className="flex items-center justify-between">
                      <span className="text-sm text-zinc-500">{job.company_name}</span>
                      <span className="text-sm text-zinc-500">{job.posted_date}</span>
                  </div>
              </div>
                ))}
            </div>
          <div className="mt-4 flex justify-between items-center">
            <span className="text-gray-600">
              Page {currentPage} of {totalPages} | Total Jobs: {totalCount}
            </span>
            <div>
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300 disabled:pointer-events-none mr-2"
              >
                Previous
              </button>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-300 disabled:pointer-events-none"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default JobListings;
