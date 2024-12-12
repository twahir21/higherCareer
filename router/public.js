const express = require("express");

const publicRouter = express.Router();


publicRouter.get("/parent-register", (req, res) => {
    res.render('auth/parent-register')
});

publicRouter.get("/teacher-register", (req, res) => {
    res.render('auth/teacher-register')
});

publicRouter.get("/faq", (req, res) => {
    res.render("layout/faq")
})

publicRouter.get("/vision", (req, res) => {
    res.render("layout/vision")
});

publicRouter.get("/news&announcements", (req, res) => {
    res.render(("layout/news"))
});

publicRouter.get("/primary-fees", (req, res) => {
    res.render("layout/primary-fees")
})

publicRouter.get('/', (req, res) => {
    res.render("index");
});

publicRouter.use((req, res) => {
    res.render("errors/404");
});

module.exports = publicRouter;