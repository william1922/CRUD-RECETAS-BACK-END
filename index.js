const express = require("express");
const conectarDB = require("./database/index");
const bodyParser = require("body-parser");
const cors = require("cors");

require("dotenv").config()
const RecetasRouter = require("./routers/recetas")
const app = express();

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json())
app.use(cors())

conectarDB()
const port = 4001;

app.use("/recetas", RecetasRouter)

app.listen(port, () => {
    console.log(`Server Listen in ${port}`)
})