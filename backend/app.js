const express = require('express');
const cors = require('cors')
const dbConnect = require("./config/mongo");

const app = express();

app.use(express.json());
app.use(cors())

const router_user = require('./route/user.route.js')
app.use(router_user)

const port = 3001;

app.listen(port, () => {
    console.log('http://localhost:' + port);
});

dbConnect();