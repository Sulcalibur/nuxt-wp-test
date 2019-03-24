/* eslint-disable no-console */

const server = require('../server/index');

const port = process.env.PORT || 8080;

server.listen(port, () => {
  console.log(`server started at localhost:${port}`);
});
