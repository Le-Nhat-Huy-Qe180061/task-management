
const express = require("express");

//--- body-parser Lấy dữ liệu từ body
const bodyParser = require("body-parser");

//--- cors :"để cho phép backend chia sẽ dữ liệu API vs fontend / dùng để chia sẻ tài nguyên chéo nhau"
const cors = require("cors");

//--- cookie-parser
const cookieParser = require("cookie-parser");

//--- DATABASE
const database = require("./config/database");

//--- dotenv
require('dotenv').config();


//--- V1
const routesApiVer1 = require("./api/v1/routes/index.route");

const app = express();
const port = process.env.PORT;

//--- cors USE
app.use(cors());

database.connect();

//--- cookie-parser USE
app.use(cookieParser());

//--- body-parser application/json
app.use(bodyParser.json()); 

// Routes Version 1
routesApiVer1(app);



app.listen(port, () => {
    console.log(`App listening on port ${port}`);
})

