const mysql = require('mysql');

// Connection Pool
const db  = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

// View Users
exports.view = (req, res) => {
  db.query('SELECT * FROM ai_lab.participant', (err, rows) => {
    if (!err) {
      let removedUser = req.query.removed;
      res.render('welcome', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from participant table: \n', rows);
  });
}

// Find User by Search
exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  db.query('SELECT * FROM participant WHERE name LIKE ? OR lastname LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('welcome', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}

exports.form = (req, res) => {
  res.render('adduser');
}


// Add new user
exports.create = (req, res) => {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const description = req.body.description;
  const reserches = req.body.reserches;
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;
  let searchTerm = req.body.search;

  if(name!=0 && lastname!=0  && username!= 0  &&  password!=0  && role != 0 ){
   
    if(username.length >= 10 && password.length >= 10){
      // User the connection
      db.query('INSERT INTO participant SET name = ?, lastname = ?, description = ?, reserches = ?, username = ?, password = ?, role = ?', [name, lastname, description, reserches, username, password, role], (err, rows) => {
        if (!err) {
          res.render('adduser', { alert: 'User added successfully.' });
        } else {
          console.log(err);

        }
        console.log('The data from user table: \n', rows);
      });
    }else{
      return res.render('adduser', { alertProblem: 'Please enter a username and password of at least 10 characters!' });
    } 

  }else{
    return res.render('adduser', { alertProblem: 'Please check that you have filled in the required fields! (name, lastname, username, password and role)' });
  }  
}


// Edit Participant
exports.edit = (req, res) => {
  db.query('SELECT * FROM ai_lab.participant WHERE id_participant = ?',  [req.params.id_participant], (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      //let removedUser = req.query.removed;
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from participant table: \n', rows);
  });
}

// Update Participant
exports.update = (req, res) => {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const description = req.body.description;
  const reserches = req.body.reserches;
  const username = req.body.username;
  const password = req.body.password;
  const role = req.body.role;

  if(name!=0 && lastname!=0  && username!= 0  &&  password!=0  && role != 0 ){

    if(username.length >= 10 && password.length >= 10){
      // User the connection
      db.query('UPDATE ai_lab.participant SET name = ?, lastname = ?, description = ?, reserches = ?, username = ?, password = ?, role = ? WHERE id_participant = ?', 
      [name, lastname, description, reserches, username, password, role, req.params.id_participant], (err, rows) => {
        if (!err) {
          // User the connection
          db.query('SELECT * FROM ai_lab.participant WHERE id_participant = ?', [req.params.id_participant], (err, rows) => {
            // When done with the connection, release it
            
            if (!err) {
              res.render('edit-user', { rows, alert: `Participant "${name}" has been updated.` });
            } else {
              console.log(err);
            }
            console.log('The data from user table: \n', rows);
          });
        } else {
          console.log(err);
        }
        console.log('The data from user table: \n', rows);
      });
    }else{
      db.query('SELECT * FROM ai_lab.participant WHERE id_participant = ?', [req.params.id_participant], (err, rows) => {
        // When done with the connection, release it
        if (!err) {
          res.render('edit-user', { rows, alertProblem: 'You have set less than 10 characters when editing the "username" and "password" fields! Please edit again!!' });
        } else {
          console.log(err);
        }
      });
    }

  } else{
    db.query('SELECT * FROM ai_lab.participant WHERE id_participant = ?', [req.params.id_participant], (err, rows) => {
      // When done with the connection, release it
      if (!err) {
        res.render('edit-user', { rows, alertProblem: 'Тhe fields "name", "lastname", "username", "password" and "role" cannot be left empty! Please edit again!' });
      } else {
        console.log(err);
      }
    });
  }  
}


// Delete Participant
exports.delete = (req, res) => {
  // User the connection
   db.query('DELETE FROM ai_lab.participant WHERE id_participant = ?', [req.params.id_participant], (err, rows) => {
    if(!err) {
      let removedUser = encodeURIComponent('User successeflly removed.');
      res.redirect('/welcome?removed=' + removedUser);
    } else {
     console.log(err);
    }
   //console.log('The data from user table: \n', rows);
 });
}


// View Participant
exports.viewallinfo = (req, res) => {
  // User the connection
  db.query('SELECT * FROM ai_lab.participant WHERE id_participant = ?', [req.params.id_participant], (err, rows) => {
    if (!err) {
      res.render('viewuser', { rows });
    } else {
      console.log(err);
    }
  });
}