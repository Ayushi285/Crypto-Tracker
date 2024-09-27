import React, { useContext } from 'react';
import styled from 'styled-components';
import { CryptoContext } from '../context/CryptoContext';
import { formatPrice } from '../utils/format';

const HomePageContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled.h1`
  text-align: center;
  color: #61dafb;
  margin-bottom: 40px;
`;

const CryptoList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const CryptoCard = styled.div`
  background: #282c34;
  border-radius: 10px;
  padding: 20px;
  width: 250px;
  margin-bottom: 20px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-10px);
  }
`;

const CryptoLogo = styled.img`
  width: 50px;
  height: 50px;
  margin-bottom: 10px;
`;

const CryptoName = styled.h2`
  color: #fff;
`;

const CryptoPrice = styled.p`
  color: #61dafb;
  font-size: 20px;
`;

const PriceChange = styled.p`
  color: ${(props) => (props.isPositive ? '#4caf50' : '#f44336')};
  font-size: 16px;
`;

const HomePage = () => {
  const { cryptos } = useContext(CryptoContext);

  return (
    <HomePageContainer>
      <Title>Top Cryptocurrencies</Title>
      <CryptoList>
        {cryptos.map((crypto) => (
          <CryptoCard key={crypto.id}>
            <CryptoLogo src={crypto.logo_url} alt={crypto.name} />
            <CryptoName>{crypto.name}</CryptoName>
            <CryptoPrice>{formatPrice(crypto.price)}</CryptoPrice>
            <PriceChange isPositive={crypto.price_change_24h > 0}>
              {crypto.price_change_24h > 0 ? '+' : ''}
              {crypto.price_change_24h}% (24h)
            </PriceChange>
          </CryptoCard>
        ))}
      </CryptoList>
    </HomePageContainer>
  );
};

export default HomePage;
