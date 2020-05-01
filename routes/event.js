const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const auth = require("../middleware/auth");

const Post = require("../models/event");
const User = require("../models/user");

router.post(
    "/",
    [
      auth,
      [
        check("text", "Text is required")
          .not()
          .isEmpty()
      ]
    ],
    async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
  
      try {
        const user = await User.findById(req.user.id).select("-password");
  
        const newPost = new Post({
          text: req.body.text,
          user: req.user.id
        });
  
        const post = await newPost.save();
  
        res.json(post);
      } catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
      }
    }
  );
  module.exports = router;

router.get("/", auth, async (req, res) => {
  try {
    const event = await Post.find().sort({ date: -1 });
    res.json(event);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});