const express = require('express')
const Post = require("../models/post");
const multer = require("multer");

const router = express.Router()

const mimeType = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = mimeType[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, 'backend/images');
  },
  filename: function (req, file, cb) {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = mimeType[file.mimetype];

    cb(null, name+'-'+Date.now()+'.'+ext);

  }
})

router.get("", (req, res) => {
  Post.find()
    .then((posts) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        data: posts,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.get("/:id", (req, res) => {
  Post.findById(req.params.id)
    .then((post) => {
      res.status(200).json({
        message: "Posts fetched successfully",
        data: post,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("", multer(storage).single('image'), (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();

  res.status(201).json({
    message: "Post saved successfully",
  });
});

router.put("/:id", multer(storage).single('image'), (req, res) => {
  const post = new Post({
    _id: req.params.id,
    title: req.body.title,
    content: req.body.content,
  });

  Post.updateOne({ _id: req.params.id }, post)
    .then(() => {
      res.status(201).json({
        message: "Post updated successfully",
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.delete("/:id", (req, res) => {
  Post.deleteOne({_id : req.params.id}).then(()=>{
    res.status(200).json({ message: "Post deleted succesffully" });
  }).catch((err)=>{
    console.log(err)
  });

});

module.exports = router;
