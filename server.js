const express = require('express');
const connectDB = require('./config/database');
const cryptoRoutes = require('./routes/cryptoRoutes');
require('dotenv').config();
const { startJob } = require('./jobs/fetchCryptoData');
const app = express();
app.use(express.json());

connectDB();
startJob();

app.use('/api', cryptoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
