import express from "express";
import {
  approveOrRejectUser,
  assignCourseToUser,
  getAllUsers,
  createVideo,
  getVideosByChapter,
  updateVideo,
  deleteVideo,
  getAllVideos,
} from "../controllers/admin.js";
import isAdmin from "../middlewares/isAdmin.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.get("/users", isAuthenticated, isAdmin, getAllUsers);
router.patch("/:userId/status", isAuthenticated, isAdmin, approveOrRejectUser);
router.patch("/:userId/course", isAuthenticated, isAdmin, assignCourseToUser);

// Video management routes
router.post("/videos", isAuthenticated, isAdmin, createVideo);
router.get("/videos", isAuthenticated, isAdmin, getAllVideos);
router.get(
  "/videos/:courseId/:subjectId/:chapterId",
  isAuthenticated,
  isAdmin,
  getVideosByChapter
);
router.patch("/videos/:videoId", isAuthenticated, isAdmin, updateVideo);
router.delete("/videos/:videoId", isAuthenticated, isAdmin, deleteVideo);

export default router;
