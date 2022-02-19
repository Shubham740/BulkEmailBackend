let mysql = require('mysql');

let dbConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bulk_mailer_db'
});

dbConnection.connect(function(err) {
    if (err) {
      return console.error('error: ' + err.message);
    }
  
    console.log('Connected to the MySQL server.');
  })

  exports.dbConnection =dbConnection;
  