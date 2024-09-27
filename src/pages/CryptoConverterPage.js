import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { getConversionRate } from '../services/api';
import { CryptoContext } from '../context/CryptoContext';
import { formatPrice } from '../utils/format';

const ConverterContainer = styled.div`
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 80vh;
`;

const ConverterTitle = styled.h2`
  margin-bottom: 20px;
  color: #61dafb;
`;

const ConverterForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 300px;

  label {
    margin: 10px 0;
  }

  select, input {
    padding: 8px;
    font-size: 16px;
    margin-bottom: 10px;
  }

  button {
    background-color: #282c34;
    color: white;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #61dafb;
    }
  }
`;

const Result = styled.div`
  margin-top: 20px;
  font-size: 20px;
  color: #282c34;
`;

const Dropdown = styled.select`
  padding: 10px;
  margin: 10px;
  font-size: 16px;
  background-color: white;
  border-radius: 5px;
  border: 1px solid #ccc;
  &:focus {
    border-color: #61dafb;
    outline: none;
  }
`;

const CryptoConverterPage = () => {
  const { cryptos } = useContext(CryptoContext);
  const [fromCrypto, setFromCrypto] = useState('');
  const [toCrypto, setToCrypto] = useState('');
  const [amount, setAmount] = useState(1);
  const [conversionResult, setConversionResult] = useState(null);

  useEffect(() => {
    if (cryptos.length > 0) {
      setFromCrypto(cryptos[0].id);
      setToCrypto(cryptos[1].id);
    }
  }, [cryptos]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!fromCrypto || !toCrypto || !amount) return;

    try {
      const result = await getConversionRate(fromCrypto, toCrypto);
      setConversionResult(result.quote[toCrypto].price * amount);
    } catch (error) {
      console.error('Error during conversion:', error);
    }
  };

  return (
    <ConverterContainer>
      <ConverterTitle>Convert Cryptocurrencies</ConverterTitle>
      <ConverterForm onSubmit={handleSubmit}>
        <label htmlFor="from">From:</label>
        <Dropdown id="from" value={fromCrypto} onChange={(e) => setFromCrypto(e.target.value)}>
          {cryptos.map(crypto => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.name}
            </option>
          ))}
        </Dropdown>

        <label htmlFor="to">To:</label>
        <Dropdown id="to" value={toCrypto} onChange={(e) => setToCrypto(e.target.value)}>
          {cryptos.map(crypto => (
            <option key={crypto.id} value={crypto.id}>
              {crypto.name}
            </option>
          ))}
        </Dropdown>

        <label htmlFor="amount">Amount:</label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />

        <button type="submit">Convert</button>
      </ConverterForm>

      {conversionResult !== null && (
        <Result>
          {formatPrice(conversionResult)} {cryptos.find((crypto) => crypto.id === toCrypto)?.symbol}
        </Result>
      )}
    </ConverterContainer>
  );
};

export default CryptoConverterPage;
