import express from "express";
import { prosCons1 } from "../controllers/pros_cons1.js"
import { prosCons2 } from "../controllers/pros_cons2.js";
import { prosCons3 } from "../controllers/pros_cons3.js";
import { prosCons4 } from "../controllers/pros_cons4.js";

const router = express.Router();

// Pros_cons -------------------------------------
router.post("/pros_cons1", prosCons1);
router.post("/pros_cons2", prosCons2);
router.post("/pros_cons3", prosCons3);
router.post("/pros_cons4", prosCons4);

export default router;