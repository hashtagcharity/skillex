module.exports = {
    server: {
        port: process.env.SERVER_PORT
    },
    db: {
        store: {
            host: process.env.DATABASE_PORT_27017_TCP_ADDR,
        },
        name: "charity"
    }
}
