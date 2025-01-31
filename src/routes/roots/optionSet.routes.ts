import express from "express"
import { createOptionSet, getOptionSetById, deleteOptionSet, editOptionSet, getAllOptionSets } from "../../controllers/optionSet.controller";

const optionRoutes = express.Router();

optionRoutes.get("/:id", getOptionSetById);
optionRoutes.get("/", getAllOptionSets);
optionRoutes.post("/", createOptionSet);
optionRoutes.delete("/:id", deleteOptionSet);
optionRoutes.put("/:id", editOptionSet);

export default optionRoutes