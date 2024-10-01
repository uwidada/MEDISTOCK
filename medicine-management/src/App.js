import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import MedicineCategoryForm from './components/MedicineCategoryForm';
import MedicineForm from './components/MedicineForm';
import MedicineTable from './components/MedicineTable';
import StockTable from './components/StockTable';
import PurchaseForm from './components/purchase';
import LoginForm from './components/login ';
import Sidebar from './components/sidebar';
import Dashboard from './components/dashboard';
import Sample from './components/Sample';
import SignUpForm from './components/registration';

function App() {
  // Initialize login state based on localStorage directly
  const [isLoggedIn, setIsLoggedIn] = useState(() => localStorage.getItem('isLoggedIn') === 'true');

  // Function to handle login success
  const handleLogin = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Store login state in local storage
  };

  // Function to handle logout
  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Remove login state from local storage
  };

  return (
    <Router>
      <div className="flex font-poppins">
        {/* Conditional rendering based on login status */}
        {isLoggedIn ? (
          <>
            {/* Sidebar for logged-in users */}
            <div className="w-3/12">
              <Sidebar onLogout={handleLogout} /> {/* Pass logout handler to Sidebar */}
            </div>

            {/* Main content for logged-in users */}
            <div className="w-9/12">
              <Routes>
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/categoryform" element={<MedicineCategoryForm />} />
                <Route path="/Sign-Up" element={<SignUpForm />} />
                <Route path="/medicineform" element={<MedicineForm />} />
                <Route path="/transaction/purchase" element={<PurchaseForm />} />
                <Route path="/medicinetable" element={<MedicineTable />} />
                <Route path="/stocktable" element={<StockTable />} />
                <Route path="/sample" element={<Sample />} />
                {/* Redirect unknown routes to the dashboard */}
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Routes>
            </div>
          </>
        ) : (
          <div className="w-full">
            {/* Login Page for users who are not logged in */}
            <Routes>
              {/* Show Login page on root route */}
              <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
              {/* Allow users to access registration */}
              <Route path="/registration" element={<SignUpForm />} />
              {/* Redirect unknown paths to login */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        )}
      </div>
    </Router>
  );
}

export default App;
