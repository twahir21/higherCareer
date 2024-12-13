const express = require("express");

const adminRouter = express.Router();

adminRouter.get("/admin", (req, res) => {
    res.render("admin/index");
}); 

module.exports = adminRouter;