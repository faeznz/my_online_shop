import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'
import Homepage from './pages/home/Homepage';
import DashboardCmsPage from './pages/cms/dashboard/DashboardCms';
import SigninPage from './pages/auth/Signin';
import SignupPage from './pages/auth/Signup';
import ConfirmEmailPage from './pages/auth/ConfirmEmail';
import ProductsCmsPage from './pages/cms/products/ProductsCms';
import CompanyPage from './pages/company/CompanyPage';
import TeamCmsPage from './pages/cms/team/TeamCms';
import FAQCmsPage from './pages/cms/faq/FAQCms';
import RequireAuth from './middleware/RequireAuth';

function App() {
  return (
    <Router>
      <Routes>
        {/* PAGE */}
        <Route path="/" element={<Homepage />} />
        <Route path="/tentang" element={<CompanyPage />} />

        {/* AUTH */}
        <Route path="/signin" element={<SigninPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/ConfirmEmail" element={<ConfirmEmailPage />} />

        <Route path="/cms/*" element={
          <RequireAuth> 
            <Routes> {/* Nested routes untuk halaman CMS */}
              <Route path="dashboard" element={<DashboardCmsPage />} />
              <Route path="product" element={<ProductsCmsPage />} />
              <Route path="team" element={<TeamCmsPage />} />
              <Route path="faq" element={<FAQCmsPage />} />
            </Routes>
          </RequireAuth>
        } />
      </Routes>
    </Router>
  )
}

export default App
