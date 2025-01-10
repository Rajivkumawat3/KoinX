const Crypto = require('../models/Crypto');
const { calculateStandardDeviation } = require('../utils/calculateDeviation');


const getCryptoStats = async (req, res) => {
    try {
        const { coin } = req.query;
        if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
            return res.status(400).json({ error: 'Invalid coin parameter' });
        }

        const latestData = await Crypto.findOne({ coin }).sort({ createdAt: -1 }).limit(1);
        if (!latestData) {
            return res.status(404).json({ error: 'Data not found for this coin' });
        }

        res.json({
            price: latestData.price,
            marketCap: latestData.marketCap,
            "24hChange": latestData.change24h,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};


const getCryptoDeviation = async (req, res) => {
    try {
        const { coin } = req.query;
        if (!coin || !['bitcoin', 'matic-network', 'ethereum'].includes(coin)) {
            return res.status(400).json({ error: 'Invalid coin parameter' });
        }

        const records = await Crypto.find({ coin }).sort({ createdAt: -1 }).limit(100);
        if (records.length === 0) {
            return res.status(404).json({ error: 'No data found for this coin' });
        }

        const prices = records.map(record => record.price);
        const deviation = calculateStandardDeviation(prices);

        res.json({ deviation});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};

module.exports = { getCryptoStats, getCryptoDeviation };
