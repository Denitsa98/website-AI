const mysql = require('mysql');

// Connection Pool
const db  = mysql.createConnection({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE
});

// View Projects
exports.view = (req, res) => {
  db.query('SELECT * FROM ai_lab.project', (err, rows) => {
    if (!err) {
      let removedProject = req.query.removed;
      res.render('projects', { rows,  removedProject });
    } else {
      console.log(err);
    }
    console.log('The data from participant table: \n', rows);
  });
}


exports.find = (req, res) => {
  let searchTerm = req.body.search;
  // User the connection
  db.query('SELECT * FROM ai_lab.project WHERE name_project LIKE ? OR description LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
    if (!err) {
      res.render('projects', { rows });
    } else {
      console.log(err);
    }
  });
}

exports.formProj = (req, res) => {
  res.render('addproject');
}

// Add new project
exports.addProj = (req, res) => {
  const name = req.body.name_project;
  const description = req.body.description;

  if(name!=0 && description!= 0 ){
      // User the connection
      db.query('INSERT INTO ai_lab.project SET name_project = ?, description = ?', [name, description], (err, rows) => {
        if (!err) {
          res.render('addproject', { alert: 'Project add successfully.' });
        } else {
          console.log(err);
        }
      });

  }else{
    return res.render('addproject', { alertProblem: 'Please check that you have filled all fields!' });
  }  
}

// Edit Project
exports.editProj = (req, res) => {
  db.query('SELECT * FROM ai_lab.project WHERE id_project = ?',  [req.params.id_project], (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      //let removedUser = req.query.removed;
      res.render('edit-project', { rows });
    } else {
      console.log(err);
    }
  });
}

// Update Project
exports.updateProj = (req, res) => {
  const name = req.body.name_project;
  const description = req.body.description;

  if(name!=0 && description!=0){
      // User the connection
      db.query('UPDATE ai_lab.project SET name_project = ?, description = ? WHERE id_project= ?',[name, description, req.params.id_project], (err, rows) => {
        if (!err) {
          // User the connection
          db.query('SELECT * FROM ai_lab.project WHERE id_project = ?', [req.params.id_project], (err, rows) => {
            // When done with the connection, release it
            if (!err) {
              res.render('edit-project', { rows, alert: `Project "${name}" has been updated.` });
            } else {
              console.log(err);
            }
          });
        } else {
          console.log(err);
        }
      });    
  } else{
    db.query('SELECT * FROM ai_lab.project WHERE id_project = ?', [req.params.id_project], (err, rows) => {
      if (!err) {
        res.render('edit-project', { rows, alertProblem: 'Тhe fields cannot be left empty! Please edit again!' });
      } else {
        console.log(err);
      }
    });
  }  
}

// Delete Participant
exports.deleteProj = (req, res) => {
  // User the connection
   db.query('DELETE FROM ai_lab.project WHERE id_project = ?', [req.params.id_project], (err, rows) => {
    if(!err) {
      let removedProject = encodeURIComponent('Project successeflly removed.');
      res.redirect('/projects?removed=' + removedProject);
    } else {
     console.log(err);
    }
   //console.log('The data from user table: \n', rows);
 });
}