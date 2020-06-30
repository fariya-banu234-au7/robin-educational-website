const sequelize = require("sequelize");


const db = new sequelize("amigos", "postgres", "postgres", {
    host: "localhost",
    dialect: "postgres"
})

db.authenticate()
    .then(() => console.log("db connection is established"));

db.sync().then(() => {
    console.log("tables are synchronised")
})


module.exports = db;