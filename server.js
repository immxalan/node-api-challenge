const express = require("express");
const actionRouter = require("./data/actions/actionRouter")
const projectRouter = require("./data/projects/projectRouter")
const helmet = require("helmet");


const server = express();


server.use(express.json());
server.use(helmet());

server.get("/", (req, res) => {
    res.status(200).json({ message: "The server is online"});
})
server.use("/api/actions", actionRouter) //This belongs under server.use(express.json())
server.use("/api/projects", projectRouter) 
module.exports = server;