const express = require('express');
const server = express();

// Configure your server here
// Build your actions router in /api/actions/actions-router.js
// Build your projects router in /api/projects/projects-router.js
// Do NOT `server.listen()` inside this file!

const helmet = require('helmet');
const morgan = require('morgan');

// Routers
const actRouter = require('./actions/actions-router');
const projRouter = require('./projects/projects-router');

server.use(express.json());
server.use(helmet());
server.use(morgan('dev'));
server.use('/api/actions', actRouter);
server.use('/api/projects', projRouter);

server.get('/', (req, res) => {
  res.send(`<h1>Here is my API</h1>`);
});

module.exports = server;
