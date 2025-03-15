import express from "express"
import { getAllUsers, getUserById, createUser, updateUser, deleteUser } from "../../controllers/user.controller";

const userRouter = express.Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUserById);
userRouter.post("/", createUser);
userRouter.put("/:id", updateUser);
userRouter.post("/", deleteUser);

export default userRouter