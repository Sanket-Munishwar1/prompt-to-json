import express from "express";
import { differentType1 } from "../controllers/different_type1.js";
import { differentType2 } from "../controllers/different_type2.js";
import { differentType3 } from "../controllers/different_type3.js";

const router = express.Router();

// Pros_cons -------------------------------------
router.post("/different-type1", differentType1);
router.post("/different-type2", differentType2);
router.post("/different-type3", differentType3);

export default router;