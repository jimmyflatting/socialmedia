import { Post } from "../model/post.js";
import { User } from "../model/user.js";
import { Readable } from "stream";
import { s3Client } from "../middleware/s3.js";
import { upload } from "../middleware/upload.js";
import jwt from "jsonwebtoken";

// Create Post
export const createPost = async (req, res) => {
  try {
    const { content } = req.body;

    if (!content) {
      res.status(400).send("Content is required");
      return;
    }

    // Check cookie for userId
    const token = req.cookies.access_token;

    if (!token) {
      return res.status(401).json("Invalid token/user");
    }

    try {
      var payload = jwt.verify(token, process.env.TOKEN_KEY);
    } catch (err) {
      return res.status(403).json("Invalid Token");
    }

    const user = await User.findOne({ _id: payload.id });

    if (!user) {
      res.status(400).send("Invalid author email");
      return;
    }

    let imgSrc = null;

    if (req.file) {
      const fileStream = Readable.from(req.file.buffer);

      // Upload the file to S3
      const params = {
        Bucket: process.env.S3_bucketName,
        Key: `${Date.now()}-${req.file.originalname}`,
        Body: fileStream,
      };

      try {
        const s3UploadResponse = await s3Client.upload(params).promise();
        console.log(s3UploadResponse);
        imgSrc = s3UploadResponse.Location;
      } catch (error) {
        console.log(error);
        return res
          .status(406)
          .send("Something went wrong with image upload, try again later");
      }
    }
    const post = await Post.create({
      content,
      author: user._id,
      imgSrc,
    });

    user.posts.push(post._id);
    await user.save();

    res.status(201).json(post);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

// Fetch posts by user handle
export const fetchUserPost = async (req, res) => {
  try {
    const userHandle = req.params.userHandle;
    const user = await User.findOne({ userHandle });

    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    const posts = await Post.find({ author: user._id }).populate("author");
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

// Fetch post by Id
export const fetchPostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.findById(postId).populate("author");

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "Post not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

// Delete post by Id
export const deletePostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await Post.deleteOne({ _id: postId });

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "Post not found",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};

// Fetch all posts
export const fetchPosts = async (req, res) => {
  try {
    const posts = await Post.find().limit(50).populate("author");
    res.status(200).json(posts);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error", error: error });
  }
};
