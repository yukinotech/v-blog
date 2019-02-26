import React from "react";
import style from "./RegisterBody.css";
import $ from "jquery";

class RegisterBody extends React.Component {
  constructor(props) {
    super(props);
    this.checkUsername = this.checkUsername.bind(this);
    this.checkPassword = this.checkPassword.bind(this);
    this.checkRePassword = this.checkRePassword.bind(this);
    this.submit = this.submit.bind(this);

    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.repasswordChange = this.repasswordChange.bind(this);
    this.emailChange = this.emailChange.bind(this);

    this.state = {
      form: {
        username: "",
        usernamelegal: false,
        password: "",
        passwordlegal: false,
        repassword: "",
        repasswordlegal: false,
        email: "",
        emaillegal: false
      }
    };
  }

  usernameChange(e) {
    var username = e.target.value;
    this.checkUsername(e);
    this.setState(prevState => {
      console.log(this.state.form);
      return { form: Object.assign(prevState.form, { username: username }) };
    });
  }
  passwordChange(e) {
    var password = e.target.value;
    this.checkPassword(e);
    this.setState(prevState => {
      console.log(this.state.form);
      return { form: Object.assign(prevState.form, { password: password }) };
    });
  }
  repasswordChange(e) {
    var repassword = e.target.value;
    this.checkRePassword(repassword);
    this.setState(prevState => {
      console.log(this.state.form);
      return {
        form: Object.assign(prevState.form, { repassword: repassword })
      };
    });
  }
  emailChange(e) {
    var email = e.target.value;
    this.checkEmail(email);
    this.setState(prevState => {
      console.log(this.state.form);
      return { form: Object.assign(prevState.form, { email: email }) };
    });
  }
  checkUsername(e) {
    var value = e.target.value;
    console.log("Username:", e.target.value);
    //检查username字段是否非空
    function check_null(str) {
      if (str === "") {
        return true;
      }
      return false;
    }
    //检查username字段是否过长
    function check_toolong(str) {
      if (str.length > 19) {
        return true;
      }
      return false;
    }
    //检查username字段是否过短
    function check_tooshort(str) {
      if (str.length < 2) {
        return true;
      }
      return false;
    }
    //检查username字段是否有非法字符
    function check_other_char(str) {
      var arr = ["&", "\\", "/", "*", ">", "<", "@", "!", "?"];
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < str.length; j++) {
          if (arr[i] == str.charAt(j)) {
            return true;
          }
        }
      }
      return false;
    }
    if (check_other_char(value) === true) {
      this.setState(prevState => {
        console.log(this.state.form);
        return {
          form: Object.assign(prevState.form, { usernamelegal: false })
        };
      });
      document.getElementById("usernameSpan").innerHTML = "用户名有非法字符";
    } else if (check_null(value) === true) {
      this.setState(prevState => {
        console.log(this.state.form);
        return {
          form: Object.assign(prevState.form, { usernamelegal: false })
        };
      });
      document.getElementById("usernameSpan").innerHTML = "用户名不能为空";
    } else if (check_toolong(value) === true) {
      this.setState(prevState => {
        console.log(this.state.form);
        return {
          form: Object.assign(prevState.form, { usernamelegal: false })
        };
      });
      document.getElementById("usernameSpan").innerHTML =
        "用户名过长,不能超过19个字符";
    } else if (check_tooshort(value) === true) {
      this.setState(prevState => {
        console.log(this.state.form);
        return {
          form: Object.assign(prevState.form, { usernamelegal: false })
        };
      });
      document.getElementById("usernameSpan").innerHTML =
        "用户名过短，不能少于2个字符";
    } else {
      this.setState(prevState => {
        console.log(this.state.form);
        return { form: Object.assign(prevState.form, { usernamelegal: true }) };
      });
      document.getElementById("usernameSpan").innerHTML = "用户名合法";
    }
  }
  checkPassword(e) {
    var value = e.target.value;
    function check_null(str) {
      if (str === "") {
        return true;
      }
      return false;
    }
    //检查password字段是否过长
    function check_toolong(str) {
      if (str.length > 20) {
        return true;
      }
      return false;
    }
    //检查password字段是否过短
    function check_tooshort(str) {
      if (str.length < 6) {
        return true;
      }
      return false;
    }
    //检查password字段是否有非法字符
    function check_other_char(str) {
      return !/^\w+$/.test(str);
    }
    if (check_other_char(value) === true) {
      this.setState(prevState => {
        console.log(this.state.form);
        return {
          form: Object.assign(prevState.form, { passwordlegal: false })
        };
      });
      document.getElementById("passwordSpan").innerHTML =
        "密码有非法字符,只能是数字,字母和下划线";
    } else if (check_null(value) === true) {
      this.setState(prevState => {
        console.log(this.state.form);
        return {
          form: Object.assign(prevState.form, { passwordlegal: false })
        };
      });
      document.getElementById("passwordSpan").innerHTML = "密码不能为空";
    } else if (check_toolong(value) === true) {
      this.setState(prevState => {
        console.log(this.state.form);
        return {
          form: Object.assign(prevState.form, { passwordlegal: false })
        };
      });
      document.getElementById("passwordSpan").innerHTML =
        "密码过长,不能超过20个字符";
    } else if (check_tooshort(value) === true) {
      this.setState(prevState => {
        console.log(this.state.form);
        return {
          form: Object.assign(prevState.form, { passwordlegal: false })
        };
      });
      document.getElementById("passwordSpan").innerHTML =
        "密码过短，不能少于6个字符";
    } else {
      this.setState(prevState => {
        console.log(this.state.form);
        return { form: Object.assign(prevState.form, { passwordlegal: true }) };
      });
      document.getElementById("passwordSpan").innerHTML = "密码合法";
    }
  }
  checkRePassword(repassword) {
    if (repassword !== this.state.form.password) {
      this.setState(prevState => {
        console.log(this.state.form);
        return {
          form: Object.assign(prevState.form, { repasswordlegal: false })
        };
      });
      document.getElementById("repasswordSpan").innerHTML =
        "两次输入密码不一致";
    } else {
      this.setState(prevState => {
        console.log(this.state.form);
        return {
          form: Object.assign(prevState.form, { repasswordlegal: true })
        };
      });
      document.getElementById("repasswordSpan").innerHTML = "两次输入密码一致";
    }
  }
  checkEmail(email) {
    let re = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
    if (!re.test(email)) {
      this.setState(prevState => {
        console.log(this.state.form);
        return {
          form: Object.assign(prevState.form, { emaillegal: false })
        };
      });
      document.getElementById("emailSpan").innerHTML = "email格式不正确";
    } else {
      this.setState(prevState => {
        console.log(this.state.form);
        return {
          form: Object.assign(prevState.form, { emaillegal: true })
        };
      });
      document.getElementById("emailSpan").innerHTML = "email格式正确";
    }
  }
  submit(e) {
    let data = {
      username: this.state.form.username,
      password: this.state.form.password,
      email: this.state.form.email,
    };
    e.preventDefault();
    if (
      this.state.form.usernamelegal &&
      this.state.form.passwordlegal &&
      this.state.form.repasswordlegal &&
      this.state.form.emaillegal
    ) {
      $.ajax({
        url: "/createAccount",
        dataType: "json",
        cache: false,
        type: "POST",
        crossDomain: true,
        data: data,
        success: data => {
          console.log(data)
          if(data==='hasbeenrepeat'){
              alert("该用户名已存在，请修改用户名");
          }else{
              alert("提交成功 " + data);
              // window.location='./index.html'
          }
        }
      });
    } else {
      alert("你提交的数据有问题哦，请重新填写");
    }
  }
  render() {
    return (
      <div className={style.mainbody}>
        <div className={style.registerbox}>
          <form onSubmit={this.submit}>
            <ul>
              <li>
                <label>用户名：</label>
                <input
                  type="text"
                  value={this.state.form.username}
                  id="username"
                  onChange={this.usernameChange}
                />
              </li>
              <li className={style.tipli}>
                <span
                  className={
                    this.state.form.usernamelegal
                      ? style.tipspanLegal
                      : style.tipspanIllegal
                  }
                  id="usernameSpan"
                />
              </li>
              <li>
                <label>密码：</label>
                <input
                  type="password"
                  value={this.state.form.password}
                  id="password"
                  onChange={this.passwordChange}
                />
              </li>
              <li className={style.tipli}>
                <span
                  className={
                    this.state.form.passwordlegal
                      ? style.tipspanLegal
                      : style.tipspanIllegal
                  }
                  id="passwordSpan"
                />
              </li>
              <li>
                <label>重新输入密码：</label>
                <input
                  type="password"
                  value={this.state.form.repassword}
                  id="repassword"
                  onChange={this.repasswordChange}
                />
              </li>
              <li className={style.tipli}>
                <span
                  id="repasswordSpan"
                  className={
                    this.state.form.repasswordlegal
                      ? style.tipspanLegal
                      : style.tipspanIllegal
                  }
                />
              </li>
              <li>
                <label>邮箱：</label>
                <input
                  type="text"
                  value={this.state.form.email}
                  id="email"
                  onChange={this.emailChange}
                />
              </li>
              <li className={style.tipli}>
                <span
                  className={
                    this.state.form.emaillegal
                      ? style.tipspanLegal
                      : style.tipspanIllegal
                  }
                  id="emailSpan"
                />
              </li>
              <li>
                <input type="submit" value="注册" />
              </li>
            </ul>
          </form>
        </div>
      </div>
    );
  }
}
export default RegisterBody;
