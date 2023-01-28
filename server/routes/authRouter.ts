import express from "express";
import authCtrl from "../controllers/authCtrl";
import { validRegister } from "../middleware/validation";

const router = express.Router();

router.post('/register', validRegister ,authCtrl.register);

export default router;