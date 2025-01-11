const express = require("express");
const authRouter = express.Router();

// sub routers
const authEndpointsRouter = require("./authEndpoints");
const loginRoute = require("./login");
const parentReg = require("./parentReg");
const teacherReg = require("./teacherReg");
const tempRouter = require("./tempRoute");

// auth endpoints route
authRouter.use(authEndpointsRouter);

// login route
authRouter.use(loginRoute);

// Parent registration endpoint with validation and sanitization
authRouter.use(parentReg);

// Teacher registration endpoint with validation and sanitization
authRouter.use(teacherReg);

// temp router for users
authRouter.use(tempRouter);

module.exports = authRouter;
