const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const dotenv = require('dotenv');
dotenv.config();

const connectDB = require('./database/db');
connectDB();
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
