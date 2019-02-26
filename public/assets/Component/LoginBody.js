import React from "react";
import style from "./LoginBody.css";
import $ from "jquery";

class HomeBody extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      username: "",
      password: ""
    };
    this.haddlesubmit=this.haddlesubmit.bind(this)
    this.haddleUsernameChange=this.haddleUsernameChange.bind(this)
    this.haddlePasswordChange=this.haddlePasswordChange.bind(this)
  }
  haddlesubmit(e) {
    e.preventDefault();
    let data=this.state
    $.ajax({
      url: "/login",
      dataType: "json",
      cache: false,
      type: "POST",
      crossDomain: true,
      data: data,
      success: data => {
        if(data==='no_such_user'){
          alert('用户名不存在')
        }else if(data==='password_error'){
          alert('密码错误')
        }else if(data==='database_error'){
          alert('服务器出错，请稍后重试，或通知管理员')
        }else if(data==='login_success'){
          alert('登陆成功,页面跳转至首页')
          window.location='/'
        }else{
          alert('其他错误，请通知管理员')
        }
      }
    });
  }
  haddleUsernameChange(e){
    let value=e.target.value
    console.log(this.state)
    this.setState({username:value})
  }
  haddlePasswordChange(e){
    let value=e.target.value
    console.log(this.state)
    this.setState({password:value})
  }
  render() {
    return (
      <div className={style.mainbody}>
        <div className={style.loginbox}>
          <form onSubmit={this.haddlesubmit} className={style.loginform}>
            <p>登录</p>
            <ul>
              <li>
                用户名：
                <input type="text" onChange={this.haddleUsernameChange}/>
              </li>
              <li>
                密码：
                <input type="password" onChange={this.haddlePasswordChange}/>
              </li>
            </ul>
            <input type="submit" value="提交" className={style.button} />
          </form>
          `
        </div>
      </div>
    );
  }
}

export default HomeBody;
