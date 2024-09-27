import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { getConversionRate } from '../services/api';
import { CryptoContext } from '../context/CryptoContext';
import { formatPrice } from '../utils/format';

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
`;

const Form = styled.form`
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
`;

const Result = styled.p`
  margin-top: 20px;
  font-size: 20px;
  color: #282c34;
`;

const ConverterForm = () => {
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
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="from">From:</label>
        <select id="from" value={fromCrypto} onChange={(e) => setFromCrypto(e.target.value)}>
          {cryptos.map(crypto => (
            <option key={crypto.id} value={crypto.id}>{crypto.name}</option>
          ))}
        </select>

        <label htmlFor="to">To:</label>
        <select id="to" value={toCrypto} onChange={(e) => setToCrypto(e.target.value)}>
          {cryptos.map(crypto => (
            <option key={crypto.id} value={crypto.id}>{crypto.name}</option>
          ))}
        </select>

        <label htmlFor="amount">Amount:</label>
        <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />

        <button type="submit">Convert</button>
      </Form>

      {conversionResult !== null && (
        <Result>{formatPrice(conversionResult)} {cryptos.find(crypto => crypto.id === toCrypto)?.symbol}</Result>
      )}
    </FormContainer>
  );
};

export default ConverterForm;
