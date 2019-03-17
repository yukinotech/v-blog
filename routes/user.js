/*
 *  所有的增删改查的操作
 */
/*
 * GET comments listing.
 * 完整的定义增删改查
 */

var userSchema = require("../model/userDB.js"); // 引入的model，可用来操作数据库和生成Entity
var mongoose = require("mongoose");

var db2 = mongoose.createConnection("mongodb://127.0.0.1:27017/blog"); // 链接数据库
var user = db2.model("user", userSchema);

var fs = require('fs')
var path =require('path')


exports.login = function(req, res) {
  user.find({ username: req.body.username }, function(err, userdata) {
    if (userdata.length === 0) {
      console.log("用户 " + req.body.username + " 不存在");
      res.json("no_such_user");
    } else if (userdata.length === 1) {
      if (userdata[0].password === req.body.password) {
        console.log("登录用户 " + req.body.username + "登陆成功");
        req.session.username = req.body.username;
        console.log(req.session);
        res.json("login_success");
      } else {
        console.log(userdata);
        console.log(req.body.password);
        console.log("登录用户 " + req.body.username + "密码输入错误");
        res.json("password_error");
      }
    } else {
      res.json("database_error");
    }
  });
};

exports.register = function(req, res) {
  if (
    !(
      Object.prototype.hasOwnProperty.call(req.body, "username") &&
      Object.prototype.hasOwnProperty.call(req.body, "password") &&
      Object.prototype.hasOwnProperty.call(req.body, "email")
    )
  ) {
    res.statusCode = 400;
    return res.send("Error 400: Post syntax incorrect.");
  }

  user.find({ username: req.body.username }, function(err, userdata) {
    console.log("1");
    console.log(err);
    console.log(userdata);
    if (userdata.length === 0) {
      console.log("用户 " + req.body.username + " 不存在,可以创建新用户");
      let newuser = {
        username: req.body.username,
        publicname: "用户名" + req.body.username,
        password: req.body.password,
        email: req.body.email,
        avatar:'/avatar/defaultAvatar.jpg'
      };
      let UserEntity = new user(newuser);
      UserEntity.save();
      res.json(UserEntity.get("id"));
    } else {
      res.json("hasbeenrepeat");
    }
  });
};

exports.getUsername = function(req, res) {
  console.log(req.session);
  if (req.session.username) {
    //判断session 状态，如果有效，则返回主页，否则转到登录页面
    console.log("login");
    res.json(req.session.username);
  } else {
    console.log("no_login");
    res.json("no_login");
  }
};

exports.getPublicname = function(req, res) {
  console.log(req.session);
  if (req.session.username) {
    //判断session 状态，如果有效，则返回主页，否则转到登录页面
    console.log("login");
    let username = req.session.username;
    user.find({ username: username }, (err, userdata) => {
      if (err) {
        res.json("no_login");
      } else {
        if (userdata.length === 1) {
          if (userdata[0].publicname) {
            res.json(userdata[0].publicname);
          } else {
            res.json("未设置用户名，点击赶紧更改");
          }
        } else {
          res.json("no_login");
        }
      }
    });
  } else {
    console.log("no_login");
    res.json("no_login");
  }
};

exports.getUserInfo = function(req, res) {
  
    user.find({ username: req.body.username?req.body.username:req.session.username }, (err, userdata) => {
      if (err) {
        res.json("server error");
      } else {
        if (userdata.length === 0) {
          console.log("用户 " + req.session.username + " 不存在");
          res.json("no_such_user");
        } else if (userdata.length === 1) {
          let resdata = userdata[0];
          delete resdata._doc.password;
          delete resdata._doc._id;
          // delete resdata._doc.username
          res.json(resdata._doc);
        } else {
          res.json("database error");
        }
      }
    });
  
};

exports.updateUserInfo = function(req, res) {
  if (req.session.username === req.body.username && req.session.username) {
    if (
      typeof req.body.publicname === "string" &&
      typeof req.body.email === "string" &&
      typeof req.body.signature === "string" &&
      typeof req.body.avatar === "string"
    ) {
      let userdata = {
        publicname: req.body.publicname,
        email: req.body.email,
        signature: req.body.signature,
        avatar: req.body.avatar
      };
      user.update({ username: req.session.username }, userdata, function(err,data) {
        if (err) {
          res.json("no_login");
        } else {
          res.json("updateSuccess");
        }
      });
    } else{
      res.json("no_login");
    }
  } else {
    res.json("no_login");
  }
};

exports.updateAvatar =function(req,res){
  if(req.file){
    user.find({username:req.session.username},(err,userdata)=>{
      if(err){
        res.json({message: "fileUploadFail"})
      } else{
        let preAvatarPath=userdata[0].avatar
        let filename = req.file.filename;
        let newuserdata={avatar:'/avatar/'+filename}
        user.update({username:req.session.username},newuserdata,function(err,data){
          if(err){
            res.json({message: "fileUploadFail"})
          } else{
            if(preAvatarPath==='/avatar/defaultAvatar.jpg' || preAvatarPath===undefined){
              res.json({message: "fileUploadSuccess"})
            } else{
              fs.unlink('public'+preAvatarPath,function(err){
                if(err){
                  console.log('delete fail')
                  res.json({message: "fileUploadSuccess"})
                } else{
                  console.log('delete success')
                  res.json({message: "fileUploadSuccess"})
                }
              })
            }
          }
        })
      }
    })

  } else{
    res.json({message: "fileUploadFail"})
  }
}

exports.logout = function(req, res) {
  req.session.destroy(function(err) {
    if (err) {
      console.log(err);
      res.json("logout_fail");
    } else {
      res.json("logout_success");
    }
  });
};
