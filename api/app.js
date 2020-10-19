const createError = require("http-errors");
const express = require("express");
const logger = require("morgan");
const cors = require("cors");

const data = require("./news.json");

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(cors());

app.use("/news/:id", function (req, res, next) {
  console.log("Id endpoint");
  const { id } = req.params;

  const item = data.filter((i) => i.id === id);

  if (!item) {
    return res.sendStatus(404);
  }

  return res.json(item);
});

app.use("/news/", function (req, res, next) {
  const mapItem = (item) => ({
    id: item.id,
    title: item.title,
    teaser: item.teaser,
    created: item.created,
    author: item.author,
    slug: item.slug,
    topic: item.topic,
    image: item.image,
  });

  console.log("News endpoint");

  const { topic } = req.query;

  if (topic) {
    const news = data.filter((item) => item.topic === topic).map(mapItem);
    return res.json(news);
  } else {
    const news = data.map(mapItem);
    return res.json(news);
  }
});

app.use("/resolveUrl/:slug", function (req, res, next) {
  console.log("slug endpoint");

  const { slug } = req.params;

  const item = data.filter((i) => i.slug === slug)[0];

  if (!item) {
    return res.sendStatus(404);
  }

  return res.json(item);
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  console.log("not found endpoint");
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  // res.locals.message = err.message;
  // res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500).json(err);
});

module.exports = app;
