import express from "express"

const router = express.Router();

// Health check if server is running.
router.all("/", (req : express.Request, res : express.Response) => {
    res.status(200).end("Server successfully running");
})

export default router