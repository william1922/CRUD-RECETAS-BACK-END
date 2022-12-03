const express = require("express");
const userControllers = require("../controllers/userControllers")
// constante para los metodos de vervos y rutas
const router = express.Router();

router.get("/", userControllers.getRecipes);

router.post("/", userControllers.createRecipe);

router.put("/", userControllers.updateRecipe);

router.delete("/", userControllers.deleteRecipe);

module.exports = router