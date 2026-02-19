import e from "express";
import {getLandingPage} from '../controllers/getLandingPage.js';
const router = e.Router();

// get landing page
router.get('/',getLandingPage);

export default router;