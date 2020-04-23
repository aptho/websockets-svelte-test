const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 8080 });
let state

wss.on('connection', (ws) => {
  // On client connection, send the current state
  ws.send(state);

  ws.on('message', (message) => {
    // When we recieve a message change the state to match
    state = message
    console.log('received: %s', message);

    // Send this message out to everyone
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    })
  })
})