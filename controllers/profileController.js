const mysql = require('mysql');

// Connection Pool
const db  = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

// View Projects
exports.viewprofile = (req, res) => {
  db.query('SELECT * FROM ai_lab.participant WHERE id_participant = ?', [req.params.id_participant], (err, results) => {
    if (!err) {
      res.render('profile', { results });
    } else {
      console.log(err);
    }
  });
}

exports.editProf = (req, res) => {
  db.query('SELECT * FROM ai_lab.participant WHERE id_participant = ?',  [req.params.id_participant], (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      //let removedUser = req.query.removed;
      res.render('editprofile', { rows });
    } else {
      console.log(err);
    }
    //console.log('The data from participant table: \n', rows);
  });
}

// Update 
exports.updateProf = (req, res) => {
  const name = req.body.name;
  const lastname = req.body.lastname;
  const description = req.body.description;
  const reserches = req.body.reserches;
  const username = req.body.username;
  const password = req.body.password;
  //const role = req.body.role;

  if(name!=0 && lastname!=0  && username!= 0  &&  password!=0 ){

    if(username.length >= 10 && password.length >= 10){
      // User the connection
      db.query('UPDATE ai_lab.participant SET name = ?, lastname = ?, description = ?, reserches = ?, username = ?, password = ? WHERE id_participant = ?', 
      [name, lastname, description, reserches, username, password, req.params.id_participant], (err, rows) => {
        if (!err) {
          // User the connection
          db.query('SELECT * FROM ai_lab.participant WHERE id_participant = ?', [req.params.id_participant], (err, rows) => {
            if (!err) {
              res.render('editprofile', { rows, alert: `Participant "${name}" has been updated.` });
            } else {
              console.log(err);
            }
          });
        } else {
          console.log(err);
        }
        //console.log('The data from user table: \n', rows);
      });
    }else{
      db.query('SELECT * FROM ai_lab.participant WHERE id_participant = ?', [req.params.id_participant], (err, rows) => {
        if (!err) {
          res.render('editprofile', { rows, alertProblem: 'You have set less than 10 characters when editing the "username" and "password" fields! Please edit again!!' });
        } else {
          console.log(err);
        }
      });
    }

  } else{
    db.query('SELECT * FROM ai_lab.participant WHERE id_participant = ?', [req.params.id_participant], (err, rows) => {
      if (!err) {
        res.render('editprofile', { rows, alertProblem: 'Тhe fields "name", "lastname", "username" and "password" cannot be left empty! Please edit again!' });
      } else {
        console.log(err);
      }
    });
  }  
}
