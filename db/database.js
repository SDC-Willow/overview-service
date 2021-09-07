const db = require('./login.js');

db.authenticate().then(() => console.log('connected to db')).catch((err) => console.log(err));