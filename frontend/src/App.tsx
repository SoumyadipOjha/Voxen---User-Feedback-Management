import { Routes, Route } from 'react-router-dom';
import { Box } from '@chakra-ui/react';
import { Navbar } from './components/Layout/Navbar';
import { FeedbackForm } from './pages/FeedbackForm';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <Box minH="100vh" bg="gray.50">
      <Navbar />
      <Routes>
        <Route path="/" element={<FeedbackForm />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Box>
  );
}

export default App;