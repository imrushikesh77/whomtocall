import express from 'express';
import {
    handleWebUserRequest
} from "../controllers/whomtocall.controller.js";

const router = express.Router();

router.post("/whomtocall", handleWebUserRequest);

export default router;