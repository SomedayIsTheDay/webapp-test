module.exports = {
    development: {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: 'balance_api_development',
        host: '127.0.0.1',
        dialect: 'postgres'
    },
};
