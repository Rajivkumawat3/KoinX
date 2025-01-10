
const axios = require('axios');
const cron = require('node-cron');
const CryptoData = require('../models/Crypto');

const COINGECKO_API_URL = 'https://api.coingecko.com/api/v3/simple/price';

const fetchCryptoData = async () => {
  try {
    
    const { data } = await axios.get(COINGECKO_API_URL, {
      params: {
        ids: 'bitcoin,matic-network,ethereum',
        vs_currencies: 'usd',
        include_market_cap: 'true',
        include_24hr_change: 'true',
      },
    });

    const cryptoData = [
      {
        coin: 'bitcoin',
        price: data.bitcoin.usd,
        marketCap: data.bitcoin.usd_market_cap,
        change24h: data.bitcoin.usd_24h_change,
      },
      {
        coin: 'matic-network',
        price: data['matic-network'].usd,
        marketCap: data['matic-network'].usd_market_cap,
        change24h: data['matic-network'].usd_24h_change,
      },
      {
        coin: 'ethereum',
        price: data.ethereum.usd,
        marketCap: data.ethereum.usd_market_cap,
        change24h: data.ethereum.usd_24h_change,
      },
    ];

    const currentTime = new Date();


    const existingData = await CryptoData.findOne({
      createdAt: { $gte: new Date(currentTime.getTime() - 2 * 60 * 60 * 1000) },
      coin: { $in: cryptoData.map(item => item.coin) }
    });

    if (existingData) {
      return;
    }

    await CryptoData.insertMany(cryptoData);
    console.log('Crypto data fetched and stored:', cryptoData);

  } catch (error) {
    console.error('Error fetching crypto data:', error.message);
  }
};

const startJob = () => {
  try {
    cron.schedule('0 */2 * * *', fetchCryptoData); 
    fetchCryptoData(); 
  } catch (error) {
    console.error('Error scheduling job:', error.message);
  }
};

module.exports = { startJob };
