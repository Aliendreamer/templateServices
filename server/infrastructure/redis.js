const Redis = require('ioredis');

const redisClient = new Redis({
	port: process.env.REACT_APP_REDIS_PORT, // Redis port
	host: process.env.REACT_APP_REDIS_HOST, // Redis host
	db: 0, // Defaults to 0
});

module.exports = redisClient;