import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Navbar from './Navbar';
import Footer from './Footer';
import axios from 'axios';


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

const JobPostingForm = () => {
  const initialValues = {
    title: '',
    company_name: '',
    company_email: '',

    role: '',
    description: '',
    location: '',
    detail_req: '',
    salary: '',
    commitment: '',
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    company_name: Yup.string().required('Company name is required'),
    company_email: Yup.string().email('Invalid email format').required('Company email is required'),
    role: Yup.string().required('Role is required'),
    description: Yup.string().required('Description is required'),
    location: Yup.string().required('Location is required'),
    detail_req: Yup.string().required('Detail Req is required'),
    salary: Yup.string().required('Salary is required'),
    commitment: Yup.string().required('Commitment is required'),
  });

  const [message, setMessage] = useState('');

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('UserId');
      if (!token) {
        // Handle error, redirect to login, or fetch token from somewhere else
        return;
      }
  
      const formData = new FormData();
      formData.append('title', values.title);
      formData.append('company_name', values.company_name);
      formData.append('company_email', values.company_email);
      formData.append('role', values.role);
      formData.append('description', values.description);
      formData.append('location', values.location);
      formData.append('detail_req', values.detail_req);
      formData.append('salary', values.salary);
      formData.append('commitment', values.commitment);
      formData.append('user_id', userId);
  
      const response = await axios.post('http://localhost:8000/api/job-postings', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      });
  
      console.log(response.data); // Handle API response
      setMessage(response.data.message ? response.data.message.toString() : 'Job posted successfully'); // Update message state
  
      resetForm();
    } catch (error) {
      console.error('Error posting job:', error); // Log error
      setMessage('Error posting job'); // Update message state on error
    }
  
    setSubmitting(false);
  };

  return (
    <>
       <div className="bg-gradient-to-r from-blue-200 to-purple-200">
        
        <Navbar/>
        <h1 className="text-5xl text-center p-12 font-bold text-zinc-800 ">Job Post</h1>
        </div>

        <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg">
  {message && (
    <div className={`mb-4 ${message.indexOf('Error') === 0 ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'} p-2 rounded-lg text-sm`}>
      {message}
    </div>
  )}
  <h2 className="text-3xl font-bold mb-6 text-center">Job Posting Form</h2>
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleSubmit}
  >
    {({ isSubmitting, setFieldValue }) => (
      <Form className="space-y-6">
        {/* First Part of Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
            <Field type="text" name="title" className="form-input mt-1  p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label htmlFor="company_name" className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
            <Field type="text" name="company_name" className="form-input mt-1  p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            <ErrorMessage name="company_name" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label htmlFor="company_email" className="block text-sm font-medium text-gray-700 mb-1">Company Email</label>
            <Field type="email" name="company_email" className="form-input mt-1  p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            <ErrorMessage name="company_email" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
            <Field as="select" name="role" className="form-select mt-1  p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              <option value="">Select a role</option>
              {roleOptions.map((role, index) => (
                <option key={index} value={role}>{role}</option>
              ))}
            </Field>
            <ErrorMessage name="role" component="div" className="text-red-500 text-sm mt-1" />
          </div>
        </div>
        {/* Second Part of Form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
         
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <Field as="textarea" name="description" rows="3" className="form-textarea mt-1  p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">Location</label>
            <Field as="select" name="location" className="form-select mt-1  p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              <option value="">Select a state</option>
              {indianStates.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </Field>
            <ErrorMessage name="location" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label htmlFor="detail_req" className="block text-sm font-medium text-gray-700 mb-1">Detail Req</label>
            <Field as="textarea" name="detail_req" rows="3" className="form-textarea mt-1  p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            <ErrorMessage name="detail_req" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700 mb-1">Salary</label>
            <Field type="text" name="salary" className="form-input mt-1  p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50" />
            <ErrorMessage name="salary" component="div" className="text-red-500 text-sm mt-1" />
          </div>
          <div>
            <label htmlFor="commitment" className="block text-sm font-medium text-gray-700 mb-1">Commitment</label>
            <Field as="select" name="commitment" className="form-select mt-1  p-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50">
              <option value="">Select Commitment</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
              <option value="Contract / Freelance">Contract / Freelance</option>
              <option value="Co-founder">Co-founder</option>
            </Field>
            <ErrorMessage name="commitment" component="div" className="text-red-500 text-sm mt-1" />
          </div>
        </div>
        <div className="flex justify-center">
          <button type="submit" disabled={isSubmitting} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg focus:outline-none focus:ring focus:ring-blue-200 focus:ring-opacity-50">
            Submit
          </button>
        </div>
      </Form>
    )}
  </Formik>
</div>
<Footer/>
    </>
   
  );
};

export default JobPostingForm;
