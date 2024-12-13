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

publicRouter.get('/', (req, res) => {
    res.render("index");
});

publicRouter.use((req, res) => {
    res.render("errors/404");
});

module.exports = publicRouter;