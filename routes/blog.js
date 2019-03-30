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


//查询全部文章,无查询字符串
exports.list = function(req, res) {
  article.find(function(err, article) {
    // console.log(article);

    res.json(article);
  });
};

//查询单个文章
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

//删除单个文章
exports.delete = function(req, res){
  if(req.session.username){
    let author=req.session.username
    console.log(req.params)
    article.find({ _id: req.params.id }, function(err, articleItemList) {
      if (err) {
        console.log("查询文章错误！");
        res.json('database_error')
      }
      else{
          if(author===articleItemList[0].author && articleItemList.length===1){
              console.log(articleItemList);
              article.remove({_id: req.params.id}, function(err){
                if (err) {
                  console.log("删除文章错误！");
                  res.json('database_error')
                }
                else{
                  res.json('delete_success')
                }
              })
          }
          else{
             res.json('noPermission_error');
          }
         
      }
    });
  }
  else{
    res.json('no_login')
  }
  // Comment.remove({_id: req.params.id},function (err) {
  //   if (err) {
  //     console.log(err);
  //   };
  //   Comment.find(function (err, comment) {
  //     res.json(comment);
  //   });
  // });
};

//添加一个新文章
exports.add = function(req, res) {
  if (
    !(
      Object.prototype.hasOwnProperty.call(req.body, "title") &&
      Object.prototype.hasOwnProperty.call(req.body, "text") &&
      Object.prototype.hasOwnProperty.call(req.body, "date") &&
      Object.prototype.hasOwnProperty.call(req.body, "lastCommitDate") &&
      req.body.title!==''
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
      author: req.session.username,
      lastCommitDate:req.body.lastCommitDate
    };
    var ArticleEntity = new article(newArticle);
    ArticleEntity.save();
    res.json(ArticleEntity.get("id"));
  } else {
    res.json("no_login");
  }
};

//修改一个文章
exports.change = function(req, res) {
  if (
    !(
      Object.prototype.hasOwnProperty.call(req.body, "title") &&
      Object.prototype.hasOwnProperty.call(req.body, "text") &&
      Object.prototype.hasOwnProperty.call(req.body, "lastCommitDate")
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
            lastCommitDate: req.body.lastCommitDate,
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

//查询某个作者的文章
exports.findSomeoneArticle = function(req,res){
  if(req.session.username && req.body.author){
      article.find({author:req.body.author},function(err,articleData){
        if(err){
          console.log(err);
          res.json('server_err')
        }else{
          res.json(articleData)
        }
      })
  }else{
    res.json('no_login')
  }
}

//带有查询字符串的查询个人文章接口
exports.findArticle = function(req,res){
  if(req.session.username){

    //pageSize：一页面的消息数量
    //currentPage：当前页面编号
    let{pageSize,currentPage,searchname}  = req.query  
    searchname=searchname?searchname:req.session.username;
    //字符串转成数字 
    pageSize=parseInt(pageSize)
    currentPage=parseInt(currentPage)
    //跳过数
    let skipnum = (currentPage - 1) * pageSize;  
    console.log(pageSize)
    console.log(currentPage)
    console.log(searchname)
    if(
      Number.isInteger(pageSize)  &&
      Number.isInteger(currentPage) &&
      pageSize<20 && pageSize>0 &&
      currentPage>0
    ){
      new Promise((resolve,reject)=>{
        article.find({author:searchname}).skip(skipnum).limit(pageSize).sort({date:-1}).exec(function(err,data){
        if(err){
          res.json('err')
          reject('')
        } else{
          resolve(data)
        }
      })
      }).then((data)=>{
        article.find({author:searchname},function(err,data2){
          if(err){
            res.json('err')
          } else{
            let length = data2.length
            let resdata={
              data:data,
              itemlength:length
            }
            res.json(resdata)
          }
        })
      }).catch((err)=>{
        console.log(err)
      })

    } else{
      res.json('query_illegal')
    }

    

    console.log(req.query)
    // res.json(req.query)
  } else{
    res.json('no_login')
  }
}

//带有查询字符串的查询全部文章接口
exports.findArticleAll = function(req,res){
    //pageSize：一页面的消息数量
    //currentPage：当前页面编号
    let{pageSize,currentPage}  = req.query  
    //字符串转成数字 
    pageSize=parseInt(pageSize)
    currentPage=parseInt(currentPage)
    //跳过数
    let skipnum = (currentPage - 1) * pageSize;  
    console.log(pageSize)
    console.log(currentPage)
    if(
      Number.isInteger(pageSize)  &&
      Number.isInteger(currentPage) &&
      pageSize<20 && pageSize>0 &&
      currentPage>0
    ){
      new Promise((resolve,reject)=>{
        article.find({},['title','date','author','_id','lastCommitDate']).skip(skipnum).limit(pageSize).sort({date:-1}).exec(function(err,data){
        if(err){
          res.json('err')
          reject('')
        } else{
          resolve(data)
        }
      })
      }).then((data)=>{
        article.find(function(err,data2){
          if(err){
            res.json('err')
          } else{
            let length = data2.length
            let resdata={
              data:data,
              itemlength:length
            }
            res.json(resdata)
          }
        })
      }).catch((err)=>{
        console.log(err)
      })

    } else{
      res.json('query_illegal')
    }

    

    console.log(req.query)
    // res.json(req.query)
  } 



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
