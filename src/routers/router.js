import express from "express";
import { box1 } from "../controllers/box1.js";
import { box2 } from "../controllers/box2.js";
import { box3 } from "../controllers/box3.js";
import { box4 } from "../controllers/box4.js";
import { box5 } from "../controllers/box5.js";
import { box6 } from "../controllers/box6.js";
import { box7 } from "../controllers/box7.js";

const router = express.Router();

// Pros_cons -------------------------------------
router.post("/box1", box1);
router.post("/box2", box2);
router.post("/box3", box3);
router.post("/box4", box4);
router.post("/box5", box5);
router.post("/box6", box6);
router.post("/box7", box7);

export default router;