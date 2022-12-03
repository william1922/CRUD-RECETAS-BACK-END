const RecipeModel = require('../models/recetas');
const cloudinary = require('../utils/cloudinary')

const getRecipes = async (req, res) => {
    try {
        const recipes = await RecipeModel.find();
        if (recipes) {
            return res.status(200).send(recipes)
        } else {
            return res.status(200).send([])
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Error al traer usuarios"})
    }
}

const createRecipe = async(req, res) => {
    const {name, img, ingredients, descripcion, file} = req.body

    const newRecipe = new RecipeModel({
        name,
        img,
        ingredients,
        descripcion,
        file
    })

    try {
        const recipe = await newRecipe.save()
        console.log(recipe)
        return res.status(200).send({msg: "receta creada"})
    } catch (error) {
        console.log(error)
        return res.status(400).send({msg:"Receta existente"})
    }
}

const updateRecipe = async (req, res) => {
    const {id} = req.params;

    const recipeData = req.body

    try {
        const recipeDB = await RecipeModel.findById(id)
        if (recipeDB.cloudinary_id){
            await cloudinary.uploader.destroy(recipeDB.cloudinary_id)
        }

        if (req.files.file){
            const cloud_image = await cloudinary.uploader.upload(req.files.file.path)
            recipeData.cloudinary_id = cloud_image.public_id;
            recipeData.file = cloud_image.url;
            console.log(recipeData)
        }

        if (!recipeDB) {
            return res.status(400).send({msg:"Error al actualizar receta"})
        }
        await RecipeModel.findByIdAndUpdate(id, recipeData)
        return res.status(200).send({msg:"Receta Editada correctamente"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Error en el servidor"})
    }
}

const deleteRecipe = async (req, res) => {
    const {id} = req.params

    try {
        await RecipeModel.findByIdAndDelete(id);
        return res.status(200).send({msg:"Recipe deleted"})
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Error en el servidor al eliminar receta"})
    }
}

const getRecipe = async (req, res) => {
    const {id} = req.params

    try {
        const recipes = await RecipeModel.findById(id);
        if (recipes) {
            return res.status(200).send(recipes)
        } else {
            return res.status(200).send([])
        }
    } catch (error) {
        console.log(error)
        return res.status(500).send({msg:"Error al traer usuarios"})
    }
}
module.exports = {
    getRecipes,
    createRecipe,
    updateRecipe,
    deleteRecipe,
    getRecipe
}