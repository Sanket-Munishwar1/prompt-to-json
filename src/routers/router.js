
import { Logos1 } from "../controllers/Logos1.js"
import { Logos2 } from "../controllers/Logos2.js"
import { Logos3 } from "../controllers/Logos3.js"
import { Logos4 } from "../controllers/Logos4.js"
import { Logos5 } from "../controllers/Logos5.js"
import { Logos6 } from "../controllers/Logos6.js"

const router = express.Router();

// Pros_cons -------------------------------------
router.post("/logos1", Logos1);
router.post("/logos2", Logos2);
router.post("/logos3", Logos3);
router.post("/logos4", Logos4);
router.post("/logos5", Logos5);
router.post("/logos6", Logos6);

export default router;