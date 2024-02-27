import express from "express";
import { prosCons1 } from "../controllers/pros_cons1.js"
import { Logos1 } from "../controllers/Logos1.js"
import { Logos2 } from "../controllers/Logos2.js"
import { Logos3 } from "../controllers/Logos3.js"
import { Logos4 } from "../controllers/Logos4.js"
import { Logos5 } from "../controllers/Logos5.js"
<<<<<<< HEAD
import { Logo7 } from "../controllers/Logo7.js";
import { Logo8 } from "../controllers/Logo8.js";
import { Logo9 } from "../controllers/Logo9.js";
import { Logo10 } from "../controllers/Logo10.js";
import { Logo11 } from "../controllers/Logo11.js";
import { Logo12 } from "../controllers/Logo12.js";
=======
import { Logos6 } from "../controllers/Logos6.js"
>>>>>>> 8f9ef4b3494871ccf6c3e81a9d8c33d38b62a8b8

const router = express.Router();

// Pros_cons -------------------------------------
router.post("/pros_cons1", prosCons1);
router.post("/logos1", Logos1);
router.post("/logos2", Logos2);
router.post("/logos3", Logos3);
router.post("/logos4", Logos4);
router.post("/logos5", Logos5);
<<<<<<< HEAD
router.post("/logos5", Logo7);
router.post("/logos5", Logo8);
router.post("/logos5", Logo9);
router.post("/logos5", Logo10);
router.post("/logos5", Logo11);
router.post("/logos5", Logo12);
=======
router.post("/logos6", Logos6);
>>>>>>> 8f9ef4b3494871ccf6c3e81a9d8c33d38b62a8b8

export default router;