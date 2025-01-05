const express = require('express');

const errorsRouter = express.Router();

errorsRouter.use((req, res) => {
    res.render("errors/404");
});

module.exports = errorsRouter;