const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();
const auth = require("./auth.js");

// Configure multer so that it will upload to '/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../public/images/',
  limits: {
    fileSize: 10000000
  }
});

const users = require("./users.js");
const User = users.model;

const photoSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  path: String,
  title: String,
  description: String,
  created: {
    type: Date,
    default: Date.now
  },
});




const Photo = mongoose.model('Photo', photoSchema);


const commentSchema = new mongoose.Schema({
  userName: String,
  photo_id: {
    type: mongoose.Schema.ObjectId,
    ref: 'Photo'
  },
  comment: String,
  created: {
    type: Date,
    default: Date.now
  },
});

const Comment = mongoose.model('Comment', commentSchema);
// upload photo
router.post("/", auth.verifyToken, User.verify, async (req, res) => {
  // check parameters
  // if (!req.file)
  //   return res.status(400).send({
  //     message: "Must upload a file."
  //   });

  const photo = new Photo({
    user: req.user,
    path: req.body.path,
    title: req.body.title,
    description: req.body.description,
  });
  try {
    await photo.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete("/:id", auth.verifyToken, User.verify, async (req, res) => {
  try {
    await Photo.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200)
  } catch (e) {
    console.log(error);
    res.sendStatus(500);

  }

});


// get my photos
router.get("/", auth.verifyToken, User.verify, async (req, res) => {
  // return photos
  try {
    let photos = await Photo.find({
      user: req.user
    }).sort({
      created: -1
    });
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get single photo
router.get("/single/:id", auth.verifyToken, User.verify, async (req, res) => {
  // return photos
  try {
    let photo = await Photo.findOne({
      _id: req.params.id,
    }).populate('user');
    res.send(photo);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// get all photos
router.get("/all", async (req, res) => {
  try {
    let photos = await Photo.find().sort({
      created: -1
    }).populate('user');
    return res.send(photos);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.post("/comments", auth.verifyToken, User.verify, async (req, res) => {
  const comment = new Comment({
    userName: req.user.name,
    photo_id: req.body.photo_id,
    comment: req.body.comment,
  });

  try {
    await comment.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }


})

router.get("/comments/:id", async (req, res) => {
  try {
    console.log()
    let comments = await Comment.find({
      photo_id: req.params.id,
    })

    return res.send(comments);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }

})

module.exports = {
  model: Photo,
  routes: router,
}
