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
      maxAge: 1000 * 60 * 60 * 10 // 设置 session 的有效时间，单位毫秒
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
// 使用public为开发模式，此时app.js运行的express是上线的后端负责api请求和数据库连接，注意webpack-dev-server也应开启，在线热更新
app.use(express.static(path.join(__dirname, "public")));
// 使用dist为生产模式，可以删掉public,和package里面的dev开发所需模块，注意dist文件夹为webpack编译所生成
// app.use(express.static(path.join(__dirname, "dist")));

// 允许跨域
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
app.get("/blog", blog.list);
app.post("/blogCreatArticle", blog.add);
app.get("/Article/:id", blog.get);
app.post("/blogChangeArticle/:id", blog.change);
app.post('/articleDelete/:id',blog.delete)

//设置用户增删改查api
app.post("/createAccount", user.register);
app.post("/login", user.login);
app.get("/getUsername", user.getUsername);
app.get("/logout", user.logout);

//分页部分
// app.get("/page/:id")



//设置返回界面
app.get("/show", function(req, res) {
  res.sendFile(path.join(__dirname, "dist/ArticleShow.html"));
});

app.get("/articleChange", function(req, res) {
  res.sendFile(path.join(__dirname, "dist/ChangeArticle.html"));
});

app.listen(app.get("port"), function() {
  console.log("app has run on server:", app.get("port"));
});
