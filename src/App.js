import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

import Dashboard from './components/Dashboard';
import JobPostingForm from './components/JobPostingForm';
import JobDetail from './components/JobDetail';
import EditJobPosting from './components/EditJobPosting';
import JobPostList from './components/JobPostList';
import Auth from './Auth';

function App() {
  return (
    <Router>
    <div>
    
       
        <Routes>
        <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/job-details/:jobId" element={<JobDetail />} />
            <Route path="/job-post-list" element={<JobPostList />} />
            <Route path="/job-post/edit/:jobId" element={<EditJobPosting />} />
            <Route path="/dashboard" element={<Auth><Dashboard /></Auth>} />
            <Route path="/job-post" element={<Auth><JobPostingForm /></Auth>} />
        </Routes>
    </div>
</Router>
  );
}

export default App;
