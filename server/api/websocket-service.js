const express = require('express');
const http = require('http');

const cors = require('cors');
const { Socket } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io =require('socket.io')(server, {cors: {origin: "*"}});


const corsOptions = {
  origin: ['*'],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

const clients = {};


  io.on('connection', (socket) => { 
    console.log(socket.handshake.query.client); 
    let id = socket.handshake.query.client;
    Object.assign(clients, {id:socket});

  });
   
  // io.on('message', message => {
  //   console.log('Client registration request arrived');
  //   const parsedMessage = JSON.parse(message);
    
  //   if (parsedMessage.type === 'register') {
  //     // Register the client
  //     const { clientId } = parsedMessage;
  //     clients[clientId] = ws;
  //     console.log(`Client ${clientId} registered`);
  //   } else if (parsedMessage.type === 'update') {
  //     // Broadcast update to all registered clients
  //     Object.values(clients).forEach(client => {
  //       //if (client.readyState === WebSocket.OPEN) {
  //       if (client.readyState === io.OPEN) {
  //         client.send(JSON.stringify({ type: 'update', data: parsedMessage.data }));
  //       }
  //     });
  //   }
  // });

  io.on('close', () => {
    console.log('Client disconnected');
    // Clean up client registrations on disconnect
    Object.keys(clients).forEach(clientId => {
      if (clients[clientId] === ws) {
        delete clients[clientId];
        console.log(`Client ${clientId} unregistered`);
      }
    });
  });


  function broadcastAll(message) {
    console.log('reached broadcastAll method inside websocket-service %o', clients[1])
    Object.values(clients).forEach(clientObj => {
        clientObj.send(JSON.stringify({ type: 'update', data: message.data }));
    });
    return;
  } 

  
  server.listen(8080, () => {
    console.log('Websocket server is listening on port 8080');
  });

  module.exports = broadcastAll;