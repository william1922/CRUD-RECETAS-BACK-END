const express = require("express");
const userControllers = require("../controllers/userControllers")
// constante para los metodos de vervos y rutas
const router = express.Router();
const multipart = require("connect-multiparty");//aqui se usa el multiparty por que aqui es donde se encuentra la ruta con la imagen
const multipartMiddleware = multipart({uploadDir:"./uploads/files-img"})


router.get("/", userControllers.getRecipes);

router.get("/:id", userControllers.getRecipe)

router.post("/", userControllers.createRecipe);

router.put("/:id",multipartMiddleware ,userControllers.updateRecipe);

router.delete("/:id", userControllers.deleteRecipe);

module.exports = router