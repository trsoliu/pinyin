import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Learning from './pages/Learning';
import Practice from './pages/Practice';
import Test from './pages/Test';
import Report from './pages/Report';
import ParentDashboard from './pages/ParentDashboard';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <HashRouter>
      <div className="min-h-screen bg-[#FFF8F0] flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/learning" element={<Learning />} />
            <Route path="/practice" element={<Practice />} />
            <Route path="/test" element={<Test />} />
            <Route path="/report" element={<Report />} />
            <Route path="/parent" element={<ParentDashboard />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </HashRouter>
  );
};

export default App;