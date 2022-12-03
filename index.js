const express = require("express");
const RecetasRouter = require("./routers/recetas")
const app = express();

const port = 4001;

app.use("/recetas", RecetasRouter)

app.listen(port, () => {
    console.log(`Server Listen in ${port}`)
})