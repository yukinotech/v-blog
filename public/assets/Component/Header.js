import React from "react";
import style from "./Header.css";
import A_Xu from "../../img/A_Xu.jpg";
import $ from "jquery";


class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      login: false,
      username: ""
		};
		this.logout=this.logout.bind(this)
	}
	logout(){
		let that=this
		$.ajax({
      url: "/logout",
      dataType: "json",
      cache: false,
      type: "GET",
      crossDomain: true,
      success: data => {
        if (data === "logout_success") {
          that.setState({
						login: false,
						username:null
					});
					alert('登出成功');
        } else {
					alert('登出失败，ajax成功');
        }
      },
      error: function(data) {
        console.log(data);
        alert('登出失败');
      }
    });
	}
  componentWillMount() {
		let that=this
    $.ajax({
      url: "/getPublicname",
      dataType: "json",
      cache: false,
      type: "GET",
      crossDomain: true,
      success: data => {
        if (data === "no_login") {
          this.setState({
            login: false
          });
        } else {
          this.setState({
            login: true,
            username: data
          });
        }
      },
      error: function(data) {
        console.log(data);
        alert(data.id);
      }
    });
  }
  render() {
    let UserLoginHeader = ()=> {
      return (
        <div>    
            <a href="#" onClick={this.logout}>登出&nbsp;&nbsp;</a>|&nbsp;&nbsp;你好，<a href="/author">{this.state.username}</a>    
        </div>
      );
    };

    let UserNoLoginHeader =()=>{
      return (
        <div>
          <a href="/login.html">登录&nbsp;&nbsp;</a>|
          <a href="/Register.html">&nbsp;&nbsp;注册</a>
        </div>
      );
    };
    let UserHeader = this.state.login ? UserLoginHeader : UserNoLoginHeader;
    return (
      <div className={style.header}>
        <div className={style.avatar}>
          <img src={A_Xu} />
        </div>
        <div className={style.title}>
          <h1>John Smith の blog</h1>
        </div>
        <ul className={style.nav}>
          <li>
            <a href="/">Home</a>
          </li>
          <li>
            <a href="/publish.html">发布文章</a>
          </li>
          <li>
            <a href="#">历史文章</a>
          </li>
          <li>
            <a href="#">浏览记录</a>
          </li>
          <li>
            <a href="#">关于</a>
          </li>
        </ul>
        <div className={style.user}>
          <UserHeader />
        </div>
      </div>
    );
  }
}

export default Header;
