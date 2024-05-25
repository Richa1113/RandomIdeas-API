const express = require("express");
const router = express.Router();
const Idea = require("../models/Idea");

//Get all ideas
router.get("/", async (req, res) => {
  // res.json({ success: true, data: ideas });
  try {
    const ideas = await Idea.find();
    res.json({ success: true, data: ideas });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "something went wrong" });
  }
});

//Get single idea
router.get("/:id", async (req, res) => {
  // const idea = ideas.find((idea) => idea.id === +req.params.id);
  // if (!idea) {
  //   return res
  //     .status(404)
  //     .json({ success: false, error: "resource not found" });
  // }
  // res.json({ success: true, data: idea });

  const idea = await Idea.findById(req.params.id);
  try {
    res.json({ success: true, data: idea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "something went wrong" });
  }
});

//add an idea
router.post("/", async (req, res) => {
  //res.json("hello world");
  // const idea = {
  //   id : ideas.length + 1,
  //   text : req.body.text,
  //   tag : req.body.tag,
  //   username: req.body.username,
  //   date : new Date().toISOString().slice(0, 10)
  // }
  // //console.log(idea);
  // ideas.push(idea);
  // res.json({ success : true, data : idea});

  const idea = new Idea({
    text: req.body.text,
    tag: req.body.tag,
    username: req.body.username,
  });

  try {
    const savedIdea = await idea.save();
    res.json({ success: true, data: savedIdea });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "something went wrong" });
  }
});

//update an idea
router.put("/:id", async (req, res) => {
  // const idea = ideas.find((idea) => idea.id === +req.params.id);
  // if (!idea) {
  //   return res
  //     .status(404)
  //     .json({ success: false, error: "resource not found" });
  // }

  // idea.text = req.body.text || idea.text;
  // idea.tag = req.body.tag || idea.tag;
  // res.json({ success: true, data: idea });
  try {
    const idea = await Idea.findById(req.params.id);

    //match the username
    if (idea.username === req.body.username) {
      const updatedIdea = await Idea.findByIdAndUpdate(
        req.params.id,
        {
          $set: {
            text: req.body.text,
            tag: req.body.tag,
          },
        },
        { new: true }
      );
      return res.json({ success: true, data: updatedIdea });
    }

    //username do not match
    res
      .status(403)
      .json({
        success: false,
        error: "You are not authorized to update this resource",
      });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "something went wrong" });
  }
});

//delete an idea
router.delete("/:id", async (req, res) => {
  // const idea = ideas.find((idea) => idea.id === +req.params.id);
  // if (!idea) {
  //   return res
  //     .status(404)
  //     .json({ success: false, error: "resource not found" });
  // }

  // const index = ideas.indexOf(idea);
  // ideas.splice(index, 1);
  // res.json({ success: true, data: {} });
  try {
    const idea = await Idea.findById(req.params.id);

    //match the username
    if (idea.username === req.body.username) {
      await Idea.findByIdAndDelete(req.params.id);
      return res.json({ success: true, data: {} });
    }

    //username do not match
    res.status(403).json({
      success: false,
      error: "you are not authorized to delete this resource",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "something went wrong" });
  }
});

module.exports = router;
