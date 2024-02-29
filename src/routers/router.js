import express from "express";

import { slide21 } from "../controllers/slide21.js"

const router = express.Router();

// Pros_cons -------------------------------------

router.post("/slide21", slide21);

export default router;