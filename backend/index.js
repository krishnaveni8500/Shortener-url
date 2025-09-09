const express = require('express');
const app = express();
const cors = require('cors');
const logger = require('./middleware/logger');
const shorturlRoutes = require('./routes/shorturl');

app.use(cors());
app.use(express.json());
app.use(logger);
app.use('/', shorturlRoutes);

const PORT = 3001;
app.listen(PORT, () => console.log(`Server at http://localhost:${PORT}`));
