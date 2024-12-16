const express = require("express");

const publicRouter = express.Router();

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

publicRouter.get("/nursery-fees", (req, res) => {
    res.render("layout/nursery-fees")
})

publicRouter.get("/contact-us", (req, res) => {
    res.render("layout/contact-us")
})

publicRouter.get("/privacy-policy", (req, res) => {
    res.render("layout/privacy")
})

publicRouter.get("/terms", (req, res) => {
    res.render("layout/terms")
})

publicRouter.get("/nursery-join", (req, res) => {
    res.render("layout/nursery-join")
})
publicRouter.get("/primary-join", (req, res) => {
    res.render("layout/primary-join")
})





publicRouter.get("/about-us", (req, res) => {
    res.render("layout/about")
})

publicRouter.get('/', (req, res) => {
    res.render("index");
});

publicRouter.use((req, res) => {
    res.render("errors/404");
});

module.exports = publicRouter;