import express from 'express';
import { Logo1 } from "../Controllers/Logo1.js";
import { Logo2 } from "../controllers/Logo2.js";
import { Logo3 } from '../Controllers/Logo3.js';
import { box1 } from '../Controllers/box1.js';
import { Logo4 } from '../Controllers/Logo4.js';
import { Number1 } from '../Controllers/Number1.js';
import { NumberBox } from '../Controllers/Number-box.js';
import { Number2 } from '../Controllers/Number2.js';
import { NumberBox2 } from '../Controllers/Number-box2.js';
import { Number3 } from '../Controllers/Number3.js';
import { Number4 } from '../Controllers/Number4.js';
import { TextLine1 } from '../Controllers/Text-line1.js';
import { TextLine2 } from '../Controllers/Text-line2.js';
import { TextLine3 } from '../Controllers/Text-line3.js';
import { TextLine4 } from '../Controllers/Text-line4.js';
import { TextLine5 } from '../Controllers/Text-line5.js';
import { TextLine6 } from '../Controllers/Text-line6.js';
import { TextLine7 } from '../Controllers/Text-line7.js';
import { Textline8 } from '../Controllers/Text-line8.js';
import { Logo5 } from '../Controllers/Logo5.js';

const router = express.Router();

// Pros_cons -------------------------------------
router.post("/logo1", Logo1);
router.post("/logo2", Logo2);
router.post("/logo3", Logo3);
router.post("/logo5", Logo5);
router.post("/logo4", Logo4);
router.post("/box1", box1);
router.post("/number1", Number1);
router.post("/number2", Number2);
router.post("/number3", Number3);
router.post("/number4", Number4);
router.post("/number-box",NumberBox);
router.post("/number-box2",NumberBox2);
router.post("/text-line1",TextLine1);
router.post("/text-line2",TextLine2);
router.post("/text-line3",TextLine3);
router.post("/text-line4",TextLine4);
router.post("/text-line5",TextLine5);
router.post("/text-line6",TextLine6);
router.post("/text-line7",TextLine7);
router.post("/text-line8",Textline8);

export default router;