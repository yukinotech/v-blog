var express = require("express");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
// var logger = require('morgan');
var path = require("path");

const webpack = require("webpack");
const webpackMiddleware = require("webpack-dev-middleware");
let webpackConf = require("./webpack.config.js");

//导入增删改查api
var blog = require("./routes/blog");
var user = require("./routes/user");

//使用multer完成上传组件
const multer = require("multer");

//导入session
var session = require("express-session");
//使用mongodb储存session
var MongoStore = require("connect-mongo")(session);

var app = express();

app.set("port", process.env.PORT || 80);

//morgan是一个日志中间件,可以不用
// app.use(logger('dev'));

//添加刷新session中间件
// app.use(function(req, res, next) {
//   req.session._garbage = Date();
//   req.session.touch();
//   next();
// });

//使用 session 中间件
app.use(
  session({
    secret: "secret", // 对session id 相关的cookie 进行签名
    resave: true,
    store: new MongoStore({
      url: "mongodb://127.0.0.1:27017/blog", //比如：'mongodb://cha:root@localhost:27017/ch_db'
      collection: "user_sessions" //比如：'ch_sessions'
    }),
    // resave: false,  // 是否每次都重新保存会话，建议false
    saveUninitialized: false, // 是否保存未初始化的会话
    cookie: {
      maxAge: 1000 * 60 * 60 * 10, // 设置 session 的有效时间，单位毫秒
      sameSite: "strict" //严格模式，预防CRSF攻击
    }
  })
);

// 解析 application/json
app.use(bodyParser.json());

// 解析 application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// 解析 cookie
app.use(cookieParser("secret")); //和session中间件的secert字段保持一致

// webpack中间件
var compiler = webpack(webpackConf);

//生产模式下不使用webpack中间件
app.use(
  webpackMiddleware(compiler, {
    publicPath: webpackConf.output.publicPath
  })
);

// 将静态资源挂载在服务器的端口上
// 此处静态资源是头像文件的静态储存位置
app.use("/avatar", express.static(path.join(__dirname, "public/avatar")));

// 使用public为开发模式，此时app.js运行的express是上线的后端负责api请求和数据库连接，注意webpack-dev-server也应开启，在线热更新
app.use(express.static(path.join(__dirname, "public")));
// 使用dist为生产模式，可以删掉public,和package里面的dev开发所需模块，注意dist文件夹为webpack编译所生成
// app.use(express.static(path.join(__dirname, "dist")));

// 允许跨域，前后端分离开发使用
// app.all("*", function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
//   res.header("Access-Control-Allow-Credentials", true);
//   res.header("X-Powered-By", " 3.2.1");
//   res.header("Content-Type", "application/json;charset=utf-8");
//   next();
// });

//设置文章增删改查api
//查询所有文章
app.get("/blog", blog.list);
//创建新文章
app.post("/blogCreatArticle", blog.add);
//获得某个文章
app.get("/Article/:id", blog.get);
//修改某个文章
app.post("/blogChangeArticle/:id", blog.change);
//删除某个文章
app.post("/articleDelete/:id", blog.delete);
//查询某人所有文章
app.post("/findSomeoneArticle", blog.findSomeoneArticle);
//带有查询字符串的查询个人文章API
app.get("/findArticle", blog.findArticle);
//带有查询字符串的查询全部文章API
app.get("/findArticleAll", blog.findArticleAll);

//设置用户增删改查api
app.post("/createAccount", user.register);
app.post("/login", user.login);
app.get("/getUsername", user.getUsername);
app.get("/getPublicname", user.getPublicname);
app.get("/logout", user.logout);
app.post("/getUserInfo", user.getUserInfo);
app.post("/updateUserInfo", user.updateUserInfo);

//设置头像更新api
app.post(
  "/updateAvatar",
  multer({
    storage: multer.diskStorage({
      destination: function(req, file, cb) {
        cb(null, "public/avatar");
      },
      filename: function(req, file, cb) {
        let strArray = file.originalname.split(".");
        let houzhuiming = strArray[strArray.length - 1];
        let tag = /.jpg$|.png$|.jpeg$/i;
        if (tag.test(file.originalname)) {
          let newfilename =
            Buffer.from(Date.now() + file.originalname)
              .toString("hex")
              .substr(0, 30) +
            "." +
            houzhuiming;
          cb(null, newfilename);
        } else {
          cb(null, file.originalname + Date.now());
        }
      }
    }),
    fileFilter: function(req, file, cb) {
      // 这个函数应该调用 `cb` 用boolean值来
      // 指示是否应接受该文件
      if (req.session.username) {
        let tag = /.jpg$|.png$|.jpeg$/i;
        let isReceive = tag.test(file.originalname);
        if (isReceive) {
          cb(null, true);
        } else {
          cb(null, false);
        }
        console.log(file.originalname);
        console.log(1111111);
        console.log(file);
        console.log(111111111);
      } else {
        cb(null, false);
      }

      // 拒绝这个文件，使用`false`，像这样:

      // 接受这个文件，使用`true`，像这样:
      // cb(null, true)
    },
    limits: {
      fieldSize: 500 * 1024,
      fileSize: 500 * 1024
    }
  }).single("avatarData"),
  user.updateAvatar
);

//分页部分
// app.get("/page/:id")

//设置返回页面
app.get("/show", function(req, res) {
  res.sendFile(path.join(__dirname, "dist/ArticleShow.html"));
});

app.get("/articleChange", function(req, res) {
  res.sendFile(path.join(__dirname, "dist/ChangeArticle.html"));
});

app.get("/publish", function(req, res) {
  if(req.session.username){
    res.sendFile(path.join(__dirname, "dist/publish.html"))
  } else{
    res.sendFile(path.join(__dirname, "dist/NoPermission.html"))
  }
  
});

app.get("/author", function(req, res) {
  if (req.session.username) {
    res.sendFile(path.join(__dirname, "dist/PersonalPage.html"));
  } else {
    res.redirect("/");
  }
});

app.use(function(req,res){
    res.statusCode=404
    res.sendFile(path.join(__dirname, "dist/Page404.html"));
})

app.listen(app.get("port"), function() {
  console.log("app has run on server:", app.get("port"));
});
