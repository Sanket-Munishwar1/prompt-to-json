import express from "express";
import { sideImage1 } from "../controllers/side_image1.js";
import { sideImage2 } from "../controllers/side_image2.js";
import { sideImage3 } from "../controllers/side_image3.js";
import { sideImage4 } from "../controllers/side_image4.js";
import { sideImage5 } from "../controllers/side_image5.js";
import { sideImage6 } from "../controllers/side_image6.js";
import { sideImage7 } from "../controllers/side_image7.js";
import { sideImage8 } from "../controllers/side_image8.js";
const router = express.Router();

// Side_Image -------------------------------------

router.post("/side-image1",sideImage1 );
router.post("/side-image2",sideImage2 );
router.post("/side-image3",sideImage3 );
router.post("/side-image4",sideImage4 );
router.post("/side-image5",sideImage5 );
router.post("/side-image6",sideImage6 );
router.post("/side-image7",sideImage7 );
router.post("/side-image8",sideImage8 );

export default router;