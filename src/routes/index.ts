import express from "express"
import userRouter from "./roots/user.routes";
import tokenRouter from "./roots/token.routes";
import categoryRoutes from "./roots/category.routes";

const router = express.Router();

// Health check if server is running.
router.all("/", (req : express.Request, res : express.Response) => {
    res.status(200).end("Server successfully running");
})

router.use("/", tokenRouter);
router.use("/category", categoryRoutes);
router.use("/user", userRouter);


export default router