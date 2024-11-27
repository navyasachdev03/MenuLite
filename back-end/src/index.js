const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config({ path: './.env' });

const app = express();
app.use(express.json());

const corsConfig = { credentials: true, origin: true };
app.use(cors(corsConfig));

const PORT = process.env.PORT || 8000;

connectDB();

app.use('/appointment', require('./routes/appointment.routes'));
app.use('/item', require('./routes/item.routes'));
app.use('/user', require('./routes/user.routes'));

app.listen(PORT, () => console.log(`Server started on port ${PORT}...`));