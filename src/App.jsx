import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './Components/Sidebar';
import Dashboard from './pages/Dashboard';
import ArticleManagement from './pages/Article';
import BlogManagement from './pages/Blog';
import CareerManagement from './pages/Career';
import CityStateCountry from './pages/citystatecountry';
import { Box, CssBaseline } from '@mui/material';

function App() {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Function to handle sidebar toggle
  const handleSidebarToggle = () => {
    setIsSidebarCollapsed(!isSidebarCollapsed);
  };

  return (
    <Router>
      <CssBaseline />
      <Box sx={{ display: 'flex' }}>
        <Sidebar isCollapsed={isSidebarCollapsed} onToggle={handleSidebarToggle} />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            transition: 'margin-left 0.3s ease',
            marginLeft: isSidebarCollapsed ? '80px' : '240px', // Adjust based on collapse state
          }}
        >
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/articles" element={<ArticleManagement />} />
            <Route path="/blogs" element={<BlogManagement />} />
            <Route path="/careers" element={<CareerManagement />} />
            <Route path="/city-state-country" element={<CityStateCountry />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
