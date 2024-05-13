import React from 'react';
import Navbar from './Navbar';

// Shared TailwindCSS classes
const buttonBase = "font-bold py-2 px-4 rounded";
const buttonBlue = `${buttonBase} bg-blue-500 hover:bg-blue-700 text-white`;
const textZinc600 = "text-zinc-600";


const UserImage = ({ src, alt }) => (
    <img src={src} alt={alt} className="w-10 h-10" />
);



const Main = () => (
    <main className="px-8 py-12 text-center">
        <h1 className="text-5xl font-bold text-zinc-800 mb-4">
            Join the best tech startups in the <span className="text-blue-600">industry</span>
        </h1>
        <p className={`${textZinc600} text-lg mb-8`}>
            Our landing page template works on all devices, so you only have to set it up once, and get beautiful results forever.
        </p>
        <button className={`${buttonBlue} py-3 px-6 rounded-lg mb-6`}>Post a job - $299</button>
        <div className={`${textZinc600} text-sm mb-6`}>Reach 100K+ Professionals</div>
        <div className="flex justify-center space-x-2 mb-6">
            {['User 1', 'User 2', 'User 3', 'User 4'].map(user => (
                <UserImage key={user} src={`https://placehold.co/40x40`} alt={user} />
            ))}
        </div>
       
    </main>
);

// Main component
const LandingPage = () => {
    return (
        <div className="bg-gradient-to-r from-blue-200 to-purple-200">
            <Navbar />
            <Main />
            
        </div>
    );
};

export default LandingPage;
