import express from "express"
import { createCategory, editCategory, getCategoryDetail } from "../../controllers/category.controller";

const categoryRoutes = express.Router();

categoryRoutes.get("/:id", getCategoryDetail);
categoryRoutes.post("/", createCategory);
categoryRoutes.put("/", editCategory);

export default categoryRoutes