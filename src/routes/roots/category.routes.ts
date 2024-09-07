import express from "express"
import { createCategory, editCategory, getCategory } from "../../controllers/category.controller";

const categoryRoutes = express.Router();

categoryRoutes.get("/", getCategory);
categoryRoutes.post("/", createCategory);
categoryRoutes.put("/", editCategory);

export default categoryRoutes