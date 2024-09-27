import axios from 'axios';

const API_KEY = 'YOUR_COINMARKETCAP_API_KEY'; // Replace with your CoinMarketCap API Key
const BASE_URL = 'https://coinmarketcap.com/api/';

const headers = {
  'X-CMC_PRO_API_KEY': API_KEY,
};

export const getCryptos = async () => {
  try {
    const response = await axios.get(`${BASE_URL}cryptocurrency/listings/latest`, {
      headers,
      params: {
        start: '1',
        limit: '10',
        convert: 'USD',
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching cryptocurrencies:', error);
    return [];
  }
};

export const getConversionRate = async (fromCrypto, toCrypto) => {
  try {
    const response = await axios.get(`${BASE_URL}tools/price-conversion`, {
      headers,
      params: {
        amount: 1,
        id: fromCrypto,
        convert: toCrypto,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Error fetching conversion rate:', error);
    return null;
  }
};
