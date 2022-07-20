const express = require("express");
const parser = require("body-parser");
const mongoose = require("mongoose");
const Post = require("./models/post");

require('dotenv/config');

const app = express();

mongoose
  .connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    console.log("Connected to database!");
  })
  .catch(() => {
    console.log("Connection to database failed!");
  });

app.use(parser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, PUT, OPTIONS"
  );
  next();
});

app.get("/api/posts", (req, res) => {
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

app.post("/api/posts", (req, res) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content,
  });
  post.save();

  res.status(201).json({
    message: "Post saved successfully",
  });
});

app.delete("/api/posts/:id", (req, res) => {
  Post.deleteOne({_id : req.params.id}).then(()=>{
    res.status(200).json({ message: "Post deleted succesffully" });
  }).catch((err)=>{
    console.log(err)
  });

});

module.exports = app;
