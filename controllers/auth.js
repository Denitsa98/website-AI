const mysql = require('mysql');
const bcrypt = require('bcryptjs');

const db = mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE
});

exports.login = (req, res) => {
    console.log(req.body);
    const username = req.body.username;
    const password = req.body.password;

    db.query("SELECT * FROM participant WHERE username = ? and password= ? ", [username, password], async(error, results)=> {
       if(error){
           console.log(error);
       } 
       
       if (results.length > 0 && results[0].role === "admin"){
           res.redirect("/welcome");
       }
       else if (results.length > 0 ){
           return res.render('profile', {results});
       }
       else if (results.length === 0){
           return res.render("login", {
               message: 'A user with such a username and password does not exist, please check that you have entered the data correctly!'
            });
        }
       res.end();

       let hashedPassword = await bcrypt.hash(password, 8);
       console.log(hashedPassword); 
    });   
}