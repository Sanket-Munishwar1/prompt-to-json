import express from "express";
import { Number1 } from "../controllers/Number1.js"
import { Number2 } from "../controllers/Number2.js"
import { Number3 } from "../controllers/Number3.js"
import { Number4 } from "../controllers/Number4.js"
import { Number5 } from "../controllers/Number5.js"

const router = express.Router();

// Pros_cons -------------------------------------
router.post("/pros_cons1", prosCons1);
router.post("/number1", Number1);
router.post("/number2", Number2);
router.post("/number3", Number3);
router.post("/number4", Number4);
router.post("/number5", Number5);

export default router;