const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const { connectToDB } = require('./db');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middlewares
app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));
app.use(express.json());
app.use(cookieParser());
app.use(
  '/public/uploads',
  express.static(path.join(__dirname, process.env.UPLOAD_FOLDER))
);
app.use('/api/v1', routes);

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
  connectToDB();
});
