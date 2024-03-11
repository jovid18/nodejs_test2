const express = require('express');
const app = express();
const PORT = 3000;

/** (구현) **/
const notFoundErrorHandler = require('./middlewares/notFoundError.middleware.js');
const generalErrorHandler = require('./middlewares/generalError.middleware.js');
const postsRouter = require('./routes/posts.router.js');
app.use(express.json());
app.get('/', (req, res) => {
  res.send('<h1>노드 시험</h1>');
});
app.use('/', postsRouter);
app.use(notFoundErrorHandler);
app.use(generalErrorHandler);

app.listen(PORT, () => {
  console.log(`Server listen ${PORT}`);
});
