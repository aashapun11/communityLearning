const express = require('express');
const app = express();
const port =  process.env.PORT || 3000;
const dotenv = require('dotenv');
dotenv.config();
const cors = require("cors");

app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const connectDB = require('./database/db');
connectDB();

const errorHandler = require("./middleware/errorHandler");
app.use(errorHandler);


app.get('/', (req, res) => {
    res.send("Hello World")
})


app.use('/api/auth', require('./routes/authRoute'));
app.use('/api/challenges', require('./routes/challengeRoute'));
app.use('/api/checkins', require('./routes/checkInRoute'));
app.use('/api/users', require('./routes/userRoute'));
app.use('/api/feed', require('./routes/feedRoute'));
app.use('/api/comments', require('./routes/commentRoute'));
app.use('/api/notifications', require('./routes/notificationRoute'));
app.use('/api/leaderboard', require('./routes/leaderboardRoute'));

app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
