import PostMessage from "../models/postMessage.js";
import mongoose from "mongoose";

export const getPosts = async (req, res) => {
    try {
        const postMessages = await PostMessage.find();
        res.status(200).json(postMessages);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
};

export const createPost = async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
        await newPost.save();
        res.status(201).json(newPost);
    } catch (err) {
        res.status(409).json({ message: err.message });
    }
};

export const updatePost = async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    console.log(_id);
    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post found");
    }
    const newPost = { ...post, _id };
    const updatedPost = await PostMessage.findByIdAndUpdate(_id, newPost, {
        new: true,
    });

    res.json(updatedPost);
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).send("No post found");
    }

    await PostMessage.findByIdAndRemove(id);

    res.json({ message: "Post deleted successfully" });
};
