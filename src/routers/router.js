
import { Logos1 } from "../controllers/Logos1.js"
import { Logos2 } from "../controllers/Logos2.js"
import { Logos3 } from "../controllers/Logos3.js"
import { Logos4 } from "../controllers/Logos4.js"
import { Logos5 } from "../controllers/Logos5.js"
import { Logo7 } from "../controllers/Logo7.js";
import { Logo8 } from "../controllers/Logo8.js";
import { Logo9 } from "../controllers/Logo9.js";
import { Logo10 } from "../controllers/Logo10.js";
import { Logo11 } from "../controllers/Logo11.js";
import { Logo12 } from "../controllers/Logo12.js";
import { Logo13 } from "../controllers/Logo13.js";
import { Logo14 } from "../controllers/Logo14.js";
import { Logo15 } from "../controllers/Logo15.js";
import { Logo16 } from "../controllers/Logo16.js";
import { Logo17 } from "../controllers/Logo17.js";
import { Logo18 } from "../controllers/Logo18.js";
import { Logo19 } from "../controllers/Logo19.js";
import { Logo20 } from "../controllers/Logo20.js";
import { Logo21 } from "../controllers/Logo21.js";
import { Logo22 } from "../controllers/Logo22.js";
import { Logo23 } from "../controllers/Logo23.js";

const router = express.Router();

// Pros_cons -------------------------------------
router.post("/logos1", Logos1);
router.post("/logos2", Logos2);
router.post("/logos3", Logos3);
router.post("/logos4", Logos4);
router.post("/logos5", Logos5);
router.post("/logos5", Logo7);
router.post("/logos5", Logo8);
router.post("/logos5", Logo9);
router.post("/logos5", Logo10);
router.post("/logos5", Logo11);
router.post("/logos5", Logo12);
router.post("/logos13", Logo13);
router.post("/logos14", Logo14);
router.post("/logos15", Logo15);
router.post("/logos16", Logo16);
router.post("/logos17", Logo17);
router.post("/logos18", Logo18);
router.post("/logos19", Logo19);
router.post("/logos20", Logo20);
router.post("/logos21", Logo21);
router.post("/logos22", Logo22);
router.post("/logos23", Logo23);


export default router;