import express from "express"
import userRouter from "./roots/user.routes";
import categoryRoutes from "./roots/category.routes";
import optionSetRoutes from "./roots/optionSet.routes";

const router = express.Router();

// Health check if server is running.
router.all("/", (req : express.Request, res : express.Response) => {
    res.status(200).end("Server successfully running");
})

router.use("/user", userRouter);
router.use("/category", categoryRoutes);
router.use("/optionSet", optionSetRoutes);

export default router