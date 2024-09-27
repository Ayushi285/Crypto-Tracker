import React, { createContext, useState, useEffect } from 'react';
import { getCryptos } from '../services/api';

export const CryptoContext = createContext();

const CryptoProvider = ({ children }) => {
  const [cryptos, setCryptos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCryptos();
      setCryptos(data);
    };
    fetchData();
  }, []);

  return (
    <CryptoContext.Provider value={{ cryptos }}>
      {children}
    </CryptoContext.Provider>
  );
};

export default CryptoProvider;
