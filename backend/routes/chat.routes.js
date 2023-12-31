import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { getMyOwnChats, addMessageToChat , getChatById} from "../controllers/chat.controller.js"
const router = Router()

router.get("/getMyOwnChats", authRequired, getMyOwnChats)
router.post("/addMessageToChat/:id", authRequired, addMessageToChat)
router.get("/getChatById/:id", authRequired, getChatById)
export default router
