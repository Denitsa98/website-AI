const express = require('express');

const router = express.Router();

const userController = require('../controllers/userController');
const projectsController = require('../controllers/projectsController');
const partic_projController = require('../controllers/partic_projController');
const profileController = require('../controllers/profileController');


router.get("/", (req, res) => {
    res.render("index")
    //res.sendFile(__dirname + "/views/header.html");
});

router.get("/index", (req, res) => {
    res.render("index")
});

router.get("/login", (req, res) => {
    res.render("login")
});

router.get("/profile", (req, res) => {
    res.render("profile")
});

/*router.get("/welcome", (req, res) => {
    res.render("welcome")
});*/

router.get("/01", (req, res) => {
    res.render("01") 
});

router.get("/02", (req, res) => {
    res.render("02")
});

router.get("/03", (req, res) => {
    res.render("03")
});

router.get("/04", (req, res) => {
    res.render("04")
});

router.get("/05", (req, res) => {
    res.render("05")
});

router.get("/06", (req, res) => {
    res.render("06")
});

router.get("/07", (req, res) => {
    res.render("07")
});

router.get('/adduser', userController.form);
router.post('/adduser', userController.create);

router.get('/edit-user/:id_participant', userController.edit);
router.post('/edit-user/:id_participant', userController.update);

router.get('/viewuser/:id_participant', userController.viewallinfo);
//router.get('/:id_participant', userController.delete);

router.get('/projects', projectsController.view);
router.get('/addproject', projectsController.formProj);
router.post('/addproject', projectsController.addProj);

router.get('/edit-project/:id_project', projectsController.editProj);
router.post('/edit-project/:id_project', projectsController.updateProj);

router.get('/partic_proj', partic_projController.view);
router.get('/addpartic_proj', partic_projController.formP_proj);
router.post('/addpartic_proj', partic_projController.addP_proj);


router.get('/editprofile/:id_participant', profileController.editProf);
router.post('/editprofile/:id_participant', profileController.updateProf);

module.exports = router;