const calculateStandardDeviation = (numbers) => {
    const n = numbers.length;
    const mean = numbers.reduce((acc, curr) => acc + curr, 0) / n;
    const squaredDifferences = numbers.map(num => Math.pow(num - mean, 2));
    const variance = squaredDifferences.reduce((acc, curr) => acc + curr, 0) / n;
    return Math.sqrt(variance);
};

module.exports = { calculateStandardDeviation };
