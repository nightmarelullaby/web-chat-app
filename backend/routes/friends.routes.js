import { Router } from "express";
import { authRequired } from "../middlewares/auth.middleware.js";
import { sendFriendRequest, updateFriendRequestStatus,getAllFriendUsers } from "../controllers/friends.controller.js";
const router = Router()

router.get('/getAllFriends',authRequired,getAllFriendUsers)
router.post("/sendFriendRequest", authRequired, sendFriendRequest)
router.put("/updateFriendRequestStatus", authRequired, updateFriendRequestStatus)
export default router