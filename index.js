const express = require('express');
const pino = require('pino');
const pinoLoki = require('pino-loki').default;

const app = express();

const logger = pino(
  pinoLoki({
    host: "http://localhost:3100/loki/api/v1/push",
    grpc: "http://10.112.1.113:9095/loki/api/v1/push",
    interval: 2,
    labels: { app: 'status-app' },
  })
);


function getRandomStatus() {
  const statuses = [200, 201, 202, 400, 401, 403, 404, 500, 502, 503];
  const randomIndex = Math.floor(Math.random() * statuses.length);
  return statuses[randomIndex];
}


app.get('/', (req, res) => {
  const status = getRandomStatus();
  logger.info({ status }, 'Random status returned'); // Log to Loki
  res.status(status).send(`Status code: ${status}`);
});

// Start server
const port = 8877;
app.listen(port, () => {
  logger.info(`Server running on port ${port}`);
});
