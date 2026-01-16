require('dotenv').config();
require('./configs/connect');

const express = require('express');
const apiRouter = require('./routers/api');
const clientRouter = require('./routers/client');
const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static("public"));

app.use('/api', apiRouter);
app.use('/', clientRouter);

app.listen(process.env.PORT, () => {
    console.log(`Express Server Running on http://localhost:${process.env.PORT}`)
})