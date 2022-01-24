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
  db.query('SELECT name, lastname, role, project.name_project, project.description, participant_project.project_id_project,\
  participant_project.participant_id_participant FROM ai_lab.participant \
  join participant_project on participant_project.participant_id_participant=participant.id_participant\
  join project on project.id_project=participant_project.project_id_project', 
  (err, rows) => {
    if (!err) {
      let removedPP = req.query.removed;
      res.render('partic_proj', { rows, removedPP});
    } else {
      console.log(err);
    }
    //console.log('The data from participant table: \n', rows);
  });
}

exports.formP_proj = (req, res) => {
    //res.render('addpartic_proj');
    db.query('SELECT * FROM ai_lab.project', (err, rows) => {
    if (!err) {
      res.render('addpartic_proj', { rows});
    } else {
      console.log(err);
    }
    //console.log('The data from participant table: \n', rows);
  });
}

exports.addP_proj = (req, res) => {
    const id_project = req.body.id_project;
    const id_participant = req.body.id_participant; 
    //let searchTerm = req.body.search;
    if(id_project!=0 && id_participant!= 0){
        db.query('INSERT INTO participant_project SET project_id_project = ?, participant_id_participant = ?', [id_project, id_participant], (err, rows) => {
          if (!err) {
            res.render('addpartic_proj', { alert: 'Added successfully.' });
          } else {
            console.log(err);
          }
        }); 
    }else{
      return res.render('addpartic_proj', { alertProblem: 'Please check that you have filled fields!' });
    }  
}

// Delete Participant
exports.deleteP_Proj = (req, res) => {
    // User the connection
     db.query('DELETE FROM ai_lab.participant_project WHERE participant_id_participant =? AND project_id_project = ?', [req.params.participant_id_participant, req.params.project_id_project], (err, rows) => {
      if(!err) {
        let removedPP = encodeURIComponent('Project successeflly removed.');
        res.redirect('/partic_proj?removed=' + removedPP);
      } else {
       console.log(err);
      }
     //console.log('The data from user table: \n', rows);
   });
}