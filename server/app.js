const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const Users = require('./models/users');
const Jobs = require('./models/jobs');

const ErrorHandler = require('./middlewares/ErrorHandler');
const userRouter = require('./routes/user');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/users',userRouter);


app.get('/healthcheck',(req,res) => {
    res.send('Server is up and running!');
})


app.use((req,res,next) => {
    res.status(500).send('Something went wrong!');
})
app.use(ErrorHandler);

app.listen(process.env.PORT, async () => {
    await mongoose.connect(process.env.MONGODB_URL,{ useNewUrlParser: true, useUnifiedTopology: true })
     .then(() => console.log(`Server is listening on port ${process.env.PORT}`))
     .catch((error) => console.log(error))
})