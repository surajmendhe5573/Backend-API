const commonConstants = require('./constant');

let environmentConfig;

if (process.env.NODE_ENV === 'production') {
    environmentConfig = require('./production.constant');
} else if (process.env.NODE_ENV === 'qa') {
    environmentConfig = require('./qa.constant');
} else if (process.env.NODE_ENV === 'local') {
    environmentConfig = require('./local.constant');
} else {
    environmentConfig = require('./develop.constant');
}

const keys = {
    JWT_SECRET: process.env.JWT_SECRET || 'your-jwt-secret-key',
    API_KEY: process.env.API_KEY || 'your-api-key'
};

const config = {
    ...commonConstants,
    ...environmentConfig,
    ...keys
};

module.exports = config;
