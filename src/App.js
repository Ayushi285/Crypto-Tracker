import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import CryptoConverterPage from './pages/CryptoConverterPage';
import CryptoProvider from './context/CryptoContext';
import GlobalStyles from './styles/GlobalStyles';

function App() {
  return (
    <CryptoProvider>
      <GlobalStyles />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/convert" element={<CryptoConverterPage />} />
        </Routes>
      </Router>
    </CryptoProvider>
  );
}

export default App;
