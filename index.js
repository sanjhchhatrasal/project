const express = require('express');
const pino = require('pino');
const pinoLoki = require('pino-loki').default;
const path = require('path');

const app = express();

const logger = pino(
  pinoLoki({
    // host: "https://tcplusdev-otel.shl.zone/loki/api/v1/push",
    host: "https://10.112.1.113:3100/loki/api/v1/push",
    interval: 2,
    labels: { app: 'status-app' },
  })
);

// Serve static files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

function getRandomStatus() {
  const statuses = [200, 201, 202, 400, 401, 403, 404, 500, 502, 503];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
}

// Serve HTML home page
app.get('/', (req, res) => {
  const status = getRandomStatus();
  logger.info({ status }, 'Random status returned'); // Log to Loki
  // Send HTML page with embedded status
  res.send(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Status App</title>
      <style>
        body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
        h1 { color: #333; }
        .status { font-size: 2em; margin-top: 20px; }
      </style>
    </head>
    <body>
      <h1>Welcome to the Status App</h1>
      <p class="status">Random Status Code: <strong>${status}</strong></p>
    </body>
    </html>
  `);
});

// Start server
const port = 8877;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
