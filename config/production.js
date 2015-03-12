module.exports = {
    server: {
        port: process.env.SERVER_PORT
    },
    db: {
        store: {
            host: process.env.DATABASE_HOST,
            port: process.env.DATABASE_PORT
        },
        name: "charity"
    }
};
