const express = require('express');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const { connectToDB } = require('./db');
const {
  initiateUploadService,
} = require('./middleware/upload-image-middleware');

const PORT = process.env.PORT || 3001;
const app = express();

connectToDB();
initiateUploadService();
// Express middlewares
app.use(cors({ credentials: true, origin: process.env.FRONT_END_URL }));
app.use(express.json());
app.use(cookieParser());
app.use(
  '/public/uploads',
  express.static(path.join(__dirname, process.env.UPLOAD_FOLDER))
);
app.use('/api/v1', routes);
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}!`);
});
