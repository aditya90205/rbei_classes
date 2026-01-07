import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    videoTitle: {
      type: String,
      required: true,
    },
    videoDuration: {
      type: String,
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    courseId: {
      type: String,
      required: true,
    },
    subjectId: {
      type: String,
      required: true,
    },
    chapterId: {
      type: String,
      required: true,
    },
    lectureOrder: {
      type: Number,
      required: true,
      min: 1,
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

// Create compound index for unique lecture order per chapter
videoSchema.index(
  { courseId: 1, subjectId: 1, chapterId: 1, lectureOrder: 1 },
  { unique: true }
);

export const Video = mongoose.model("Video", videoSchema);
