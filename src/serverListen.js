/* eslint-disable no-console */
const app = require('./server.js');

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`Server started on ${port}`);
});
