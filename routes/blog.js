/*
 *  所有的增删改查的操作
 */
/*
 * GET comments listing.
 * 完整的定义增删改查
 */

var articleSchema = require("../model/articleDB.js"); // 引入的model，可用来操作数据库和生成Entity
var mongoose = require("mongoose");

var db1 = mongoose.createConnection("mongodb://127.0.0.1:27017/blog"); // 链接数据库
var article = db1.model("article", articleSchema);

exports.list = function(req, res) {
  article.find(function(err, article) {
    // console.log(article);

    res.json(article);
  });
};

exports.get = function(req, res) {
  console.log(req.session);

  article.find({ _id: req.params.id }, function(err, article) {
    if (err) {
      console.log("查询文章错误！");
    }

    // console.log(article);
    res.json(article);
  });
};

// exports.delete = function(req, res){
//   Comment.remove({_id: req.params.id},function (err) {
//     if (err) {
//       console.log(err);
//     };
//     Comment.find(function (err, comment) {
//       res.json(comment);
//     });
//   });
// };

exports.add = function(req, res) {
  if (
    !(
      Object.prototype.hasOwnProperty.call(req.body, "title") &&
      Object.prototype.hasOwnProperty.call(req.body, "text") &&
      Object.prototype.hasOwnProperty.call(req.body, "date")
    )
  ) {
    res.statusCode = 400;
    return res.send("Error 400: Post syntax incorrect.");
  }
  if (req.session.username) {
    var newArticle = {
      title: req.body.title,
      text: req.body.text,
      overview: req.body.overview,
      date: req.body.date,
      author: req.session.username
    };
    var ArticleEntity = new article(newArticle);
    ArticleEntity.save();
    res.json(ArticleEntity.get("id"));
  } else {
    res.json("no_login");
  }
};

exports.change = function(req, res) {
  if (
    !(
      Object.prototype.hasOwnProperty.call(req.body, "title") &&
      Object.prototype.hasOwnProperty.call(req.body, "text") &&
      Object.prototype.hasOwnProperty.call(req.body, "date")
    )
  ) {
    res.statusCode = 400;
    return res.send("Error 400: Post syntax incorrect.");
  }
  let id = req.body._id;
  if (req.session.username) {
    article.find({ _id: id }, function(err, articleData) {
      if (err) {
        console.log(err);
        res.json('server_err')
      } else {
        if (articleData[0].author === req.session.username) {
          var ArticleChangeContent = {
            title: req.body.title,
            text: req.body.text,
            overview: req.body.overview,
            date: req.body.date,
            author: req.session.username
          };
          article.update(
            { _id: id },
            ArticleChangeContent,
            { multi: true },
            function(err, docs) {
              if (err) console.log(err);
              console.log("更改成功：" + docs);
              res.json(JSON.stringify({ id: id }));
            }
          );
        }
        else {
          res.json('no_permission')
        }
      }
    });
  }else{
    res.json('no_login')
  }

  
};

exports.commentList = function(req, res) {
  comment.find({ articleId: req.params.id.toString() }, function(
    err,
    comments
  ) {
    if (err) {
      console.log("获取评论出错");
    }
    res.json(comments);
  });
};
exports.commentAdd = function(req, res, next) {
  if (
    !req.body.hasOwnProperty("author") ||
    !req.body.hasOwnProperty("text") ||
    !req.body.hasOwnProperty("articleId")
  ) {
    res.statusCode = 400;
    return res.send("Error 400: Post syntax incorrect.");
  }
  // 实例化新添加的内容
  var newComment = {
    articleId: req.body.articleId,
    author: req.body.author,
    text: req.body.text
  };
  var commentEntity = new comment(newComment);
  /*
   *  在save的成功回调函数里使用中间件next，再次执行commentList，获取完整的数据
   */
  commentEntity.save(function() {
    next();
  });
};
