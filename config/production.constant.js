module.exports = {
    PORT: process.env.PORT || 80,
    MONGO_URI: process.env.MONGO_URI || "mongodb://production-db:27017/xyx",
    SecretKey: process.env.SecretKey || "production-secret-key"
};


