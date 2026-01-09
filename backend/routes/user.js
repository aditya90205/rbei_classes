import express from "express";
import { approveOrRejectUser } from "../controllers/admin.js";
import {
  createUser,
  loginUser,
  logoutUser,
  getUserAssignedCourse,
  getVideosForChapter,
} from "../controllers/user.js";
import isAdmin from "../middlewares/isAdmin.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.post("/signup", createUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/courses", isAuthenticated, getUserAssignedCourse);
router.get(
  "/videos/:courseId/:subjectId/:chapterId",
  isAuthenticated,
  getVideosForChapter
);
router.patch("/:userId/status", isAuthenticated, isAdmin, approveOrRejectUser);

export default router;
