import { User } from "../models/user.js";
import { Video } from "../models/video.js";

export const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = Number.parseInt(page, 10);
    const pageSize = Number.parseInt(limit, 10);

    if (Number.isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({
        message: "Invalid page number. Page must be a positive integer.",
        success: false,
      });
    }

    if (Number.isNaN(pageSize) || pageSize < 1) {
      return res.status(400).json({
        message: "Invalid limit. Limit must be a positive integer.",
        success: false,
      });
    }

    const filter = { role: { $ne: "admin" } };

    const [users, total] = await Promise.all([
      User.find(filter)
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize),
      User.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / pageSize) || 1;

    return res.status(200).json({
      message: "Users retrieved successfully",
      success: true,
      data: users,
      pagination: {
        page: pageNumber,
        limit: pageSize,
        total,
        totalPages,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error, get all users",
      success: false,
    });
  }
};

export const approveOrRejectUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { status } = req.body;

    if (!userId || !status) {
      return res
        .status(400)
        .json({ message: "userId and status are required", success: false });
    }

    const normalizedStatus = String(status).toLowerCase();
    const allowedStatuses = ["approved", "rejected"];

    if (!allowedStatuses.includes(normalizedStatus)) {
      return res.status(400).json({
        message: "Status must be either approved or rejected",
        success: false,
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }

    if (user.role === "admin") {
      return res.status(400).json({
        message: "Cannot change approval status for admin users",
        success: false,
      });
    }

    const isApproved = normalizedStatus === "approved";

    user.status = normalizedStatus;
    user.isApprove = isApproved;

    await user.save();

    return res.status(200).json({
      message: `User ${normalizedStatus} successfully`,
      success: true,
      data: {
        id: user._id,
        status: user.status,
        isApprove: user.isApprove,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error, update user status",
      success: false,
    });
  }
};

export const assignCourseToUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const { course } = req.body;

    if (!userId || !course) {
      return res
        .status(400)
        .json({ message: "userId and course are required", success: false });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }

    user.course = Array.isArray(course) ? course : [course];
    await user.save();

    return res.status(200).json({
      message: "Course(s) assigned to user successfully",
      success: true,
      data: {
        id: user._id,
        course: user.course,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error, assign course to user",
      success: false,
    });
  }
};

export const createVideo = async (req, res) => {
  try {
    const {
      videoTitle,
      videoDuration,
      videoUrl,
      courseId,
      subjectId,
      chapterId,
      lectureOrder,
    } = req.body;

    if (
      !videoTitle ||
      !videoDuration ||
      !videoUrl ||
      !courseId ||
      !subjectId ||
      !chapterId ||
      !lectureOrder
    ) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const lectureOrderNum = Number.parseInt(lectureOrder, 10);

    if (Number.isNaN(lectureOrderNum) || lectureOrderNum < 1) {
      return res.status(400).json({
        message: "Lecture order must be a positive integer",
        success: false,
      });
    }

    const existingVideo = await Video.findOne({
      courseId,
      subjectId,
      chapterId,
      lectureOrder: lectureOrderNum,
    });

    if (existingVideo) {
      return res.status(409).json({
        message:
          "A video with this lecture order already exists in this chapter",
        success: false,
      });
    }

    const newVideo = new Video({
      videoTitle,
      videoDuration,
      videoUrl,
      courseId,
      subjectId,
      chapterId,
      lectureOrder: lectureOrderNum,
      uploadedBy: req.id,
    });

    await newVideo.save();

    return res.status(201).json({
      message: "Video created successfully",
      success: true,
      data: newVideo,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error, create video",
      success: false,
    });
  }
};

export const getVideosByChapter = async (req, res) => {
  try {
    const { courseId, subjectId, chapterId } = req.params;

    if (!courseId || !subjectId || !chapterId) {
      return res.status(400).json({
        message: "courseId, subjectId, and chapterId are required",
        success: false,
      });
    }

    const videos = await Video.find({
      courseId,
      subjectId,
      chapterId,
    })
      .sort({ lectureOrder: 1 })
      .populate("uploadedBy", "fullname email");

    return res.status(200).json({
      message: "Videos retrieved successfully",
      success: true,
      data: videos,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error, get videos by chapter",
      success: false,
    });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const { videoId } = req.params;
    const {
      videoTitle,
      videoDuration,
      videoUrl,
      courseId,
      subjectId,
      chapterId,
      lectureOrder,
    } = req.body;

    if (!videoId) {
      return res.status(400).json({
        message: "videoId is required",
        success: false,
      });
    }

    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
        success: false,
      });
    }

    if (lectureOrder !== undefined) {
      const lectureOrderNum = Number.parseInt(lectureOrder, 10);

      if (Number.isNaN(lectureOrderNum) || lectureOrderNum < 1) {
        return res.status(400).json({
          message: "Lecture order must be a positive integer",
          success: false,
        });
      }

      const targetCourseId = courseId || video.courseId;
      const targetSubjectId = subjectId || video.subjectId;
      const targetChapterId = chapterId || video.chapterId;

      if (
        lectureOrderNum !== video.lectureOrder ||
        targetCourseId !== video.courseId ||
        targetSubjectId !== video.subjectId ||
        targetChapterId !== video.chapterId
      ) {
        const existingVideo = await Video.findOne({
          _id: { $ne: videoId },
          courseId: targetCourseId,
          subjectId: targetSubjectId,
          chapterId: targetChapterId,
          lectureOrder: lectureOrderNum,
        });

        if (existingVideo) {
          return res.status(409).json({
            message:
              "A video with this lecture order already exists in this chapter",
            success: false,
          });
        }
      }

      video.lectureOrder = lectureOrderNum;
    }

    if (videoTitle) video.videoTitle = videoTitle;
    if (videoDuration) video.videoDuration = videoDuration;
    if (videoUrl) video.videoUrl = videoUrl;
    if (courseId) video.courseId = courseId;
    if (subjectId) video.subjectId = subjectId;
    if (chapterId) video.chapterId = chapterId;

    await video.save();

    return res.status(200).json({
      message: "Video updated successfully",
      success: true,
      data: video,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error, update video",
      success: false,
    });
  }
};

export const deleteVideo = async (req, res) => {
  try {
    const { videoId } = req.params;

    if (!videoId) {
      return res.status(400).json({
        message: "videoId is required",
        success: false,
      });
    }

    const video = await Video.findByIdAndDelete(videoId);

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Video deleted successfully",
      success: true,
      data: video,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error, delete video",
      success: false,
    });
  }
};

export const getAllVideos = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNumber = Number.parseInt(page, 10);
    const pageSize = Number.parseInt(limit, 10);

    if (Number.isNaN(pageNumber) || pageNumber < 1) {
      return res.status(400).json({
        message: "Invalid page number. Page must be a positive integer.",
        success: false,
      });
    }

    if (Number.isNaN(pageSize) || pageSize < 1) {
      return res.status(400).json({
        message: "Invalid limit. Limit must be a positive integer.",
        success: false,
      });
    }

    const [videos, total] = await Promise.all([
      Video.find()
        .sort({ createdAt: -1 })
        .skip((pageNumber - 1) * pageSize)
        .limit(pageSize)
        .populate("uploadedBy", "fullname email"),
      Video.countDocuments(),
    ]);

    const totalPages = Math.ceil(total / pageSize) || 1;

    return res.status(200).json({
      message: "Videos retrieved successfully",
      success: true,
      data: videos,
      pagination: {
        page: pageNumber,
        limit: pageSize,
        total,
        totalPages,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error, get all videos",
      success: false,
    });
  }
};
