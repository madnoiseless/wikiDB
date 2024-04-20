//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();
const port = 3000;

app.set("view engine", "ejs");

app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB");

const articleSchema = {
  title: String,
  content: String,
};

const Article = mongoose.model("Article", articleSchema);

// Requests targeting all articles

app
  .route("/articles")
  .get(async function (req, res) {
    try {
      const foundArticles = await Article.find();
      res.send(foundArticles); // Don't forget to send the response
    } catch (error) {
      console.error(error);
    }
  })
  .post(function (req, res) {
    const newArticle = new Article({
      title: req.body.title,
      content: req.body.content,
    });

    newArticle
      .save()
      .then(() => {
        res.send("Successfully added a new article.");
      })
      .catch((err) => {
        res.send(err);
      });
  })
  .delete(async function (req, res) {
    try {
      await Article.deleteMany();
      res.send("Successfully deleted all articles.");
    } catch (err) {
      res.send(err);
    }
  });

// Requests targeting a specific article

app
  .route("/articles/:articleTitle")
  .get(function (req, res) {
    Article.findOne({ title: req.params.articleTitle })
      .then((foundArticle) => {
        if (foundArticle) {
          res.send(foundArticle);
        } else {
          res.send("No articles matching that title was found.");
        }
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send("An error occurred while fetching the article.");
      });
  })
  .put(async function (req, res) {
    try {
      const updatedArticle = await Article.findOneAndUpdate(
        { title: req.params.articleTitle },
        { title: req.body.title, content: req.body.content },
        { overwrite: true, new: true }
      );
      if (updatedArticle) {
        res.send("Successfully updated article.");
      } else {
        res.send("No article found for the given title.");
      }
    } catch (err) {
      console.error(err);
      res.status(500).send("An error occurred while updating the article.");
    }
  })
  .patch(async function (req, res) {
    try {
      await Article.updateOne(
        { title: req.params.articleTitle },
        { $set: req.body }
      );
      res.send("Successfully updated article.");
    } catch (err) {
      res.send(err);
    }
  })
  .delete(async function (req, res) {
    try {
      await Article.deleteOne({ title: req.params.articleTitle });
      res.send("Successfully deleted the corresponding article.");
    } catch (err) {
      res.send(err);
    }
  });

app.listen(port, function () {
  console.log(`Server started on port ${port}`);
});
