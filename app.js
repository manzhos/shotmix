// import { Sequelize, DataTypes } from 'sequelize';
const express    = require('express')
const mysql      = require('mysql2');
const cors       = require('cors');
const bodyParser = require('body-parser');
const app        = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.urlencoded({extended: true}));
// app.use(express.json());

require('dotenv').config();
const port    = process.env.PORT;
const db      = process.env.DB;
const db_user = process.env.DB_USER;
const db_pass = process.env.DB_PASS;
const db_host = process.env.DB_HOST;
const db_port = process.env.DB_PORT;

////////////////////////////
// sequelize mySQL connection
// const sequelize = new Sequelize('sqlite::memory:');

// mySQL database connection

const conn = mysql.createConnection({
  host      : db_host,
  port      : db_port,
  user      : db_user,
  database  : db,
  password  : db_pass
});

// connection start
conn.connect(function(err){
  if (err) { return console.error("Error: " + err.message); }
  else     { console.log(`Connection to server MySQL successful. Database: ${db}, Port: ${port}`); }
});

// connection closing
// connection.end(function(err) {
//   if (err) {
//     return console.log("Error: " + err.message);
//   }
//   console.log("Connection closed");
// });

// routes
//add new user
app.post('/reg', (req, res) => {
  let data = req.body;
  console.log('data:', data);
  // res.send(JSON.stringify({"status": 200, "error": null, "response": "results"})); // tmp line
  let sql = "INSERT INTO users SET ?";
  let query = conn.query(sql, data, (err, results) => {
    if(err) throw err;
    console.log('results:', results);
    res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
  });
});

// // connection test route
// app.get('',(req, res)=>{
//   console.log('get:', req);
//   res.send(JSON.stringify({"status": 200, "error": null, "response": 'results'})); // tmp line
// });

// start server
app.listen(port, () => {
  console.log(`the server has been started on ${port}`);
});
