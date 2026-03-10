"use client";

import "./postModal.css";
import { Dialog } from "@mui/material";
import { useState } from "react";

import PermMediaIcon from "@mui/icons-material/PermMedia";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import AddIcon from "@mui/icons-material/Add";
import BusinessCenterIcon from "@mui/icons-material/BusinessCenter";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";
import DescriptionIcon from "@mui/icons-material/Description";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import ScheduleIcon from "@mui/icons-material/Schedule";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";

import EmojiPicker from "emoji-picker-react";

import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useAppDispatch } from "../../redux/hooks/hooks";

import { addPost } from "../../redux/post/postSlice";

interface PostModalProps {
  open: boolean;
  onClose: () => void;
}

const PostSchema = z.object({
  content: z
    .string()
    .min(1, "Post cannot be empty")
    .max(3000, "Post is too long"),
});

type PostFormData = z.infer<typeof PostSchema>;

export default function PostModal({ open, onClose }: PostModalProps) {
  const dispatch = useAppDispatch();

  const [showMoreTools, setShowMoreTools] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [openEmoji, setOpenEmoji] = useState(false);

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<PostFormData>({
    resolver: zodResolver(PostSchema),
    defaultValues: {
      content: "",
    },
  });

  const content = watch("content");

  function handleClose() {
    onClose();
    reset();
    setShowMoreTools(false);
    setPreviewUrls([]);
    setSelectedImages([]);
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const files = Array.from(e.target.files);

    setSelectedImages(files);

    const previews = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(previews);
  };

  const handleEmoji = (emojiData: any) => {
    setValue("content", content + emojiData.emoji);
  };

  const handlePost = async (data: PostFormData) => {
    try {
      const formData = new FormData();

      formData.append("description", data.content);
      formData.append("postType", "post");

      selectedImages.forEach((file) => {
        formData.append("images", file);
      });

      await dispatch(addPost(formData)).unwrap();

      handleClose();
    } catch (error) {
      console.error("Post creation failed", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableRestoreFocus
    >
      <div className="modalOverlay">
        <div className="postModal">
          <div className="postHeader">
            <div className="userInfo">
              <img src="/profile.jpg" alt="user" className="avatar" />

              <div>
                <div className="username">Anoop Pant</div>
                <div className="visibility">Post to Anyone</div>
              </div>
            </div>

            <button className="closeBtn" onClick={handleClose}>
              ×
            </button>
          </div>

          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <textarea
                {...field}
                className="postInput"
                placeholder="What do you want to talk about?"
              />
            )}
          />

          {errors.content && (
            <p style={{ color: "red", fontSize: "12px", marginLeft: "16px" }}>
              {errors.content.message}
            </p>
          )}

          {previewUrls.length > 0 && (
            <div className="image-preview">
              {previewUrls.map((url, i) => (
                <img key={i} src={url} alt="preview" />
              ))}
            </div>
          )}


          <div className="postTools">
            <div className="toolLeft">
              {openEmoji && (
                <div className="emoji-wrapper">
                  <EmojiPicker onEmojiClick={handleEmoji} />
                </div>
              )}

              <button
                className="tool"
                type="button"
                onClick={() => setOpenEmoji(!openEmoji)}
              >
                <EmojiEmotionsOutlinedIcon sx={{ color: "grey" }} />
              </button>

              <label className="tool">
                <PermMediaIcon sx={{ color: "grey" }} />
                <input
                  hidden
                  multiple
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </label>

              <button className="tool" type="button">
                <CalendarMonthIcon sx={{ color: "grey" }} />
              </button>

              {!showMoreTools && (
                <button
                  className="tool"
                  type="button"
                  onClick={() => setShowMoreTools(true)}
                >
                  <AddIcon sx={{ color: "grey" }} />
                </button>
              )}

              {showMoreTools && (
                <div className="toolLeftShow">
                  <button className="tool">
                    <BusinessCenterIcon sx={{ color: "grey" }} />
                  </button>
                  <button className="tool">
                    <LeaderboardIcon sx={{ color: "grey" }} />
                  </button>
                  <button className="tool">
                    <DescriptionIcon sx={{ color: "grey" }} />
                  </button>
                  <button className="tool">
                    <AssignmentIndIcon sx={{ color: "grey" }} />
                  </button>
                </div>
              )}
            </div>

            <div className="toolRight">
              <button className="schedule" type="button">
                <ScheduleIcon />
              </button>

              <button
                className="postBtn"
                type="button"
                onClick={handleSubmit(handlePost)}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
