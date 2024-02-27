import express from "express";
import { prosCons1 } from "../controllers/pros_cons1.js"
import { Logos1 } from "../controllers/Logos1.js"

const router = express.Router();

// Pros_cons -------------------------------------
router.post("/pros_cons1", prosCons1);
router.post("/logos1", Logos1);

export default router;