const {ImageView, TextInput, Button, TextView, ui, Page, NavigationView} = require('tabris');
const mysql = require('mysql');

// First you need to create a connection to the db
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'silastik'
});

// con.connect((err) => {
//   if(err){
//     console.log('Error connecting to Db');
//     return;
//   }
//   console.log('Connection established');
// });

// con.end((err) => {
//   // The connection is terminated gracefully
//   // Ensures all previously enqueued queries are still
//   // before sending a COM_QUIT packet to the MySQL server.
// });

con.query('SELECT kode_kegiatan, alias FROM master_kode_kegiatan', (err,rows) => {
  if(err) throw err;

  console.log('Data received from Db:\n');
  console.log(rows);

  rows.forEach( (row) => {
  	console.log(row.alias);
	});
});