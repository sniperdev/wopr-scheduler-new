const {createConnection} = require("mysql2")
require('dotenv').config();


const mysqlConnection = createConnection({
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	database: process.env.DATABASE,
	port: process.env.PORT,
	multipleStatements: true,
})

module.exports = mysqlConnection;